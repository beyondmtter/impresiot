import { default as mongoose } from "mongoose";

const userSchema = new mongoose.Schema({

  fullName: {
    type: String,
    required: true
  },
  profilePicture: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    index: true,
  },
  contact: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  about: {
    type: String,
    maxlength: 500,
  },
  location: {
    state: { type: String, required: true },
    country: { type: String, required: true },
  },
  agreeToTerms: {
    type: Boolean,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  approvedToCreator: {
    type: Boolean,
    default: false
  },
  isRequestedToCreator:{
    type: Boolean,
    default: false
  },
  dateOfApprove: {
    type: Date
  },
  dateOfRequest: {
    type: Date
  },
  rejectedToCreator: {
    type: Boolean,
    default: false
  },
  dateOfReject: {
    type: Date
  },
  profession: {
    type: String
  },
  setting: {
    showAbout: {type: Boolean},
    showSocialLink: {type: Boolean},
    showContact: {type: Boolean},
    showFollowers: {type: Boolean},
    showFollowing: {type: Boolean}
  },
  socialLinks: {
    instagram: { type: String},
    facebook: { type: String},
    twitter: { type: String},
    youtube: { type: String},
    linkedin: { type: String},
    website: { type: String}
  },
  followers: {
    type: Number,
    default: 0,
  },
  following: {
    type: Number,
    default: 0,
  },
  verifyCode: {
    type: String,
    default: null, 
  },
  verifyCodeExpiry: {
    type: Date,
    default: null
  }
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;