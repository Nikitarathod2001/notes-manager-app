# 🗒️ Notes Manager App

A **full-stack Notes Manager Application** built using **React (Vite)** for the frontend and **Node.js + Express** for the backend.  
This app allows users to **register, log in, create, view, edit, search, and delete notes** easily with a simple and elegant UI.

---

## Features

### Frontend (React + Vite)
- Authentication (Register & Login)
- Create new notes
- View all notes
- Search notes by title
- Edit and delete existing notes
- Toast notifications for user feedback
- Responsive, modern UI built with **Tailwind CSS**

### Backend (Node.js + Express)
- RESTful APIs for note management
- User authentication with JWT
- MongoDB database for persistent note storage
- Environment-based configuration using `.env`
- Secure API routes for authenticated users

---

## Tech Stack

| Layer | Technology Used |
|--------|------------------|
| **Frontend** | React (Vite), Tailwind CSS, React Router, Axios, React Toastify |
| **Backend** | Node.js, Express.js, MongoDB, Mongoose, JWT |
| **Version Control** | Git & GitHub |

---

## ⚙️ Setup and Installation

Follow these steps to run the project on your local machine 👇  

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Nikitarathod2001/notes-manager-app.git

cd notes-manager-app
```

### 2️⃣ Backend Setup

```bash
cd backend

npm install
```

#### Create a .env file inside the backend folder:
```bash
PORT=3100
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

#### Start the backend server:
```bash
npm start server
```

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
```

#### Create a .env file inside the frontend folder:
```bash
VITE_API_URL=http://localhost:3100
```

#### Start the frontend development server:
```bash
npm run dev
```
