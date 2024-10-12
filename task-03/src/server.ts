import expres from "express";
import cors from "cors";
import { EnvVars } from "./config/serverConfig";
import connectDB from "./config";
import cookieParser from "cookie-parser";
import allRoutes from "./routes";
import { paths } from "./routes/path";
import serverless from 'serverless-http';
import interviewReminderCron from "./uitls/jobs";
import morgan from "morgan"

const { PORT } = EnvVars;

const app = expres();
connectDB();



app.use(expres.json());
app.use(cors());
app.use(cookieParser());
app.use(morgan("dev"))


app.use(paths.Base, allRoutes);
interviewReminderCron()

app.listen(PORT, () => {
  console.log(`Server is runing on the PORT ${PORT}`);
});


module.exports = app;
module.exports.handler = serverless(app);