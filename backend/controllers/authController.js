import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// user registration
export const register = async (req, res) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
            photo: req.file ? req.file.path : null,
            role: req.body.role || 'user'  
        });

        await newUser.save();

        res.status(200).json({ success: true, message: 'Successfully created' });
    } catch (err) {
        if (err.code === 11000) { 
            return res.status(400).json({ success: false, message: 'Username or email already exists' });
        }
        res.status(500).json({ success: false, message: err.message || 'Failed to create. Try again' });
    }
};


// user login
export const login = async (req, res) => {
    const email = req.body.email;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const checkCorrectPassword = await bcrypt.compare(req.body.password, user.password);

        if (!checkCorrectPassword) {
            return res.status(401).json({ success: false, message: 'Incorrect email or password' });
        }

        const { password, role, ...rest } = user._doc;
        
        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "15d" }
          );          
        
        res.status(200).json({
            success: true,
            message: 'Successfully logged in',
            data: { token, ...rest, role }
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message || 'Failed to login' });
    }
}
