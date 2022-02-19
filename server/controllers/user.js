const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ObjectId = require("mongoose").Types.ObjectId;

const { User } = require("../models/user");

const { validate } = require("./utils/validation");
const { userSchema, loginSchema } = require("./utils/schemas");

exports.loginUser = async (req, res) => {
  try {
    const error = validate(req.body, loginSchema);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({
      $or: [
        { email: req.body.emailORusername },
        { username: req.body.emailORusername },
      ],
    });
    if (!user) return res.status(400).send("Invalid Email or Username");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) return res.status(400).send("Invalid Password");

    const token = jwt.sign(
      { _id: user._id, username: user.username },
      process.env.JWT
    );

    res.status(200).json({
      data: token,
      msg: "Logged In Successfully",
    });
    return;
  } catch (error) {
    console.error("Error (Login) : ", error);
    res.status(500).send(error);
  }
};

exports.registerUser = async (req, res) => {
  try {
    const error = validate(req.body, userSchema);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({
      $or: [{ email: req.body.email }, { username: req.body.username }],
    });
    if (user) return res.status(400).send("User Already Registered");

    let newUser = new User(req.body);

    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);

    const savedUser = await newUser.save();

    const token = jwt.sign(
      { _id: savedUser._id, username: savedUser.username },
      process.env.JWT
    );

    res
      .status(200)
      .json({ msg: "Successfully Registered the User", data: token });

    return;
  } catch (error) {
    console.error("Error (Register User) : ", error);
    res.status(500).send(error);
  }
};

exports.getUser = async (req, res) => {
  try {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) return res.status(400).send("Invalid Id");

    const user = await User.findById(id).select("-password -__v");

    if (!user) return res.status(404).send("User Not Found");

    res.status(200).json({ data: user });
  } catch (error) {
    console.error("Error (Get User) : ", error);
    res.status(500).send(error);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const newUser = req.body;

    const user = await User.findById(req.user._id);

    if (!user) return res.status(400).send("User Not Found");

    user.username = newUser.username;
    user.email = newUser.email;
    user.fullName = newUser.fullName;

    if (newUser.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newUser.password, salt);
    }

    const savedUser = await user.save();

    const token = jwt.sign(
      { _id: savedUser._id, username: savedUser.username },
      process.env.JWT
    );

    res.status(200).json({ data: token, msg: "User Successfully Updated" });
  } catch (error) {
    console.error("Error (Update User) : ", error);
    res.status(500).send(error);
  }
};
