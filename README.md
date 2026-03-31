# AI Chat Application

A full-stack modern web application that provides a chat interface with an AI. It features a robust client-server architecture with secure authentication, persistent chat histories, and a responsive, beautifully styled dark-mode UI.

## Features

- **OAuth 2.0 Authentication**: Secure login via Google and Facebook using Passport.js.
- **Persistent Chat History**: All conversations are tied to the user's account and saved in a MongoDB database, allowing you to resume past threads anytime.
- **Client-Server Separation**: A React frontend strictly decoupled from the Node.js backend to ensure high separation of concerns.
- **Dynamic Messaging UI**: Clean, responsive layout with visual distinction between user prompts and AI responses, built with Tailwind CSS.

## Tech Stack

### Frontend (`client/`)
- **React 19** with **Vite**
- **TypeScript**
- **Tailwind CSS** (Utility-first styling)
- **React Router DOM** (Client-side routing and protected routes)
- **Axios** (Configured to securely transmit session credentials)

### Backend (`server/`)
- **Node.js** & **Express**
- **TypeScript**
- **MongoDB** via **Mongoose**
- **Passport.js** (Strategies for Google OAuth2 and Facebook)
- **Express-Session** (Cookie-based credential persistence)

## Prerequisites

Before successfully running the application locally, ensure you have the following installed and configured:
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- A running [MongoDB](https://www.mongodb.com/) instance (local or Atlas)
- Developer credentials for **Google OAuth** and **Facebook Login** to populate environment variables.

## Environment Variables

You must create a `.env` file in **both** the client and server directories if specific keys are required, but primarily for the **server**:

Create a `.env` in the `server/` folder:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Facebook OAuth
FACEBOOK_APP_ID=your_facebook_app_id
FACEBOOK_APP_SECRET=your_facebook_app_secret
```

## Installation & Setup

1. **Clone the repository** (if you haven't already).
2. **Install Client Dependencies**:
   ```bash
   cd client
   npm install
   ```
3. **Install Server Dependencies**:
   ```bash
   cd server
   npm install
   ```

## Running the Application

For the application to function correctly, both the client and server must be running concurrently.

**1. Start the Backend Server**
```bash
cd server
npm run dev
```
*(The API will be available at `http://localhost:5000`)*

**2. Start the Frontend Client**
```bash
cd client
npm run dev
```
*(Vite will serve the frontend at `http://localhost:5173`)*

Once both are running, open your browser and navigate to `http://localhost:5173`. You will instantly be greeted by the secure login screen.

## Project Structure Highlights

- `client/src/App.tsx`: Handles routing and validates if an active secure session exists.
- `server/src/server.ts`: Configures the CORS policies, initializes database connections, and registers session middlewares.
- `server/src/config/passport.ts`: Core OAuth logic verifying tokens received from providers and serializing complete user contexts.

---

*Note: This architecture assumes the client and server are running on `localhost:5173` and `localhost:5000`, respectively. Modifying these ports requires corresponding updates to the Express CORS configuration and Passport callback URIs.*
