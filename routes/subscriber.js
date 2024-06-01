import express from 'express';
import subscriber from '../models/subscriber.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

const router = express.Router();
dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

router.post('/subscriber', async (req, res) => {
  const { name, email, contactNumber, message } = req.body;
  console.log(req.body);

  try {
    const newSubscriber = new subscriber({
      name,
      email,
      contactNumber,
      message,
    });

    await newSubscriber.save();

    // Send email to admin
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: 'New Newsletter Subscriber',
      text: `Name: ${name}\nEmail: ${email}\nContact Number: ${contactNumber}\nMessage: ${message}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ msg: 'Email sending failed', error });
      }
      res.status(200).json({ msg: 'Subscriber added and email sent', info });
    });
  } catch (err) {
    res.status(500).json({ msg: 'Server Error', err });
  }
});

export default router;
