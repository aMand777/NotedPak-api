import mongoose from 'mongoose';

const Notes = mongoose.Schema({
  title: {
    type: 'string',
    require: true,
  },
  body: {
    type: 'string',
    require: true,
  },
  tags: {
    type: 'string',
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    require: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
    require: true,
  },
});

export default mongoose.model('Notes', Notes);
