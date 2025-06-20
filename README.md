🎒 TourEase – Tour Management App
A simple MERN stack application to browse, book, and manage tours.

✨ Fitur
Register & Login

Lihat daftar tour dan detailnya

Booking tour

Admin dashboard (kelola tour dan booking)

🛠️ Teknologi
**Backend:**
- Express.js
- MongoDB + Mongoose
- JWT & Passport (Auth)
- Joi (Validation)
- Multer (File upload)
- CASL (Role-based Access)

**Frontend:**
- React 19 + Redux Toolkit
- React Router DOM
- Axios
- Tailwind CSS
- Recharts (Dashboard grafik)
- SweetAlert2 (UI Alerts)
- Redux Persist

**Lainnya:**
- Dotenv (env config)
- CORS
- Date-fns (date utility)

🚀 Cara Menjalankan
1. Clone project
git clone https://github.com/rezza66/melody_rent.git
cd tourease
2. Jalankan backend
cd backend
npm install
npm run dev
3. Jalankan frontend
cd ../frontend
npm install
npm run dev
⚙️ Konfigurasi .env

📦 *Note*: Backend menggunakan `nodemon` untuk development. Pastikan sudah ter-install secara global atau lokal.

Buat file .env di folder backend seperti berikut:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

Buat file .env di folder frontend seperti berikut:
VITE_BASE_URL=your_base_url
VITE_IMAGE_BASE_URL=your_image_base_url

🧑‍💻 Author
Reza Pratama
