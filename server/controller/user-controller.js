import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import  user from "../model/user.js";
import Token from "../model/token.js";

dotenv.config();

export const signupuser = async(request, response) => {
  try {
    //const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(request.body.password, 10);
    const User = {
      username: request.body.username,
      name: request.body.name,
      password: hashedPassword,
    };

    const newUser = new user(User);
    await newUser.save();
    return response.status(200).json({ msg: "signup successfull" });
  } catch (error) {
    return response.status(500).json({ msg: "error while signup user" });
  }
};
export const loginUser = async(request, response) => {
  let User = await user.findOne({ username: request.body.username });
  if (!User) {
    return response.status(400).json({ msg: "Username does not  match" });
  }
  try {
    let match = await bcrypt.compare(request.body.password, User.password);
    if (match) {
      const accestoken = jwt.sign(
        User.toJSON(),
        process.env.ACCESS_SECRET_KEY,
        { expiresIn: "15m" }
      ); //not permanent
      const refreshtoken = jwt.sign(
        User.toJSON(),
        process.env.REFRESH_SECRET_KEY
      );

      const newToken = new Token({ token: refreshtoken });
      await newToken.save();

      return response
        .status(200)
        .json({
          accestoken: accestoken,
          refreshtoken: refreshtoken,
          name: User.name,
          username: User.username,
        });
    } else {
      return response.status(400).json({ msg: "Password does not match" });
    }
  } catch (error) {
    return response.status(500).json({ msg: "Error while login" });
  }
};
