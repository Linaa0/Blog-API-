require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./src/models/user"); // adjust path if needed

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("DB connected"))
  .catch(err => console.log(err));

async function createAdmin() {
  try {
    const existing = await User.findOne({ email: "admin@gmail.com" });

    if (existing) {
      console.log("Admin already exists");
      return process.exit();
    }

    const hashed = await bcrypt.hash("123456", 10);

    const admin = await User.create({
      name: "Admin",
      email: "admin@gmail.com",
      password: hashed,
      role: "admin"
    });

    console.log("Admin created:", admin.email);

    process.exit();
  } catch (err) {
    console.log(err);
  }
}

createAdmin();