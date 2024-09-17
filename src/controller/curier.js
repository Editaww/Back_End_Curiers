import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import CurierModel from "../model/curier.js";

const SIGN_UP = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);

    const hash = bcrypt.hashSync(req.body.password, salt);

    const curier = {
      name: req.body.name,
      address: req.body.address,
      email: req.body.email,
      password: hash,
      id: uuidv4(),
    };

    const response = await new CurierModel(curier);

    await response.save();

    return res
      .status(201)
      .json({ message: " Curier was created", response: response });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "error in aplication" });
  }
};
const LOGIN = async (req, res) => {
  try {
    const curier = await CurierModel.findOne({ email: req.body.email });

    if (!curier) {
      return res.status(401).json({ message: "Your email or password is bad" });
    }
    console.log(curier);
    const isPasswordMatch = bcrypt.compareSync(
      req.body.password,
      curier.password
    );

    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Your email or password is bad" });
    }

    const token = jwt.sign(
      { email: curier.email, curierId: curier.id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    return res.status(200).json({ token: token, curierId: curier.id });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "error in application" });
  }
};
const GET_CURIERS = async (req, res) => {
  try {
    const response = await CurierModel.find();

    return res.status(200).json({ curiers: response });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "error in application" });
  }
};

const GET_CURIER_BY_ID = async (req, res) => {
  try {
    const response = await CurierModel.findOne({ id: req.params.id });

    return res.status(200).json({ curier: response });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "error in application" });
  }
};

const DELETE_CURIER_BY_ID = async (req, res) => {
  try {
    const response = await CurierModel.findOneAndDelete({
      id: req.params.id,
    });

    if (!response) {
      return res.status(404).json({ message: "Curier not found" });
    }

    return res
      .status(200)
      .json({ message: "Curier was deleted", package: response });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "error in application" });
  }
};

const VALIDATE_LOGIN = async (req, res) => {
  try {
    return res.status(200).json({ message: "User Ok" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "error in application" });
  }
};

export {
  SIGN_UP,
  LOGIN,
  GET_CURIERS,
  GET_CURIER_BY_ID,
  DELETE_CURIER_BY_ID,
  VALIDATE_LOGIN,
};
