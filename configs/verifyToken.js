import jwt from 'jsonwebtoken';
import 'dotenv/config';

const verifyToken = (req, res, next) => {
  // const token = req.headers['token'];
  const token = req.headers.authorization?.replace(/^Bearer\s+/, '');
  if (!token) return res.status(401).json({ status: res.statusCode, message: 'Access Denied !' });
  try {
    const verified = jwt.verify(token, process.env.SECRET_KEY);
    req.user = verified;
    next();
  } catch (error) {
    res.status(401).json({ status: res.statusCode, message: 'Invalid Token !' });
  }
};

export default verifyToken;
