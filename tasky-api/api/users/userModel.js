import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { 
    type: String, 
    required: true, 
    validate: {
      validator: passwordValidator,
      message: 'Password must contain at least 8 characters, including one letter, one number, and one special character.'
    }
  }
});

const passwordValidator = (password) => {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  return passwordRegex.test(password);
};

export default mongoose.model('User', UserSchema);