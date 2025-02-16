import { Router } from "express";
import topicRoutes from "./topic.routes";
import resouceRoutes from "./resouce.routes";
import userRoutes from "./user.routes";

const router = Router();

router.use("/topics", topicRoutes);
router.use("/resources", resouceRoutes);
router.use("/users", userRoutes);

export default router;
