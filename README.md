Deploy Link(https://assignment9-azjt.onrender.com/)
Project Overview

This is a simple User Authentication System built with Node.js, Express, MongoDB, and EJS.
The app allows users to:

Sign Up (with username, email, and password)

Log In (with email and password)

View Secrets Page (only if logged in)

Log Out (destroying the session)

Passwords are stored securely using mongoose-encryption (for demo purposes).

Features:

->User Registration (with validation for unique email)

->User Login & Session Management

->Encrypted Password Storage (using mongoose-encryption)

->Logout functionality with cookie/session clearing

->Views rendered using EJS templates

Tech Stack

Backend: Node.js, Express.js

Database: MongoDB Atlas (via Mongoose)

Authentication: express-session, cookie-parser, mongoose-encryption

Frontend: EJS templates

Middleware: body-parser
