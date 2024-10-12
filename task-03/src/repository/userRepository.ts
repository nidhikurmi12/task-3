import { MailVerification } from "../models";
import user from "../models/usermodel";
import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';

class UserRepository {
  async registerUser(data: {
    fullname: string;
    email: string;
    password: string;
  }) {
    try {
      const response = await user.create(data);

      return response;
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        throw new Error(
          Object.values(error.errors)
            .map((err) => err.message)
            .join(", ")
        );
      }
      throw new Error("error occurred while registering the user");
    }
  }

  async isUserAlreadyPresent(email: string) {
    try {
      const result = await user.findOne({ email });
      if (result) {
        return { success: true, data: result };
      }
      return { success: false, data: null };
    } catch (error) {
      throw new Error("error occurred while registering the user");
    }
  }

  async createVerification(email) {
    console.log(email)
    const randomId = uuidv4();
      const response = await MailVerification.create({
        email:email,
        id: randomId,
      });
      return response;
    }
}

export default UserRepository;
