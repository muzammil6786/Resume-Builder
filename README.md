# Resume-Builder

## 🚀 Objective

Build a dynamic resume builder where users can register, log in, create resumes, and manage their own resumes with live preview and multiple templates.

---

## 🌐 Deployed Links

* **Frontend (Vercel):**
  https://resume-builder-pi-pearl.vercel.app

* **Backend (Render):**
  https://resume-builder-p13s.onrender.com



* use email :- khan@gmail.com  and password :- 123456 to see previously added data.

## 📌 Features

###  1. Authentication System

* User Registration & Login (Gmail-based or email/password)
* Secure session handling (JWT / cookies)
* User-specific data access (each user can only see their own resumes)

---

### 2. Dashboard

* View all resumes created by that user
* Create new resume
* Edit existing resume
* Delete resume

---

###  3. Resume Builder Layout

* Split screen UI:

  * **Left Panel:** Input Form
  * **Right Panel:** Live Preview
* Real-time updates without page reload

---

###  4. Form Sections (Left Panel)

#### Personal Information

* Name
* Email
* Phone
* github,linkdin,portfolio (url)
* Summary

#### Education

* Add / Remove multiple entries dynamically

#### Experience

* Add / Remove multiple entries dynamically

#### Skills

* Tags input or comma-separated values

---

###  5. Resume Preview (Right Panel)

* Live preview while typing
* Looks like a professional resume 

---

###  6. Resume Templates

* 2 templates implemented:

  * Classic
  * Modern
* Template switching functionality (dropdown/tabs)

---

### ⚙️ 7. UI Customization

* Change primary color
* Adjust font size
* Show/Hide sections
* Basic spacing adjustments

---

###  8. Backend Integration

* Save resume data via API
* Fetch and reload saved resumes
* Each resume linked to logged-in user
* Input validation implemented

---

###  9. Export Feature

* Download resume as PDF

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Tailwind CSS / CSS Modules
* Axios (API calls)
* React Router

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)

### Other Tools

* JWT Authentication
* html2pdf / jsPDF (for PDF export)

---

## 📂 Project Structure (Example)

```
client/
 ├── components/
 │    ├── templates/
 ├── pages/
 │    ├── Login.jsx
 │    ├── Dashboard.jsx
 │    └── Builder.jsx
 ├── services/
 │    └── api.js

server/
 ├── controllers/
 ├── models/
 ├── routes/
 ├── middleware/
 ├── service/
 └── server.js
```

---

## ⚙️ Local Setup Instructions

### 1. Clone Repository

```
git clone <your-repo-url>
cd smart-resume-builder
```

---

### 2. Setup Backend

```
cd server
npm install
```

Create `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_ACCESS_SECRET = your_secret_key
JWT_REFRESH_SECRET = your_secret_key
```

Run backend:

```
npm run dev
```

---

### 3. Setup Frontend

```
cd client
npm install
npm start
```

---

### 4. Access Application

```
Frontend: http://localhost:5173
Backend: http://localhost:5000
```

---

## 📌 Conclusion

This project demonstrates full-stack development skills including authentication, CRUD operations, dynamic UI rendering, and real-time preview. It emphasizes clean architecture, reusability, and user-focused design.

---
