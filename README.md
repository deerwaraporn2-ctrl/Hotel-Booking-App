# Aurelia Resort – Full-Stack Hotel Booking App

Aurelia Resort is a responsive hotel booking application where guests can explore room options and make reservations. It also includes a staff administration portal for managing bookings.

Originally developed as a hotel booking project using Express and SQLite, I decided to take the project further by exploring full-stack development, cloud database integration and deployment.

## Beyond the Original Requirements

The original project requirements focused on building a backend using Express and SQLite. However, I wanted to explore more of the backend development process and take the application beyond its original scope.

I extended the project by:

- **Migrating from SQLite to Turso (libSQL):** Replaced the local SQLite database with a cloud-hosted database, allowing booking data to be stored and accessed online.
- **Integrating the cloud database:** Connected the Express backend to Turso using `@libsql/client`.
- **Managing configuration securely:** Used environment variables to protect database credentials and staff authentication details.
- **Preparing the backend for deployment:** Adapted the Express API for deployment on Vercel.
- **Automating deployment:** Set up GitHub Actions to build and deploy the frontend to GitHub Pages.
- **Separating frontend and backend:** Structured the application as two independent parts communicating through a REST API.

One of my main goals was to make the project accessible for recruiters to explore. Instead of requiring users to set up the application locally, I wanted to provide a live demo with staff login access so they could test the administration portal and booking management features themselves.

This extension gave me practical experience with cloud database integration, backend configuration, API communication, authentication and deployment workflows.

## Features

### Guest Experience
- Browse available room types and prices.
- Select a room and enter booking details.
- Submit a reservation.
- Receive a booking confirmation.

### Staff Administration Portal
- Staff login with password-based authentication.
- View all reservations.
- Edit existing bookings.
- Delete bookings.

### Recruiter Demo Access

Recruiters can use the demo staff login to explore the administration portal and test booking management functionality.

- **Staff login password:** AuTest26

The application uses fictional demo booking data. Please do not enter real personal information.

## Tech Stack

**Frontend**
- React
- JavaScript
- Vite
- CSS
- React Router

**Backend**
- Node.js
- Express
- REST API
- CORS

**Database**
- Turso (libSQL)
- `@libsql/client`

**Tools & Deployment**
- Git and GitHub
- GitHub Actions
- Vercel
- GitHub Pages

## Architecture

The application has a separate frontend and backend:

- The React frontend handles the user interface and communicates with the Express REST API.
- The backend handles booking operations, authentication and database communication.
- Turso stores booking data in a cloud-hosted database.
- Environment variables keep sensitive credentials outside the source code.

## Live Demo

- **Frontend:** (https://deerwaraporn2-ctrl.github.io/Hotel-Booking-App/)
- **Backend API:** https://hotel-booking-ellc87tvr-deerwaraporn2-ctrl.vercel.app/

## Running the Demo Locally

### Prerequisites
- Node.js
- npm

### 1. Clone the repository

```bash
git clone https://github.com/deerwaraporn2-ctrl/Hotel-Booking-App.git
cd Hotel-Booking-App
```

### 2. Install frontend dependencies

```bash
cd frontend
npm install
```

### 3. Start the frontend

```bash
npm run dev
```

The frontend runs locally and communicates with the deployed backend API.

The live demo uses a cloud-hosted Turso database through the deployed Express API. Recruiters do not need to create a Turso account or configure database credentials to explore the application.

### 4. Run the Backend Locally
The backend source code is included in the repository for developers who want to explore and run the complete application locally.

Open a second terminal from the project root.

Install backend dependencies:

```bash
cd backend
npm install
```

The backend requires its own environment configuration to connect to a Turso database. Developers running the backend locally need to configure their own database credentials and admin password. These credentials are not included in the public repository.

Start the backend:

```bash
npm run dev
```

The Express API runs locally at http://localhost:5001.

**Note:**  The frontend can run locally using the deployed demo API. Running your own backend requires your own database configuration.

## Security

Sensitive credentials, database tokens and admin passwords are stored outside the source code. Private environment files are excluded from Git and are never published in the repository.

