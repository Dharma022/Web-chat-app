require('dotenv').config();
const port = process.env.PORT || 4889;
const express = require('express');
const path = require('path')
const cookieParser = require('cookie-parser');
const connectionToDB = require('./DB/connectToDb');
const { app, server, io } = require('./socket/socket');

// Importing routes
const allRoutes = require('./Routes/v1');

// Middleware
app.use(express.json());
app.use(cookieParser());

// Use your routes
app.use('/api', allRoutes);

//http://localhost:4889/api/auth/signup`

//deplyment

const _dirname = path.resolve();
app.use(express.static(path.join(_dirname, "/frontend/dist")))

app.get("*", (req,res) => {
    res.sendFile(path.join(_dirname, "frontend", "dist", "index.html"));
});




// Start the server
server.listen(port, () => {
    // Connect to the database
    connectionToDB.connectToDb();

    console.log(`App listening on port ${port}`);
});
