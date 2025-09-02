import React, { useRef, useEffect, useState } from 'react';
import * as faceapi from 'face-api.js';
import axios from 'axios';

const FaceRecognition = () => {
  const videoRef = useRef();
  const canvasRef = useRef(null);
  const [labeledDescriptors, setLabeledDescriptors] = useState([]);

  const loadModels = async () => {
    const MODEL_URL = '/models';
    await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
    await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
    await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
  };

  const startVideo = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) videoRef.current.srcObject = stream;
      })
      .catch((err) => console.error('Erreur vidéo:', err));
  };
const loadLabeledImages = async () => {
  const response = await axios.get('http://localhost:5000/api/employees/');
  const employees = response.data;

  return Promise.all(
    employees.map(async (employee) => {
      try {
        const image = await new Promise((resolve, reject) => {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.src = `http://localhost:5000/api/images/${employee.photo}`;
          img.onload = () => resolve(img);
          img.onerror = (e) => reject(`Failed to load image for ${employee.name}`);
        });

        const detection = await faceapi
          .detectSingleFace(image, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceDescriptor();

        if (!detection) {
          console.warn(`No face detected for ${employee.name}`);
          return null;
        }

        return new faceapi.LabeledFaceDescriptors(employee.name, [detection.descriptor]);
      } catch (err) {
        console.error('Error loading face data:', err);
        return null;
      }
    })
  );
};



  useEffect(() => {
    loadModels().then(() => {
      startVideo();
      loadLabeledImages().then((descriptors) => {
        setLabeledDescriptors(descriptors.filter(Boolean));
      });
    });
  }, []);

  useEffect(() => {
    if (!videoRef.current || labeledDescriptors.length === 0) return;

    const video = videoRef.current;

    const onPlay = () => {
      if (canvasRef.current) {
        canvasRef.current.remove();
      }
      const canvas = faceapi.createCanvasFromMedia(video);
      canvasRef.current = canvas;
      document.body.appendChild(canvas);

      const displaySize = { width: video.width, height: video.height };
      faceapi.matchDimensions(canvas, displaySize);

      const interval = setInterval(async () => {
        if (video.paused || video.ended) return;

        const detections = await faceapi
          .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceDescriptors();

        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.6);

        resizedDetections.forEach(d => {
          const match = faceMatcher.findBestMatch(d.descriptor);
          const name = match.label;

          faceapi.draw.drawDetections(canvas, [d]);
          faceapi.draw.drawFaceLandmarks(canvas, [d]);
          const box = d.detection.box;
          new faceapi.draw.DrawBox(box, { label: name }).draw(canvas);

          if (name !== 'unknown') {
            axios.post('http://localhost:5000/api/attendance/', {
              name,
              time: new Date(),
            }).catch(console.error);
          }
        });
      }, 2000);

      // Nettoyage
      video.removeEventListener('play', onPlay);

      return () => {
        clearInterval(interval);
        if (canvasRef.current) {
          canvasRef.current.remove();
          canvasRef.current = null;
        }
      };
    };

    video.addEventListener('play', onPlay);

    // Nettoyage au démontage du composant
    return () => {
      video.removeEventListener('play', onPlay);
      if (canvasRef.current) {
        canvasRef.current.remove();
        canvasRef.current = null;
      }
    };
  }, [labeledDescriptors]);

  return (
    <div>
      <video ref={videoRef} autoPlay muted width="720" height="560" />
    </div>
  );
};

export default FaceRecognition;
