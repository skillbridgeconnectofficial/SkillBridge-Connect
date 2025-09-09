const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();
dotenv.config();

app.use(express.static(__dirname));
app.use(express.json());
const allowedOrigins = [
    'https://skillbridge-connect.onrender.com', // Your live frontend URL
    'http://localhost:5000' // Keep this for local testing
];

const corsOptions = {
    origin: allowedOrigins,
    credentials: true
};

};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'server'));

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
const JWT_SECRET = process.env.JWT_SECRET;


mongoose.connect(MONGO_URL).then(() => {
    console.log(`The database is connected.`)
}).catch((error) => console.log(error))

const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

const User = mongoose.model("creds", userSchema);

app.get('/', (req, res) => {
    console.log("Root URL ('/') accessed. Redirecting to login page...");
    res.sendfile(path.join(__dirname,"index.html"));
});

app.post("/signup" , async (req,res) => {
    const {username , password} = req.body;
    const existingUser = await User.findOne({username})
    if (existingUser) return res.status(400).json({msg: "User already exists"})
    
    const hashedPass = await bcrypt.hash(password , 10);
    const newUser = new User({username, password: hashedPass});
    await newUser.save()
    res.json({msg: "User has been successfully created"})
});

app.post("/login", async (req , res) => {
    const {username , password} = req.body;
    const user = await User.findOne({username});
    if (!user) return res.status(400).json({ msg: "User not found" });
    
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: "Invalid password" });
    
      const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: "1h" });
    
      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 60 * 60 * 1000
      }).json({ msg: "Login successful" });
    });
    
app.get("/student_dashboard.html", (req, res) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ msg: "No token, please login" });
    
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ msg: "Invalid or expired token" });
    res.json({ msg: `Welcome to your dashboard, ${decoded.username}` });
    });
});

app.post("/logout", (req, res) => {
    res.clearCookie("token").json({ msg: "Logged out successfully" });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));



