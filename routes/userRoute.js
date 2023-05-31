import express from 'express';
import {
    getUsers,
    getUserById,
    saveUser,
    deletedUser,
    updatedUser
} from '../controllers/userController.js';

const router = express.Router();

router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/users', saveUser);
router.delete('/users/:id', deletedUser);
router.patch('/users/:id', updatedUser);

export default router;
