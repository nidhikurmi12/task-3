import {Router} from "express"
import { getAllCandidate, updateInterviewSchedule } from "../controllers/adminController";

const route=Router()


route.get("/candidate",getAllCandidate)
route.post("/interview/:id",updateInterviewSchedule)


export default route;