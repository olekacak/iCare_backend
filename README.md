# iCare Backend

This is the backend server for the **iCare** application — a health and monitoring platform. Built using **Node.js** and **Express**, it handles authentication, sensor data processing, and integrates with **Firebase** for secure data management.

---

## 🚀 Features

- 🔐 User Authentication (Login/Register)
- 🌡️ Sensor Data Handling (IoT-ready)
- ☁️ Firebase Admin Integration
- 📦 Modular Controller-Based Structure
- 🛡️ Secure API Routes

---

## 📁 Project Structure

```
iCare_backend/
├── controllers/         # Auth and sensor controllers
├── config/              # Firebase credentials
├── routes/              # API route handlers
├── server.js            # Entry point
├── package.json         # Dependencies
└── README.md            # Project docs
```

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- Firebase Admin SDK
- JSON Web Tokens (JWT)
- Body-parser, CORS

---

## 🔧 Installation

```bash
# Clone the repo
git clone https://github.com/yourusername/iCare_backend.git
cd iCare_backend

# Install dependencies
npm install
```

---

## 🏁 Usage

```bash
# Start the development server
node server.js
```

Make sure to update or add your `serviceAccountKey.json` in the `/config` folder to enable Firebase Admin access.

---

## 📬 API Endpoints (Sample)

- `POST /api/auth/register` – Register a new user
- `POST /api/auth/login` – Login and get a token
- `POST /api/sensor/data` – Upload sensor data (requires auth)

---

## 📄 License

MIT License  
© 2024 iCare 

---

## 🙌 Contributions

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.
