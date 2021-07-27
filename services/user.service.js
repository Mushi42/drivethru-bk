const _ = require("lodash");

const { User } = require("../models");
const mongoose = require('mongoose');
const { userHelper, uplodingHelper } = require("../helpers");
const Email = require('../utils/email.util');


const UserService = {}

UserService.signUp = async (req) => {
  try {
    const reqData = req.body;
    const userExist = await Promise.all([
      User.findOne({ email: reqData.email }),
      User.findOne({ contact: reqData.contact }),
    ])
    if (userExist[0]) return { type: "bad", message: "Email already exist!" };
    if (userExist[1]) return { type: "bad", message: "Contact already exist!" };

    reqData.role = 'student';
    reqData.studentId = Date.now();
    reqData.password = await userHelper.hashPassword(reqData.password)
    const data = await User.create(reqData);
    // new Email(data).sendWelcome()
    return { type: "success", message: `Account created`, data: userHelper.sendUser(data) };
  } catch (error) {
    throw error;
  }
};


UserService.findOne = async (req) => {
  try {
    const { params } = req;
    const data = await User.findById(params.userId).populate('createdBy');
    if (data) {
      return { type: "success", message: "user found!", data };
    } else {
      return { type: "bad", message: "user not found!", data };
    }
  } catch (error) {
    throw error;
  }
};

UserService.getLoginUser = async (req) => {
  try {
    const { user, body } = req;

    const loginUser = await User.findOne({ _id: user.userId })

    if (!loginUser) return { type: "bad", message: "user not exist!", data: user };

    return { type: "success", message: "Please provide valid credentials!", data: loginUser };

  } catch (error) {
    // console.log('Error', error);
    throw error;
  }
};
UserService.completeProfile = async (req) => {
  try {
    const { user, body } = req;
    let data = {};
    const loginUser = await User.findOne({ _id: user.userId });

    if (!loginUser) return { type: "bad", message: "user not exist!", data: user };

    data = await User.findOneAndUpdate({ _id: user.userId }, {
      $set: body
    }, { new: true });

    return { type: "success", message: "Profile Updated", data };

  } catch (error) {
    // console.log('Error', error);
    throw error;
  }
};

UserService.signIn = async ({ body }) => {
  try {
    const { contact, password } = body;
    const user = await User.findOne({
      $or: [{ contact: contact }, { email: contact }],
    }).select("+password");
    if (
      !user ||
      !(await userHelper.comparewPassword(password, user.password))
    ) {
      return { type: "bad", message: "Please provide valid credentials!" };
    }
    user.password = undefined;
    return {
      type: "success",
      message: "You are logged In Successfully",
      data: { token: `Bearer ${await userHelper.generarteToken(user)}` },
    };
  } catch (error) {
    // console.log('Error', error);
    throw error;
  }
};


UserService.findAll = async ({ body, query }) => {
  try {
    const options = query;
    const data = await User.find(options).populate('createdBy');
    if (data.length > 0) {
      return { type: "success", message: "Record found!", data };
    } else {
      return { type: "bad", message: "Record not found!" };
    }
  } catch (error) {
    throw error;
  }
};

UserService.update = async ({ params, body }) => {
  try {
    const _id = params.userId;

    if (body.password) body.password = await userHelper.hashPassword(body.password);

    if (body.email) {
      const emailFound = await User.findOne({ email: body.email });
      if (emailFound) return { type: "bad", message: "Email already exist!" };
    }
    if (body.username) {
      const emailFound = await User.findOne({ username: body.username });
      if (emailFound) return { type: "bad", message: "username already exist!" };
    }
    if (body.contact) {
      const emailFound = awaitUser.findOne({ contact: reqData.contact });
      if (emailFound) return { type: "bad", message: "contact already exist!" };

    }

    const data = await User.findByIdAndUpdate(_id, body, { new: true });
    if (data)
      return {
        type: "success",
        message: `${data.firstName.toUpperCase()} user Updated`,
        data,
      };
    else return { type: "bad", message: `user not found` };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

UserService.purge = async ({ params }) => {
  try {
    const _id = params.userId;
    const data = await User.findByIdAndDelete(_id);
    if (data) {
      return {
        type: "success",
        message: `${data.firstName.toUpperCase()} user Deleted`,
        data
      };
    } else return { type: "bad", message: `user not found` };
  } catch (error) {
    throw error;
  }
};


module.exports = UserService;
