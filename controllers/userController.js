import User from '../models/user.js';

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deletedUser = async (req, res) => {
  try {
    const user = await User.deleteOne({ _id: req.params.id });
    res.json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const saveUser = async (req, res) => {
  const user = new User(req.body);
  try {
    const insertedUser = await user.save();
    res.status(201).json(insertedUser);
  } catch (error) {
    error.code === 11000 ? res.status(400).json({ message: 'Email yang Anda masukkan sudah terdaftar' }) : res.status(400).json({ message: error.message });
  }
};

export const updatedUser = async (req, res) => {
  try {
    const updatedUser = await User.updateOne({ _id: req.params.id }, { $set: req.body });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
