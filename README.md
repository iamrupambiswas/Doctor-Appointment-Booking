# 🩺 Doctor Appointment Booking System

A full-stack doctor appointment booking platform designed for both patients and administrators.
Users can easily book appointments with available doctors, while admins manage doctors, schedules, and bookings.

🔗 **Live Demo**: [https://my-doctor-appointment-booking.vercel.app](https://my-doctor-appointment-booking.vercel.app)

---

## 📁 Directory Structure

doctor-apointment-booking
├── admin
├── backend
├── frontend

---

## ⚙️ Tech Stack

| Layer     | Tech Used                                      |
|-----------|-------------------------------------------------|
| Frontend  | React.js, Vite, TailwindCSS, Axios, React Router |
| Admin     | React.js, Vite, TailwindCSS, Axios              |
| Backend   | Node.js, Express.js, MongoDB, JWT Auth          |
| Deployment| Vercel (Frontend), Render (Backend)             |

---

## 🚀 Features

### 👨‍⚕️ User / Patient Side
- View available doctors and specialties
- Book an appointment
- Check appointment status
- User registration and login with JWT authentication

### 🛠 Admin Panel
- Admin authentication via JWT
- Add and manage doctors
- View and approve patient appointments
- Dashboard with booking statistics

### 🔒 Authentication
- JWT-based login for users and admins
- Protected routes with role-based access control

---

## 🖥️ How to Run Locally

### 1. Clone the Repository
```bash
git clone https://github.com/iamrupambiswas/doctor-apointment-booking.git
cd doctor-apointment-booking
```

### 2. Install Dependencies

#### Backend
```bash
cd backend
npm install
```

#### Frontend
```bash
cd ../frontend
npm install
```

#### Admin
```bash
cd ../admin
npm install
```

### 3. Create Environment Variables
```bash
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

### 4. Start All Servers

#### Backend
```bsh
npm run server
```

#### Frontend
```bash
cd ../frontend
npm start
```

#### Admin
```bash
cd ../admin
npm start
```


## 📦 Deployment

| Module   | Platform | Link                                       |
|----------|----------|--------------------------------------------|
| Frontend | Vercel   | [https://my-doctor-appointment-booking.vercel.app](https://my-doctor-appointment-booking.vercel.app) |
| Backend  | Render   | ---                   |


## 👨‍💻 Author

Built with ❤️ by Rupam Biswas
GitHub: [iamrupambiswas](https://github.com/iamrupambiswas)

💼 LinkedIn: [iamrupambiswas](https://www.linkedin.com/in/iamrupambiswas/)

🐦 Twitter: [iamrupambiswas](https://x.com/iam_rupambiswas)

📧 Email: iamrupambiswas@gmail.com

**Contact and Further Information:**

Feel free to connect with Rupam through the provided links to learn more about their work and other projects. If you have any questions or suggestions regarding this Doctor Appointment Booking System, you can reach out via the listed email address or GitHub. Contributions and feedback are always welcome!
