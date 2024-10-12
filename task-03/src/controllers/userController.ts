import { Candidate, MailVerification, User } from "../models";
import { userService } from "../services";
import path from "path";

const userServiceInstance = new userService();

const registerController = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

   if([fullname,email,password].some((ele)=>ele==="")){
    return res.status(400).json({ message: "fill all the fileds" });
   }

    const result = await userServiceInstance.createUser({
      fullname,
      email,
      password,
    });
    console.log(result)
      

    if (result.success) {
      await Candidate.create({ candidateId: result.user._id });
      return res
        .status(201)
        .send({ message: "User registered successfully", user: result.user });
    } else {
      return res.status(400).json({ message: result.message });
    }
  } catch (error) {
    res.status(500).json({ error: "intern serever err" }); 
    console.log(error)
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await userServiceInstance.login({ email, password });
    if ([email, password].some((ele) => ele === "")) {
      return res.status(400).json({ message: "Fill all the fields" });
    }
    
  
    if (!result.success) {
      return res
        .status(400)
        .send({ success: result.success, message: result.message });
    }
    res.cookie("token", result.data.accessToken, {
      httpOnly: true,
      secure: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).send(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const dashBoardController = async (req, res) => {
  try {
    const { email } = req.user;
    const result = await userServiceInstance.getUserDetails(email);
    if (!result.success) {
      return res
        .status(400)
        .send({ success: result.success, message: result.message });
    }
    return res.status(200).send(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const verificationController = async (req, res) => {
  console.log("route hit");
  try {
    const id = req.params.id;

    const verifyObject = await MailVerification.findOne({ id });
    if (!verifyObject) {
      const filePath = path.join(__dirname, "../views/invaild.html");
      return res.sendFile(filePath);
    }

    if (verifyObject.IsExpired) {
      const filePath = path.join(__dirname, "../views/verification.html");
      return res.sendFile(filePath);
    }

    const findUserByEmail = await userServiceInstance.getUserDetails(
      verifyObject.email
    );

    if (!findUserByEmail.data.email) {
      const filePath = path.join(__dirname, "../views/usernotfound.html");
      return res.sendFile(filePath);
    }

    await User.findOneAndUpdate(
      { email: findUserByEmail.data.email },
      { IsEmailVerified: true },
      { new: true }
    );

    await MailVerification.findByIdAndUpdate(
      { _id: verifyObject._id },
      {
        IsExpired: true,
      }
    );
    const file = path.join(__dirname, "../views/verificationsuccess.html");

    return res.sendFile(file);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

export {
  registerController,
  loginController,
  dashBoardController,
  verificationController,
};
