import mongoose, { Document, Model } from "mongoose";



interface IUserSchema {
  email: string;
  id:string
  IsExpired:boolean
}

type IUserModel = IUserSchema & Document;

const mailverificationSchema = new mongoose.Schema<IUserSchema>({
 
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
  },
  id: {
    type: String,
    required: [true, "id is require"],
  },
  IsExpired:{
    type:Boolean,
    default:false
  }
});


const MailVerification: Model<IUserModel> = mongoose.model<IUserModel>("Emailverification", mailverificationSchema);
export default MailVerification
