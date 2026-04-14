const express= require('express');
require('dotenv').config();
const cors= require('cors');
const postRoutes= require('./src/routes/postRoutes');

const app= express();
app.use(cors());
app.use(express.json());

const connectdb= require('./src/config/db');

connectdb();

app.get('/', (req,res)=>{
    res.send('API is running...');
})

app.use('/api/auth', require('./src/routes/authRoutes'))
app.use('/api/posts', postRoutes);

const PORT= process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
})