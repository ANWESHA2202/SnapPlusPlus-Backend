import User from "../models/User";
import bcrypt from "bcryptjs";
import { config } from "dotenv";
import jwt from "jsonwebtoken";
import { getJWT } from "../Utilities/check-token";

config();

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  console.log(req.body, username, email, password);
  let mailExist, usernameExist;
  try {
    usernameExist = await User.findOne({ username: username });
    mailExist = await User.findOne({ email: email });
  } catch (err) {
    return res.status(500).json([{ message: err.message }]);
  }
  if (usernameExist && !mailExist) {
    return res.status(400).json([{ message: "Username already exists" }]);
  } else if (usernameExist || mailExist) {
    return res
      .status(400)
      .json([{ message: "Username or email already exists" }]);
  }
  if (!username || !email || !password) {
    return res.status(400).json([{ message: "All fields are required" }]);
  }
  if (password.length < 6) {
    return res
      .status(400)
      .json([{ message: "Password must be atleast 6 characters long" }]);
  }

  const user = new User({
    username: username,
    email: email,
    password: bcrypt.hashSync(password, 10),
  });

  try {
    await user.save();
  } catch (err) {
    return res.status(500).json([{ message: err.message }]);
  }

  return res
    .status(201)
    .json([{ message: "User created successfully", user: user }]);
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json([{ message: "All fields are required" }]);
  }
  let user, generatedToken;
  try {
    user = await User.findOne({ username: username });
  } catch (err) {
    return res.status(500).json([{ message: err.message }]);
  }
  if (!user) {
    return res.status(400).json([{ message: "Username doesn't exist" }]);
  }
  if (!bcrypt.compareSync(password, user.password)) {
    return res.status(400).json([{ message: "Password is incorrect" }]);
  }

  jwt.sign(
    { user: user },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "900s" },
    (err, token) => {
      if (err) {
        return res.status(500).json([{ message: err.message }]);
      }
      return res
        .status(200)
        .json([{ message: "Login successful", token: token }]);
    }
  );
};

export const getUserProfile = async (req, res) => {
  const token = req.token;
  const userName = jwt.decode(token).user.username;
  let user;

  try {
    user = await User.findOne({ username: userName });
  } catch (err) {
    return res.status(400).json([{ message: err.message }]);
  }
  if (!user) {
    return res.status(404).json([{ message: "User Not Found" }]);
  }
  return res.status(200).json([{ message: "User Found", user }]);
};

export const updateProfilePicture = async (req, res) => {
  const token = req.token;
  const userName = jwt.decode(token).user.username;
  let user;

  try {
    user = await User.findOneAndUpdate(
      { username: userName },
      {
        profilePicture: req.body.profilePicture,
      }
    );
  } catch (err) {
    return res.status(400).json([{ message: err.message }]);
  }
  if (!user) {
    return res.status(404).json([{ message: "User Not Found" }]);
  }
  return res.status(200).json([{ message: "Profile Picture Updated", user }]);
};

export const updateProfileUsername = async (req, res) => {
  const { userName } = req.body;
  const token = req.token;
  const oldUserName = jwt.decode(token).user.username;
  let user;

  if (userName === oldUserName) {
    return res
      .status(400)
      .json([{ message: "Username is same as previous username" }]);
  }

  try {
    user = await User.findOne({ username: userName });
  } catch (err) {
    return res.status(400).json([{ message: err.message }]);
  }
  if (user) {
    return res.status(400).json([{ message: "Username already exists" }]);
  }

  try {
    user = await User.findOneAndUpdate(
      { username: oldUserName },
      {
        username: userName,
      }
    );
  } catch (err) {
    return res.status(400).json([{ message: err.message }]);
  }
  if (!user) {
    return res.status(404).json([{ message: "User Not Found" }]);
  }

  jwt.sign(
    { user: user },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "100000000s" },
    (err, token) => {
      if (err) {
        return res.status(500).json([{ message: err.message }]);
      }
      return res
        .status(200)
        .json([{ message: "Username Updated", user, token: token }]);
    }
  );
};

export const updateProfileEmail = async (req, res) => {
  const { email } = req.body;
  const token = req.token;
  const oldEmail = jwt.decode(token).user.email;
  let user;

  if (email === oldEmail) {
    return res
      .status(400)
      .json([{ message: "Email is same as previous email" }]);
  }

  try {
    user = await User.findOne({ email: email });
  } catch (err) {
    return res.status(400).json([{ message: err.message }]);
  }
  if (user) {
    return res.status(400).json([{ message: "Email already exists" }]);
  }

  try {
    user = await User.findOneAndUpdate(
      { email: oldEmail },
      {
        email: email,
      }
    );
  } catch (err) {
    return res.status(400).json([{ message: err.message }]);
  }
  if (!user) {
    return res.status(404).json([{ message: "User Not Found" }]);
  }

  jwt.sign(
    { user: user },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "100000000s" },
    (err, token) => {
      if (err) {
        return res.status(500).json([{ message: err.message }]);
      }
      return res
        .status(200)
        .json([{ message: "Email Updated", user, token: token }]);
    }
  );
};

export const updateProfilePassword = async (req, res) => {
  const { password } = req.body;
  const token = req.token;
  const email = jwt.decode(token).user.email;
  const oldPassword = jwt.decode(token).user.password;
  let user;

  if (bcrypt.compareSync(password, oldPassword)) {
    return res
      .status(400)
      .json([{ message: "Password is same as previous password" }]);
  }

  try {
    user = await User.findOneAndUpdate(
      { email: email },
      {
        password: bcrypt.hashSync(password, 10),
      }
    );
  } catch (err) {
    return res.status(400).json([{ message: err.message }]);
  }
  if (!user) {
    return res.status(404).json([{ message: "User Not Found" }]);
  }

  return res.status(200).json([{ message: "Password Updated", user }]);
};

export const signOut = async (req, res) => {
  const token = req.token;
  const userName = jwt.decode(token).user.username;

  let user;
  try {
    user = User.findOne({ username: userName });
  } catch (err) {
    return res.status(400).json([{ message: err.message }]);
  }
  if (!user) {
    return res.status(404).json([{ message: "User Not Found" }]);
  }
  try {
    await User.deleteOne({ username: userName });
  } catch (err) {
    return res.status(400).json([{ message: err.message }]);
  }
  return res.status(200).json([{ message: "User Deleted", user }]);
};

export const refreshToken = async (req, res) => {
  let jwtOld = getJWT(req);

  let userData = jwt.decode(jwtOld);
  jwt.sign(
    userData,
    process.env.JWT_SECRET_KEY,
    { expiresIn: "900s" },
    (err, token) => {
      if (err) {
        return res.status(500).json([{ message: err.message }]);
      }
      return res
        .status(200)
        .json([{ message: "refresh successful", token: token }]);
    }
  );
};
