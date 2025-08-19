const express = require('express');
const mongoose = require('mongoose');
const encrypt = require("mongoose-encryption");
const bodyParser = require('body-parser');
const app = express();
mongoose.connect("mongodb+srv://bhavanapolimetla:Bhavana123@cluster0.2axisar.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(() => console.log("Connected to MongoDB Atlas"))
  .catch(err => console.error(err));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.set("view engine", "ejs");
const session = require('express-session');
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(session({
    secret: "12345678901234567890123456789012",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,   
    secure: false,   
    maxAge: 1000 * 60 * 60,
  }
}))
function isAuthenticated(req, res, next) {
  if (req.session.user) {
    return next();
  }
  res.redirect("/login");
}
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email: {
        type: String,
        required: true,
        unique: true,

    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    }
});
const secret = "Thisisourlittlesecret.";
userSchema.plugin(encrypt,{secret:secret,encryptedFields:["password"]});
const User = mongoose.model("User", userSchema);
app.get("/", (req, res) => {
    res.render("index");
});
app.post("/signup",async (req, res) => {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "Email already registered" });
  }
    const user = new User({ username, email, password });
    await user.save();
    res.render("login");
});
app.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    const foundUser = await User.findOne({email:email});
        if(!foundUser){
            return res.status(400).json({message:"User not found"});
        }
        if(foundUser.password ===password){
             req.session.user = {
             id: foundUser._id,
             username: foundUser.username,
             email: foundUser.email
       };
            res.render("secrets",{user:foundUser});
        }
         else {
    return res.status(400).send("Invalid password");
  }
})
app.get("/SignUp",(req, res) =>{
    res.render("SignUp");
})
app.get("/login",(req,res)=>{
    res.render("login");
})
app.get("/logout", (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ message: "Logout failed" });
    }
    res.clearCookie("connect.sid"); 
    res.redirect("/login");
  });
});
app.listen(4000,()=>{
    console.log("server is running on port 4000");
})