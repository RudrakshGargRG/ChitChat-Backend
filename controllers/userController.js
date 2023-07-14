const User = require('../models/userModel');
const bcrypt = require('bcrypt');
module.exports.login = async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user)
        return res.json({ msg: "Incorrect Username or Password", status: false });
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid)
        return res.json({ msg: "Incorrect Username or Password", status: false });
      delete user.password;
      return res.json({ status: true, user });
    } catch (ex) {
      next(ex);
    }
  };
  
  module.exports.register = async (req, res, next) => {
    try {
      const { username, email, password } = req.body;
      const usernameCheck = await User.findOne({ username });
      if (usernameCheck)
        return res.json({ msg: "Username already in use", status: false });
      const emailCheck = await User.findOne({ email });
      if (emailCheck)
        return res.json({ msg: "Email already in use", status: false });
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        email,
        username,
        password: hashedPassword,
      });
      delete user.password;
      return res.json({ status: true, user });
    } catch (ex) {
      next(ex);
    }
  };

  module.exports.setAvatar = async (req, res, next) => {
    try {
      const userId = req.params.id;
      const avatarImage1 = req.body.image;
      const userData = await User.findByIdAndUpdate(
        userId,
        {
          isAvatarImageSet: true,
          avatarImage: avatarImage1
        }
      );
      return res.json({
        isSet: userData.isAvatarImageSet,
        avatarImage: userData.avatarImage
      })
    } catch (ex) {
      next(ex);
    }
  }

  module.exports.getAllUsers = async (req, res, next) => {
    try {
      
      const users = await User.find({ _id: { $ne: req.params.id } }).select([
        "email",
        "username",
        "avatarImage",
        "_id",
      ]);
      return res.json(users);
    } catch (ex) {
      next(ex);
    }
  }


  module.exports.getUserProfile = async (req, res, next) => {
    try {

      const userId = req.params.id;
      const user = await User.findOne({_id: userId});
      return res.json(user);

    } catch (ex) {
      next(ex);
    }
  }

  module.exports.updateUserProfile = async (req, res, next) => {
    try {
      const userId = req.params.id;
      const about = req.body.about;
      const user = await User.findByIdAndUpdate(
        userId,
        {
          about: about
        }
      );
      // console.log(user);
      return res.json({
        user
      })
    } catch (ex) {
      next(ex);
    }
  }