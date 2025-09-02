import React, { useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js';
import axios from 'axios';

const BehaviorMonitor = ({ name }) => {
  const videoRef = useRef();
  const lastSeenRef = useRef(Date.now());

  useEffect(() => {
    const loadModels = async () => {
      const URL = '/models';
      await faceapi.nets.tinyFaceDetector.loadFromUri(URL);
      await faceapi.nets.faceLandmark68Net.loadFromUri(URL);
    };

    const startVideo = () => {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          videoRef.current.srcObject = stream;
        });
    };

    const checkBehavior = async () => {
      const detection = await faceapi
        .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks();

      if (detection) {
        lastSeenRef.current = Date.now();

        const landmarks = detection.landmarks;
        const leftEye = landmarks.getLeftEye();
        const rightEye = landmarks.getRightEye();

        const eyeOpenness = Math.abs(leftEye[1].y - leftEye[5].y);

        if (eyeOpenness < 3) {
          // yeux presque fermés
          await axios.post('http://localhost:5000/api/alerts/', {
            name,
            type: 'Somnolence',
            time: new Date(),
          });
        }
      } else {
        const now = Date.now();
        if (now - lastSeenRef.current > 5 * 60 * 1000) {
          // plus de 5 minutes sans détection
          await axios.post('http://localhost:5000/api/alerts/', {
            name,
            type: 'Absent prolongé',
            time: new Date(),
          });
        }
      }
    };

    loadModels().then(() => {
      startVideo();
      setInterval(checkBehavior, 5000);
    });
  }, [name]);

  return <video ref={videoRef} autoPlay muted width="640" height="480" style={{ display: 'none' }} />;
};

export default BehaviorMonitor;
