import mongoose from "mongoose";

const donorSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      minlength: 3,
      maxlength: 100,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      select: false, 
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },

    bloodGroup: {
      type: String,
      required: true,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      index: true, 
    },

    city: {
      type: String,
      required: true,
      trim: true,
      index: true, 
    },

    availability: {
      type: Boolean,
      default: true,
    },

    lastDonationDate: {
      type: Date,
      default: null,
    },

    role: {
      type: String,
      enum: ["donor", "admin"],
      default: "donor",
    },

    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, 
  }
);


const Donor = mongoose.models.Donor || mongoose.model("Donor", donorSchema);

export default Donor;
