![ScreenShot-app-Thumbnail](https://github.com/sameer-ranjan-singh/Sell-My-Course/assets/121953297/673cd921-c688-45c1-877f-8054e46df474)

# SELL-MY-COURSE
It is a online course creation and selling platform that connects instructors with learners. It empowers educators to create and share their courses, while providing a seamless learning experience for students. The platform is built to simplify the course creation process, making it easier for instructors to share their expertise with a global audience.

# Purpose:
To provide a platform for instructors to create, manage, and sell online courses.
To offer a user-friendly interface for students to discover and purchase courses.
To streamline the hiring process for educational institutions and employers.
To foster a community of knowledge sharing and skill development.

# Key Features:
- User Authentication: User and instructor registration and login functionality.
- Course Creation: Instructors can create, update, and delete courses with rich media content.
- Course Marketplace: A marketplace where students can explore and purchase courses.
- Admin Panel: A separate admin panel for managing users, courses, and site content.
- State Management: Recoil for efficient state management in the frontend.
- Responsive Design: Mobile-friendly design for a seamless user experience.
- Secure Payments: Integrated payment gateway for course purchases.(Still working on this...)

## Table of Contents
- [Demo](#demo)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Setting Up the BACKEND](#setting-up-the-backend)
  - [Setting Up the FRONTEND](#setting-up-the-frontend)
- [Contributing](#contributing)

## Demo

https://sameer-course.vercel.app/


## Technologies Used

- React
- Recoil
- Axios
- JavaScript
- Node.js
- Express.js
- REST API
- Material-UI
- MongoDB
- JSON Web Tokens (JWT)

## Prerequisites

Must have in your System ( Node.js, MongoDB, npm).

## Getting Started

### Setting Up the BACKEND

1. Clone the repository:
```bash
git clone https://github.com/sameer-ranjan-singh/Sell-My-Course
```
2. Change to the backend directory:
```bash
cd server
```
3. Install dependencies:
```bash
npm install
```
4. Configure environment variables (e.g., database connection, JWT secret).
```bash
 SECRET_KEY= your_jwt_secret_key
 MONGO_URL= your_database_connection_string
```
5. Start the backend server:
```bash
npm run server || npm start
```
### Setting Up the FRONTEND

1. Change to the frontend directory:
```bash
cd client && client-User
```
2. Install dependencies:
```bash
npm install
```
3. Configure environment variables (e.g., config.js, API endpoints).

4. Start the frontend development server:
```bash
npm run dev || npm start
```
## Contributing:
I welcome contributions from the community to help improve this project. To contribute:

- Fork the repository on GitHub.
- Clone your forked repository to your local machine.
```bash
#Create a new branch for your changes:
    git checkout -b feature/your-feature-name
    ```
- Make your changes and commit them with clear, descriptive messages.
- Push your changes to your GitHub repository.
- Create a pull request (PR) from your branch to the main repository's branch.
