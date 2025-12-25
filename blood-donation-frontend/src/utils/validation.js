import { z } from "zod";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export const registerSchema = z.object({
  fullName: z
    .string()
    .min(3, { message: "Full name must be at least 3 characters" })
    .max(50, { message: "Full name is too long" })
    .regex(/^[a-zA-Z\s]+$/, { message: "Full name can only contain letters and spaces" })
    .trim(),

  email: z
    .string()
    .email({ message: "Invalid email address" })
    .toLowerCase()
    .trim(),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(100, { message: "Password is too long" })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, and one number",
      }
    ),

  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" })
    .max(15, { message: "Phone number is too long" })
    .regex(/^[\d\s+()-]+$/, { message: "Invalid phone number format" })
    .trim(),

  bloodGroup: z.enum(bloodGroups, {
    required_error: "Please select a blood group",
    invalid_type_error: "Invalid blood group selected",
  }),

  city: z
    .string()
    .min(2, { message: "City name must be at least 2 characters" })
    .max(50, { message: "City name is too long" })
    .regex(/^[a-zA-Z\s-]+$/, {
      message: "City name can only contain letters, spaces, and hyphens",
    })
    .trim(),

  lastDonationDate: z
    .string()
    .optional()
    .refine((val) => !val || !isNaN(Date.parse(val)), {
      message: "Invalid date format",
    })
    .transform((val) => (val === "" ? null : val)),
});

export const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .toLowerCase()
    .trim(),

  password: z.string().min(1, { message: "Password is required" }),
});