import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { registerValidation, loginValidation } from '../configs/validation.js';

export const registerHandler = async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error)
    return res.status(400).json({
      status: res.statusCode,
      message: error.details[0].message,
    });
  //hash password
  const { name, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  //=====>
  try {
    const user = new User({ name, email, password: hashPassword });
    const register = await user.save();
    res.status(201).json(register);
  } catch (error) {
    error.code === 11000 ? res.status(400).json({ message: 'incorrect email' }) : res.status(400).json({ message: error.message });
  }
};

export const loginHandler = async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error)
    return res.status(400).json({
      status: res.statusCode,
      message: error.details[0].message,
    });

  try {
    // Cek email user
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ status: res.statusCode, message: 'Email yang Anda masukkan salah' });
    }

    //   Cek password user
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(401).json({ status: res.statusCode, message: 'Password yang Anda masukkan salah' });
    }

    const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
    res.header(token).json({ token: token, _id: user._id, name: user.name });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
