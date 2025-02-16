# Next.js Job Tracker

An interactive, responsive, and fully-featured **Job Tracking** application built with **Next.js, Prisma ORM, MongoDB, and JWT authentication**. 🚀

## ✨ Features

- 🔑 **JWT Authentication** (Sign-up, Login, Logout)
- 🗃️ **Prisma ORM** for database interactions
- 📦 **MongoDB** as the primary database
- 🔍 **Job Posting & Management** (CRUD operations)
- 🎨 **Fully Responsive & Interactive UI**
- 🚀 **Fast & Optimized Performance**

## 🛠️ Tech Stack

- **Frontend:** Next.js, Tailwind CSS
- **Backend:** Next.js API Routes
- **Database:** MongoDB with Prisma ORM
- **Authentication:** JWT-based auth with secure cookie handling
- **State Management:** React Context API

## 📂 Folder Structure

```
📦 job-tracker
├── 📁 prisma           # Prisma schema & migrations
├── 📁 src
│   ├── 📁 app         # Next.js pages & API routes
│   ├── 📁 components  # Reusable UI components
│   ├── 📁 contexts    # Global state management
│   ├── 📁 lib         # Utility functions
│   ├── 📁 styles      # Global styles & Tailwind config
├── 📄 .env            # Environment variables
├── 📄 next.config.js  # Next.js configuration
├── 📄 package.json    # Dependencies & scripts
└── 📄 README.md       # Project documentation
```

## 🚀 Getting Started

### 1️⃣ Clone the Repository
```sh
 git clone https://github.com/your-username/job-tracker.git
 cd job-tracker
```

### 2️⃣ Install Dependencies
```sh
npm install  # or yarn install
```

### 3️⃣ Setup Environment Variables
Create a `.env` file in the root directory and add:
```env
DATABASE_URL=mongodb+srv://your-mongo-url
JWT_SECRET=your-secret-key
```

### 4️⃣ Run Migrations & Seed Database
```sh
npx prisma migrate dev --name init
npx prisma db seed
```

### 5️⃣ Start the Development Server
```sh
npm run dev
```

Your app is now running at **http://localhost:3000** 🚀

## 📝 API Endpoints

| Method | Endpoint       | Description            |
|--------|--------------|----------------------|
| POST   | /api/auth/register  | User Registration |
| POST   | /api/auth/login     | User Login       |
| GET    | /api/jobs           | Get All Jobs     |
| POST   | /api/jobs           | Create a Job     |
| PUT    | /api/jobs/:id       | Update a Job     |
| DELETE | /api/jobs/:id       | Delete a Job     |

## 📌 Screenshots

### 🌟 Login Page
![Login Page](https://your-image-url.com/login.png)

### 📜 Job Dashboard
![Job Dashboard](https://your-image-url.com/dashboard.png)

## 🛠️ Future Enhancements
- ✅ Role-based access control (Admin, User)
- ✅ Notifications for job applications
- ✅ Real-time updates with WebSockets
- ✅ Dark mode support

## 🏆 Contributing
Contributions are welcome! Feel free to submit a pull request.

## 📜 License
This project is licensed under the MIT License.

---

🔥 Built with ❤️ using Next.js, Prisma, and MongoDB!

