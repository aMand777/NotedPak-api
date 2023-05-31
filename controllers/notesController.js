import Notes from '../models/notes.js';

export const getNotes = async (req, res) => {
  try {
    const notes = await Notes.find();
    res.status(200).json(notes);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getNoteById = async (req, res) => {
  try {
    const note = await Notes.findOne({ _id: req.params.id });
    res.status(200).json(note);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deletedNote = async (req, res) => {
  try {
    const note = await Notes.deleteOne({ _id: req.params.id });
    res.status(200).json(note);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// export const createdNote = async (req, res) => {
//   const note = new Notes(req.body);
//   try {
//     const createdNote = await note.save();
//     res.status(201).json(createdNote);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

export const createdNote = async (req, res) => {
  const { userId, title, body, tags } = req.body;
  const note = new Notes({ userId, title, body, tags });
  
  try {
    const createdNote = await note.save();
    res.status(201).json(createdNote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updatedNote = async (req, res) => {
  try {
    const updatedNote = await Notes.updateOne({ _id: req.params.id }, { $set: { ...req.body, updatedAt: new Date() } }, { upsert: true });
    res.status(201).json(updatedNote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
