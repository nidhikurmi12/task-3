import mongoose, { Document, Model } from "mongoose";

interface IUserSchema {
  candidateId: mongoose.Schema.Types.ObjectId; 
  IsExpired: boolean;
  IsInterviewShedule: boolean;
  time: string | null;
  date: string | null;
}

type IUserModel = IUserSchema & Document;

const CandidateModel = new mongoose.Schema<IUserSchema>(
  {
    candidateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      required: true,
    },
    IsInterviewShedule: {
      type: Boolean,
      default: false,
    },
    time: {
      type: String,
      default: null,
    },
    date: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Candidate: Model<IUserModel> = mongoose.model<IUserModel>(
  "Candidate",
  CandidateModel
);
export default Candidate;
