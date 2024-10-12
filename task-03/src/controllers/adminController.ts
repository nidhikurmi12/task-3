import mongoose, { Document } from "mongoose";
import { Candidate as CandidateModel, ReminderModel } from "../models";
import { interviewTemplate } from "../uitls/emailTemplate";
import MailSender from "../uitls/nodeMailer";

interface Candidates {
  fullname: string;
  email: string;
}

interface ReminderDocument extends Document {
  date: string;
  time: string;
  IsMailSend: boolean;
  candidateId: Candidates; 
}

const updateInterviewSchedule = async (req, res) => {
  const id = req.params.id; 
  const { date, time } = req.body; 

  try {
    const candidatedata = await CandidateModel.findById(id).populate("candidateId").exec();
    
    if (!candidatedata) {
      return res.status(404).json({ error: "Candidate not found" });
    }

    const populatedCandidateId = candidatedata.candidateId as unknown as Candidates; 
    const userEmail = populatedCandidateId.email;

    candidatedata.date = date;
    candidatedata.time = time;
    candidatedata.IsInterviewShedule = true;

    await candidatedata.save();

    await ReminderModel.create({
      candidateId: candidatedata.candidateId,
      time: time,
      date: date,
    });

    const interviewTemp = interviewTemplate(
      populatedCandidateId.fullname,
      date,
      time,
      "devmode",
      "nidhi",
      "technical"
    );

    await MailSender(userEmail, interviewTemp);

    return res.status(200).json({
      message: "Interview schedule updated successfully",
    });
  } catch (err) {
    console.error("Error updating interview schedule:", err);
    return res.status(500).json({ error: "Error updating interview schedule", details: err.message });
  }
};

  

const getAllCandidate = async (req, res) => {
  try {
    const result = await CandidateModel.find().populate("candidateId");

    return res.status(200).send({ message: "fetched all details", data: result });
  } catch (error) {

   return res.status(500).json({ error: "Error in getting candidate details" });
  }
};

export { updateInterviewSchedule, getAllCandidate };
