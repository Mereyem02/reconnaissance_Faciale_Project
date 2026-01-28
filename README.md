# Facial Recognition Employee Tracking System

A comprehensive employee attendance and behavior monitoring system powered by facial recognition technology. This full-stack application uses AI-powered face detection to track employee attendance, monitor work hours, and generate detailed reports.

## 🌟 Features

- **Facial Recognition Authentication**: Secure login and attendance tracking using face-api.js
- **Real-time Attendance Monitoring**: Track employee check-ins and check-outs in real-time
- **Employee Management**: Complete CRUD operations for employee records
- **Behavior Tracking**: Monitor and analyze employee behavior patterns
- **Alert System**: Automated alerts for anomalies and important events
- **Reports & Analytics**: Generate detailed reports with charts and export to PDF
- **Admin Dashboard**: Comprehensive dashboard for administrators with analytics
- **Real-time Updates**: Socket.io integration for live updates across the system

## 🚀 Technology Stack

### Frontend
- **React 18** - Modern UI library
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **face-api.js** - Face detection and recognition
- **Recharts** - Data visualization
- **Framer Motion** - Animations
- **Axios** - HTTP client

### Backend
- **Node.js** - JavaScript runtime
- **Express 5** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **Socket.io** - Real-time bidirectional communication
- **TensorFlow.js** - Machine learning
- **JWT** - Authentication
- **bcrypt** - Password hashing

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Mereyem02/reconnaissance_Faciale_Project.git
   cd reconnaissance_Faciale_Project
   ```

2. **Install root dependencies**
   ```bash
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd client
   npm install
   cd ..
   ```

4. **Install server dependencies**
   ```bash
   cd server
   npm install
   cd ..
   ```

## ⚙️ Configuration

1. **Create environment variables file**
   
   Create a `.env` file in the root directory with the following variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

2. **MongoDB Setup**
   - For local MongoDB: Ensure MongoDB service is running
   - For MongoDB Atlas: Create a cluster and get your connection string

3. **Configure Client API URL**
   
   The client is configured to connect to `http://localhost:5000/api` by default. Update this in `client/src/App.jsx` if needed.

## 🚀 Running the Application

### Development Mode

1. **Start the server**
   ```bash
   cd server
   npm run dev
   ```
   The server will run on `http://localhost:5000`

2. **Start the client** (in a new terminal)
   ```bash
   cd client
   npm run dev
   ```
   The client will run on `http://localhost:5173`

3. **Access the application**
   
   Open your browser and navigate to `http://localhost:5173`

### Production Build

1. **Build the client**
   ```bash
   cd client
   npm run build
   ```

2. **Preview the production build**
   ```bash
   npm run preview
   ```

## 📁 Project Structure

```
reconnaissance_Faciale_Project/
├── client/                 # React frontend application
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   ├── pages/         # Page components
│   │   ├── App.jsx        # Main application component
│   │   └── main.jsx       # Application entry point
│   ├── package.json
│   └── vite.config.js
├── server/                # Express backend application
│   ├── controllers/       # Route controllers
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── public/           # Static files (face descriptors, etc.)
│   ├── server.js         # Server entry point
│   └── package.json
├── database/             # Database related files
├── .env                  # Environment variables
├── package.json          # Root package.json
└── README.md            # This file
```

## 💡 Usage

### For Administrators
1. Log in with admin credentials
2. Access the dashboard to view real-time statistics
3. Manage employees (add, edit, delete)
4. View attendance records
5. Generate and export reports
6. Configure alerts and notifications

### For Employees
1. Use facial recognition to log in
2. Check in/out using the face recognition system
3. View personal attendance history
4. Track work hours

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Protected API routes
- Secure facial recognition data storage
- Environment variable configuration

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is part of an academic/research project. Please contact the repository owner for licensing information.

## 👥 Authors

- Mereyem02 - [GitHub Profile](https://github.com/Mereyem02)

## 🙏 Acknowledgments

- face-api.js for facial recognition capabilities
- TensorFlow.js for machine learning models
- The open-source community for various libraries and tools

## 📞 Support

For support, please open an issue in the GitHub repository or contact the project maintainers.

---

**Note**: This is a facial recognition system. Ensure you comply with local privacy laws and regulations when deploying this application in a production environment.
