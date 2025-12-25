import Donor from "../models/Donor.js";


export const getMyProfile = async (req, res, next) => {
  try {
    res.json({
      success: true,
      donor: req.user,
    });
  } catch (error) {
    next(error);
  }
};


export const updateProfile = async (req, res, next) => {
  try {
    const updates = req.body;

    const updatedDonor = await Donor.findByIdAndUpdate(req.user._id, updates, {
      new: true,
      runValidators: true,
      select: "-password",
    });

    res.json({
      success: true,
      donor: updatedDonor,
    });
  } catch (error) {
    next(error);
  }
};


export const searchDonors = async (req, res, next) => {
  try {
    const { city, bloodGroup } = req.query;

    const query = { availability: true };

    if (city) query.city = { $regex: city, $options: "i" };
    if (bloodGroup) query.bloodGroup = bloodGroup;

    const donors = await Donor.find(query).select(
      "fullName bloodGroup city phone availability"
    );

    res.json({
      success: true,
      count: donors.length,
      donors,
    });
  } catch (error) {
    next(error);
  }
};


export const deleteDonor = async (req, res, next) => {
  try {
    const donor = await Donor.findById(req.params.id);

    if (!donor) {
      res.status(404);
      throw new Error("Donor not found");
    }

    await donor.remove();
    res.json({ success: true, message: "Donor deleted successfully" });
  } catch (error) {
    next(error);
  }
};
