const express = require("express");
const app = express();

require('dotenv').config();
const PORT = process.env.PORT || 5000;
const cors = require("cors");

app.use(cors());


require('./config/Database').connect();

//Middleware
app.use(express.json());
// app.use(express.urlencoded({extended: true}));

// Routes
const user = require('./Routes/User');
app.use("/api/v1", user);

app.listen(PORT, ()=>{
    console.log(`Server is listening on ${PORT} port.`)
})

app.get("/get", (req,res)=>{
    res.send(`<h1>Hello World <h1>`)
})
