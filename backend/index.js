const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const Doctor = require('./models/Doctor_model');

dotenv.config();

// Initialize app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect Database BEFORE starting server
connectDB();

// Test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.post("/register", (req, res) => {
  const { dr_name, dr_degree, dr_email, dr_mobile_number, dr_city, dr_address, dr_password } = req.body;

  if (!dr_name || !dr_degree || !dr_email || !dr_mobile_number || !dr_city || !dr_address || !dr_password) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  const emailExists = await Doctor.find({ dr_email: dr_email , dr_mobile_number: dr_mobile_number  });
  if (emailExists.length ){
    return res.status(400).json({ message: 'Email or Mobile number already exists' });
    }
  const newDoctor = new Doctor({
    dr_name,
    dr_degree,
    dr_email,
    dr_mobile_number,
    dr_city,
    dr_address,
    dr_password
  }); 
  
}
const PORT = process.env.PORT || 5000;

// Start server only after DB connection (better approach)
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});