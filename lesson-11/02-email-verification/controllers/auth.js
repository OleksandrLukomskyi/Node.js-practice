import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mail from '../mail.js';

import User from '../models/user.js';

async function register(req, res, next) {
  const { name, email, password } = req.body;

  const emailInLowerCase = email.toLowerCase();
  try {
    const user = await User.findOne({ email: emailInLowerCase });

    if (user !== null) {
      return res.status(409).send({ message: 'User already registered' });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const verifyToken = crypto.randomUUID();

    await User.create({
      name,
      email: emailInLowerCase,
      password: passwordHash,
      verifyToken,
    });

    mail.sendMail({
      to: emailInLowerCase,
      from: 'lukomskyi.oleksandr@gmail.com',
      subject: 'Welcom to Bookshelf!',
      html: `To confirm your email please click on the <a href="http://localhost:8080/api/users/verify/${verifyToken}">link</a>`,
      text: `To confirm your email please open the link http://localhost:8080/api/users/verify/${verifyToken}`,
    });

    res.status(201).send({ message: 'Registration succesfully' });
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  const { email, password } = req.body;

  const emailInLowerCase = email.toLowerCase();

  try {
    const user = await User.findOne({ email: emailInLowerCase });

    if (user === null) {
      console.log('Email');
      return res
        .status(401)
        .send({ message: 'Email or password is incorrect' });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch === false) {
      console.log('Password');
      return res
        .status(401)
        .send({ message: 'Email or password is incorrect' });
    }

    if (user.verify === false) {
      return res.status(401).send({ message: 'Please verify your email' });
    }

    const token = jwt.sign(
      { id: user._id, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    await User.findByIdAndUpdate(user._id, { token });
    res.send({ token });
  } catch (error) {
    next(error);
  }
}

async function logout(req, res, next) {
  try {
    await User.findByIdAndUpdate(req.user.id, { token: null });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

export default { register, login, logout };
