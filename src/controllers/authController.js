const User= require('../models/user');
const bcrypt= require('bcryptjs');
const jwt= require('jsonwebtoken');

exports.register= async (req,res)  => {
    try{
        console.log("REQ BODY:", req.body);
    const name= req.body.name;
    const password= req.body.password;
    const email= req.body.email?.trim().toLowerCase();

    if (!name || !email || !password) {
    return res.status(400).json({ msg: "All fields are required" });
}

    const existingUser= await User.findOne({email});
    if(existingUser){
        return res.status(400).json({msg: 'User already exists'});
    }
    const hashed= await bcrypt.hash(password, 10);
    const newUser= await User.create({name,email,password:hashed});
    
    res.status(201).json(newUser);
} catch(err){
    res.status(500).json({msg: err.message});
}
};

exports.login= async (req,res) =>{
    try {
        const email=req.body.email?.trim().toLowerCase();
        const password= req.body.password;

        const user= await User.findOne({email});
       if(!user) return res.status(400).json({msg: 'User not found'});
       console.log("USER: ", user);

       const isMatch= await bcrypt.compare(password, user.password);
      if(!isMatch) return res.status(400).json({msg: 'Wrong password'});

      const token= jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET, {expiresIn: '1d'});

    res.json({token});
    }catch(err){
        res.status(500).json({msg: err.message});
    }
};

exports.createAdmin= async(req,res)=>{
    try{
    const {name, email, password}= req.body;
    const hashed= await bcrypt.hash(password, 10);
    const admin= await User.create({
        name,
        email,
        password:hashed,
        role:"admin"
    });
    res.json(admin);
}catch(err){
    res.status(500).json({msg: err.message});
}
};


