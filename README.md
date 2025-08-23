# 🏨 Hotel Management System

A full-stack Hotel Booking & Management Platform built with React (frontend), Node.js + Express (backend), and MongoDB Atlas (database). The platform allows users to browse hotels, search for rooms, book stays, and manage reservations, while hotel owners can manage hotels, rooms, and bookings.

## ✨ Features
### 👤 Users
* Sign up & Login (Email/Password + Clerk Authentication)
* Search hotels by location & filters
* Book rooms with availability check
* View & manage bookings
* Save recent searches

### 🏨 Hotel Owners
* Register & manage hotels
* Add/Edit/Delete rooms with images (Cloudinary integration)
* Toggle room availability
* View hotel bookings
* Dashboard: total bookings & revenue

### ⚙️ System Features
* Secure Authentication & Authorization (Clerk + custom middleware)
* Image upload with Multer + Cloudinary
* Email notifications via Brevo (SMTP)
* Deployed on Vercel (frontend & backend)

## 🛠️ Tech Stack
* Frontend: React, Tailwind CSS, Axios
* Backend: Node.js, Express.js
* Database: MongoDB Atlas
* Auth: Clerk
* Image Storage: Cloudinary
* Email: Brevo SMTP
* Deployment: Vercel

## 📂 Project Structure
```
hotel-management/
│── backend/
│   ├── server.js
│   ├── routes/
│   ├── controllers/
│   ├── config/
│   ├── models/
│   └── middleware/
│
│── frontend/
│   ├── src/
│   ├── public/
│   └── .env
│
└── README.md
```

## 🚀 Getting Started
### 1️⃣ Clone the repository
```
git clone https://github.com/your-username/hotel-management.git
cd hotel-management
```
### 2️⃣ Setup Backend
```
cd backend
npm install
```
Create a .env file in backend/ with:
```
PORT=8000
MONGO_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
BREVO_SMTP_USER=your_brevo_email
BREVO_SMTP_PASS=your_brevo_password
```
Run backend:
```
npm run dev
```

### 3️⃣ Setup Frontend
```
cd frontend
npm install
```
Create ``.env`` in ``frontend/`` with:
```
VITE_BACKEND_URL=http://localhost:8000
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```
Run frontend:
```
npm run dev
```
