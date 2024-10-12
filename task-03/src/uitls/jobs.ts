import cron from "node-cron";
import { ReminderModel } from "../models";
import MailSender from "./nodeMailer";
import { interviewTemplate } from "./emailTemplate";
import { Document } from "mongoose";


interface Candidate {
  fullname: string;
  email: string;
}


interface ReminderDocument extends Document {
  date: string;
  time:string;
  IsMailSend: boolean;
  candidateId: Candidate; 
}

const interviewReminderCron = () => {
  cron.schedule("0 * * * *", async () => {  
    try {
      const currentTime = new Date();
      const reminderTime = new Date(currentTime);
      reminderTime.setHours(currentTime.getHours() + 24); 

      const candidatesToRemind = await ReminderModel.find<ReminderDocument>({
        date: reminderTime.toISOString().split("T")[0], 
        IsMailSend: false, 
      }).populate('candidateId').exec();

      console.log(candidatesToRemind);
      
      for (const candidate of candidatesToRemind) {
        const { fullname, email } = candidate.candidateId; 

        const template = interviewTemplate(fullname, candidate.date, candidate.time, "indevmode", "nidhi", "technical");
        await MailSender(email, template);
        
        candidate.IsMailSend = true;
        await candidate.save(); 
      }

      console.log(`Processed ${candidatesToRemind.length} candidates for interview reminders`);
    } catch (error) {
      console.error("Error in cron job:", error);
    }
  });
};

export default interviewReminderCron;
