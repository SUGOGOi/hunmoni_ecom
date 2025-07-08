import { Request, Response } from "express";
import { db } from "../../../config/dbConfig.js";

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

    if (!name && !phone) {
      return res.status(400).json({
        success: false,
        error: "Atleast provide one field",
      });
    }

    // Build update data object
    const updateData: { name?: string; phone?: string } = {};

    if (name) {
      updateData.name = name;
    }

    if (phone) {
      const isValidPhone = /^\d{10}$/.test(phone);

      if (!isValidPhone) {
        return res.status(400).json({
          success: false,
          error:
            "Phone number must be exactly 10 digits and contain only numbers.",
        });
      }
      updateData.phone = phone;
    }

    // Update user using Prisma
    const updatedUser = await db.user.update({
      where: { id: user!.id },
      data: updateData,
    });

    const getUser = await db.user.findUnique({
      where: { id: user!.id },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        isEmailVerified: true,
        isPhoneVerified: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Updated",
      admin: getUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: "Unable to edit now, try again later",
    });
  }
};
