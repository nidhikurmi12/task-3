import mongoose, { Document, Model } from "mongoose";

interface IUserSchema {
  candidateId: mongoose.Schema.Types.ObjectId; 
  IsMailSend: boolean;
  time: string | null;
  date: string | null;
}

type IUserModel = IUserSchema & Document;

const mailverificationSchema = new mongoose.Schema<IUserSchema>(
  {
    candidateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      required: true,
    },
    time: {
      type: String,
      default: null,
    },
    date: {
      type: String,
      default: null,
    },
    IsMailSend:{
        type: Boolean,
        default: false,
    },
  },
  {
    timestamps: true,
  }
);

const ReminderModel: Model<IUserModel> = mongoose.model<IUserModel>(
  "remindermodel",
  mailverificationSchema
);
export default ReminderModel;
