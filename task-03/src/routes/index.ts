import { Router } from "express";
import userRoutes from "./user.routes";
import adminRoutes from "./admin.routes"
import { paths } from "./path";

const route = Router();

route.use(paths.user.Base, userRoutes);
route.use(paths.admin.Base, adminRoutes);

export default route;
