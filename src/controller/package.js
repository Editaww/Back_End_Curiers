import { v4 as uuidv4 } from "uuid";
import PackageModel from "../model/package.js";

const CREATE_PACKAGE = async (req, res) => {
  try {
    const newPackage = {
      recipientName: req.body.recipientName,
      deliveryAddress: req.body.deliveryAddress,
      weight: req.body.weight,
      dueDate: req.body.dueDate,
      status: req.body.status,
      curierId: req.body.curierId,
      id: uuidv4(),
    };

    const response = await new PackageModel(newPackage);

    await response.save();

    return res
      .status(201)
      .json({ message: " Package was created", response: response });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "An error occurred while creating the package" });
  }
};

const GET_PACKAGES = async (req, res) => {
  try {
    const response = await PackageModel.find();

    return res.status(200).json({ packages: response });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "error in application" });
  }
};

const GET_CURIER_PACKAGES = async (req, res) => {
  try {
    const response = await PackageModel.find({ curierId: req.params.curierId });

    return res.status(200).json({ packages: response });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "error in application" });
  }
};

const GET_PACKAGE_BY_ID = async (req, res) => {
  try {
    const response = await PackageModel.findOne({ id: req.params.id });

    return res.status(200).json({ package: response });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "error in application" });
  }
};

const UPDATE_PACKAGE_BY_ID = async (req, res) => {
  try {
    const response = await PackageModel.findOne({ id: req.params.id });

    if (!response) {
      return res.status(404).json({ message: "Package does not exist" });
    }

    if (response.curierId !== req.body.curierId) {
      return res
        .status(403)
        .json({ message: "You can only update packages that belong to you" });
    }

    const updatedPackage = await PackageModel.findOneAndUpdate(
      { id: req.params.id },
      { $set: req.body },
      { new: true }
    );

    return res
      .status(200)
      .json({ message: "Package was updated!", package: updatedPackage });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
};
const DELETE_PACKAGE_BY_ID = async (req, res) => {
  try {
    const response = await PackageModel.findOne({
      id: req.params.id,
    });

    if (response.curierId !== req.body.curierId) {
      return res
        .status(403)
        .json({ message: "Yuo can only delete packages what belongs to You" });
    }

    if (!response) {
      return res.status(404).json({ message: "Package not found" });
    }
    await PackageModel.deleteOne({ id: req.params.id });
    return res
      .status(200)
      .json({ message: "Package was deleted", package: response });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "error in application" });
  }
};

export {
  CREATE_PACKAGE,
  GET_PACKAGES,
  GET_CURIER_PACKAGES,
  GET_PACKAGE_BY_ID,
  UPDATE_PACKAGE_BY_ID,
  DELETE_PACKAGE_BY_ID,
};
