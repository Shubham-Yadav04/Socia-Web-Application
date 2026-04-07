import { userModel } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
export const getLoggedInUser = (req, res) => {
  return res.status(200).json({ user: req.user });
};
export const registerUser = async (req, res, next) => {
  const { username, fullname, email, password } = req.body;

  //  we have to check each of the above field that are they null or not for that we can either check it individually or we can use a higher order function

  if (
    [username, fullname, email, password].some((field) => field?.trim() === "")
  ) {
    return res.status(400).json({ error: "All fields are necessary" });
  }
  // check does the user with this credintial already exists

  const existsUser = await userModel.findOne({
    $or: [{ username }, { email }],
  });
  console.log(existsUser);
  if (existsUser) {
    return res.status(409).json({ error: "User already exists" });
  }

  // agar sub kuch thik rehta h avatar bhi aajata hai to user ko add krdo cloudinary par

  // uploadFileAsync(req.file.path);

  // save the user in the database
  try {
    const user = await userModel.create({
      username,
      email,
      fullname,
      password,
    });
    const accessToken = jwt.sign(
      {
        username: user.username,
      },
      process.env.ACCESS_TOKEN_SECRET_KEY,
      {
        expiresIn: 24 * 60 * 60,
      }
    );
    const refreshToken = jwt.sign(
      {
        username: user.username,
      },
      process.env.REFRESH_TOKEN_SECRET_KEY,
      {
        expiresIn: 7 * 24 * 60 * 60,
      }
    );

    res.cookie("jwt", accessToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.cookie("jwtRefreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json(user);
  } catch (error) {
    console.error("Error in registration:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
//  get user
const userProjection = {
  username: 1,
  email: 1,
  fullname: 1,
};
export const getUserByUsername = async (req, res) => {
  const user = await userModel.findOne(
    {
      username: req.params.username,
    },
    userProjection
  );
  if (user) {
    return res.status(200).json(user);
  }
  return res.status(404).json({
    message: "No such user exists",
  });
};
// by email
export const getUserByEmail = async (req, res) => {
  const user = await userModel.findOne(
    {
      email: req.params.email,
    },
    userProjection
  );
  if (user) {
    return res.status(200).json(user);
  }
  return res.status(404).json({
    message: "No such user exists",
  });
};
//  by id
export const getUserById = async (req, res) => {
  const user = await userModel.findById(req.params.id, userProjection);
  if (user) {
    return res.status(200).json(user);
  }
  return res.status(404).json({
    message: "No such user exists",
  });
};

//  update user details route  mujhe update se phle login middelware lagana padega

// things to update in a user model are :
// 1. full name

export const updateUsername = async (req, res) => {
  const oldUsername = req.user.username;
  const newUsername = req.query.username;
  if (!newUsername || newUsername === oldUsername)
    return res.status(400).json({
      message: "Enter a valid username",
    });

  try {
    const dbUser = await userModel.findOne({ username: newUsername });
    if (dbUser) {
      return res.json({
        message: "there is a user with this name use any other username",
      });
    }

    const result = await userModel.updateOne(
      {
        _id: req.user._id,
      },
      {
        $set: {
          username: newUsername,
        },
      }
    );
    if (result.modifiedCount > 0)
      return res.status(200).json({
        message: "username updated ",
        username: newUsername,
      });

    return res.send("no user updated ");
  } catch (error) {
    return res.status(500).send("some Internal Server error occurred ");
  }
};
// 2.  avatar
export const updateAvatar = async (req, res) => {
  const newAvatarFilePath = req.file.path;
  if (!newAvatarFilePath)
    return res.status(400).json({
      message: "Please give a file path to be upldoaded ",
    });
  try {
    const result = await userModel.updateOne(
      {
        _id: req.user._id,
      },
      {
        $set: {
          avatar: newAvatarFilePath,
        },
      }
    );

    if (result.modifiedCount > 0)
      return res.status(200).json({
        message: " user avatar updated",
      });

    return res.status(400).json({
      message: "user avatar not updated ",
    });
  } catch (error) {
    console.log("error ha occurred ", error);
    return res.status(500).json({
      message: "error occurred while working with database",
    });
  }
};

//  3. password

export const changePassword = async (req, res) => {
  const oldPassword = req.body.oldPassword?.trim();
  const newPassword = req.body.newPassword?.trim();
  if (!newPassword || newPassword === "")
    return res.status(400).send("enter the a new password");
  try {
    const comparePassword = await req.user.comparePassword(oldPassword);
    if (!comparePassword) return res.status(403).send(" wrong Password");

    if (newPassword === oldPassword)
      return res.status(400).json({
        message: "The new Password should be different ",
      });
    const result = await userModel.updateOne(
      {
        _id: req.user._id,
      },
      {
        $set: {
          password: newPassword,
        },
      }
    );

    if (result.modifiedCount > 0)
      return res.status(200).send("user password is changed ");

    return res.status(404).json({
      message: "no such user exists",
    });
  } catch (err) {
    return res
      .status(500)
      .send("Internal Server error while working with database ");
  }
};
//  4 . change email

export const changeEmail = async (req, res) => {
  const newEmail = req.body.email?.trim();
  if (!newEmail) return res.status(400).send("enter a New Email");

  try {
    const result = await userModel.updateOne(
      {
        _id: req.user._id,
      },
      {
        $set: {
          email: newEmail,
        },
      }
    );
    if (result.modifiedCount > 0)
      return res.status(200).send("user email is changed ");

    return res.status(404).json({
      message: "no such user exists",
    });
  } catch (error) {
    console.log("error occurred ", error);
    return res
      .status(500)
      .send("internal server error occurred while working with Database");
  }
};
//5. fullname
export const changeFullname = async (req, res) => {
  const newFullname = req.body.fullname?.trim();
  if (!newFullname) return res.status(400).send("enter a New Email");

  try {
    const result = await userModel.updateOne(
      {
        _id: req.user._id,
      },
      {
        $set: {
          fullname: newFullname,
        },
      }
    );
    if (result.modifiedCount > 0)
      return res.status(200).send("user fullname is changed ");

    return res.status(404).json({
      message: "no such user exists",
    });
  } catch (error) {
    console.log("error occurred ", error);
    return res
      .status(500)
      .send("internal server error occurred while working with Database");
  }
};

// delete the account of the user

export const deleteUserAccount = async (req, res) => {
  try {
    const dbUser = await userModel.findOne({
      username: req.user.username,
    });

    if (!dbUser)
      return res.status(404).json({
        message: "No such user Exists",
      });

    const result = await userModel.deleteOne({
      username: username,
    });
    if (result.modifiedCount > 0)
      return res.status(200).json({
        "message ": "Account deleted successfully ",
      });

    return res.send("no such user exists");
  } catch (error) {
    console.log("error occurred ", error);
    return res
      .status(500)
      .send("Internal server Error while deleting the Account ");
  }
};

// controller to get all the post of a user
export const getAllPosts = async (req, res) => {
  const { id: userId } = req.params;

  if (!userId) {
    return res
      .status(400)
      .json({ message: "Please provide a valid user identifier" });
  }

  try {
    const user = await userModel
      .findOne({ _id: userId })
      .populate({
    path: "userPosts",
    populate: {
      path: "user", 
      select: " username avatar" 
    }
  });
    if (!user) {
      return res.status(404).json({ message: "No such user exists" });
    }

    return res.status(200).json({
      userPosts: user.userPosts,
      postCount: user.userPosts.length,
    });
  } catch (error) {
    console.error("Error fetching user posts:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//  controller related to followers and following

export const getUserFollowings = async (req, res) => {
  const { id } = req.params;
  const page = req.query.page || 1;
  const limit = req.query.limit || 20;
  const skip = (page - 1) * limit;
  const query = {};
  if (id) query._id = new mongoose.Types.ObjectId(id);

  try {
    const user = await userModel.aggregate([
      {
        $match: query,
      },
      {
        $lookup: {
          from: "users",
          localField: "following",
          foreignField: "_id",
          as: "userFollowings",
        },
      },
      {
        $unwind: {
          path: "$userFollowings",
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
      {
        $project: {
          "userFollowings.username": 1,
          "userFollowings.fullname": 1,
          "userFollowings.avatar": 1,
        },
      },
    ]);
    if (user) {
      return res.status(200).json({
        userFollowings: user,
        userFollowingCount: user.length,
      });
    }
    return res.status(200).json({
      message: "user does not follow anyone",
      userFollowingCount: 0,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "sone internal server error has occurred",
    });
  }
};
export const getUserFollowers = async (req, res) => {
  const {id } = req.params;
  const page = req.query.page || 1;
  const limit = req.query.limit || 20;
  const skip = (page - 1) * limit;
  const query = {};
  
  if (id) query._id = new mongoose.Types.ObjectId(id);

  try {
    const user = await userModel.aggregate([
      {
        $match: query,
      },
      {
        $lookup: {
          from: "users",
          localField: "followers",
          foreignField: "_id",
          as: "userFollowers",
        },
      },
      {
        $unwind: {
      path: "$userFollowers",
      preserveNullAndEmptyArrays: false,
    },
      },
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
      {
        $project: {
          "userFollwers.username": 1,
          "userFollowers.fullname": 1,
          "userFollowers.avatar": 1,
        },
      },
    ]);
    if (user) {
      return res.status(200).json({
        userFollowers: user,
        userFollowerCount: user.length,
      });
    }
    return res.status(200).json({
      message: "user does not have any follower ",
      userFollowerCount: 0,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "sone internal server error has occurred",
    });
  }
};

//  follow someone
export const followUser = async (req, res) => {
  const userId = req.params.userId;
  const profileId = req.body.profileId;

  try {
    // Update the profile's followers list
    const updateFollowerList = await userModel.updateOne(
      { _id: profileId },
      { $addToSet: { followers: userId } }
    );
console.log("request to follow user received ", userId, profileId);
    if (updateFollowerList.modifiedCount === 0) {
      return res.status(400).json({
        message: "Follower not recorded",
      });
    }

    // Update the user's following list
    const updateFollowings = await userModel.updateOne(
      { _id: userId },
      { $addToSet: { following: profileId } }
    );

    if (updateFollowings.modifiedCount > 0) {
      return res.status(200).json({
        message: "Followers and following updated successfully",
      });
    }

    return res.status(500).json({
      message: "User followings not updated",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Some Internal Server Error",
    });
  }
};
export const unfollowUser_UpdateFollowing=async(req,res)=>{
  const userId = req.params.userId;
  const profileId = req.body.profileId; 
  try {
     const updateOthers_Followers = await userModel.updateOne(
      { _id: profileId },
      { $pull: { followers: userId } }
    );

    res.status(200).json({
      message: "Unfollow successful",
      updateFollowings,
      updateOthers_Followers
    });
  }
  catch(e){
console.log(err);
throw err;
  }
}

export const getAllUsers = async (req, res) => {
  const users = await userModel.find(); // it will give all the users
  return res.json(users);
};


export const getRandomUserSuggestions=async (req,res)=>{
 
  const userId= req.user._id;
  try {
        const suggestions= await userModel.aggregate([
      {
      $match: {
        _id: { $ne: new mongoose.Types.ObjectId(userId) }
      }
    }
    ,
      {
        $sample:{
          size:20
        }
      }
    ])

    return res.status(200).json(
      {
        suggestions
      }
    )
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      "message":"error occurred"
    })
  }
}