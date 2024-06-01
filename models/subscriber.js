import mongoose, { Schema, model } from 'mongoose';

const SubscriberSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    // required: true,
  },
});

const Subscriber = mongoose.model('Subscriber', SubscriberSchema);

export default Subscriber;
