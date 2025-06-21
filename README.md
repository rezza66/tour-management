🎒 Tour Management

A simple MERN stack application to browse, book, and manage tours.

✨ Features

User Functionality:

- Register & Login
- Browse all tours and view details
- Book a tour

Admin Dashboard:

- Manage tours
- Manage bookings

🛠️ Teknologi

**Backend:**

- Express.js – Server-side framework
- MongoDB – NoSQL database
- JWT & Passport – Authentication
- Joi – Input validation
- Cloudinary – Image hosting
- CASL – Role-based access control

**Frontend:**

- React 19 + Redux Toolkit – UI and state management
- React Router DOM – Client-side routing
- Axios – HTTP requests
- Tailwind CSS – Utility-first CSS framework
- Recharts – Data visualization for dashboard
- SweetAlert2 – Modern alert messages
- Redux Persist – Persistent state across sessions

🚀 Getting Started

1. Clone the repository

- git clone https://github.com/rezza66/tour-management.git
- cd tour-management
  
2. Start the backend

- cd backend
- npm install
- npm run dev
  
3. Start the frontend

- cd frontend
- npm install
- npm run dev

📦 *Note*: The backend uses nodemon for development. Ensure it is installed globally or locally.

⚙️ Environment Configuration

Create a .env file in the backend folder with the following variables:

- PORT=5000
- MONGO_URI=your_mongodb_connection_string
- JWT_SECRET=your_jwt_secret

Create a .env file in the frontend folder with the following variables:

- VITE_BASE_URL=your_base_url
- VITE_IMAGE_BASE_URL=your_image_base_url
