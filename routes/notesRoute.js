import express from 'express';
import { getNotes, getNoteById, createdNote, deletedNote, updatedNote } from '../controllers/notesController.js';
import verifyToken from '../configs/verifyToken.js';

const router = express.Router();

router.get('/notes', verifyToken, getNotes);
router.get('/notes/:id', verifyToken, getNoteById);
router.post('/notes/', verifyToken, createdNote);
router.delete('/notes/:id', verifyToken, deletedNote);
router.put('/notes/:id', verifyToken, updatedNote);

export default router;
