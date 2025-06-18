import { Request, Response } from "express";
import { User } from "../../../models/userModel.js";

//<========================================================================GET ADMIN PROFILE INFO======================================================>
export const getAdminProfileDetails = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const user = req.user;
    // console.log(user);

    if (!user) {
      return res.status(400).json({
        success: false,
        error: "user not provided",
      });
    }

    return res.status(200).json({
      success: true,
      message: `Admin data fetched!`,
      admin: user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: "Unable to fetch profile data, try again later",
    });
  }
};
//<==========================================================EDIT ADMIN INFO========================================================
export const editAdminInfo = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { name, phone } = req.body;
    const user = req.user;
    const editUser = await User.findById(user!._id);

    if (!editUser) {
      console.log("No edit user found");
      return res.status(500).json({
        success: false,
        error: "Unable to edit now, try again later",
      });
    }

    if (!name && !phone) {
      return res.status(400).json({
        success: false,
        error: "Atleast provide one field",
      });
    }

    if (name && editUser!.name !== name) {
      editUser.name = name;
    }

    if (phone && editUser.phone !== phone) {
      const isValidPhone = /^\d{10}$/.test(phone);

      if (!isValidPhone) {
        return res.status(400).json({
          success: false,
          error:
            "Phone number must be exactly 10 digits and contain only numbers.",
        });
      }
      editUser.phone = phone;
    }

    await editUser.save();

    return res.status(200).json({
      success: true,
      message: "Updated",
      admin: editUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: "Unable to edit now, try again later",
    });
  }
};
