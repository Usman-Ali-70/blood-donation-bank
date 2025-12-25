import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Donor from "../models/Donor.js";

export const registerDonor = async (req, res, next) => {
  try {
    const {
      fullName,
      email,
      password,
      phone,
      bloodGroup,
      city,
      lastDonationDate,
    } = req.body;

    const existingDonor = await Donor.findOne({ email });
    if (existingDonor) {
      res.status(400);
      throw new Error("Email already registered");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const donor = await Donor.create({
      fullName,
      email,
      password: hashedPassword,
      phone,
      bloodGroup,
      city,
      lastDonationDate,
    });

   
    const token = jwt.sign(
      { id: donor._id, role: donor.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      success: true,
      token,
      donor: {
        id: donor._id,
        fullName: donor.fullName,
        email: donor.email,
        bloodGroup: donor.bloodGroup,
        city: donor.city,
      },
    });
  } catch (error) {
    next(error);
  }
};


export const loginDonor = async (req, res, next) => {
  try {
    const { email, password } = req.body;


    const donor = await Donor.findOne({ email }).select("+password");

    if (!donor) {
      res.status(401);
      throw new Error("Invalid email or password");
    }

    if (donor.isBlocked) {
      res.status(403);
      throw new Error("Account has been blocked");
    }

    const isMatch = await bcrypt.compare(password, donor.password);
    if (!isMatch) {
      res.status(401);
      throw new Error("Invalid email or password");
    }

    const token = jwt.sign(
      { id: donor._id, role: donor.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      token,
      donor: {
        id: donor._id,
        fullName: donor.fullName,
        email: donor.email,
        bloodGroup: donor.bloodGroup,
        city: donor.city,
        availability: donor.availability,
      },
    });
  } catch (error) {
    next(error);
  }
};
