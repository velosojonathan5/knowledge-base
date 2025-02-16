import { Router } from "express";
import { BasicRepository } from "../repositories/basic.repository";
import { User } from "../entities/user.entity";
import { UserService } from "../services/user.service";
import { UserController } from "../controllers/user.controller";

const repository = new BasicRepository<User>();
const userService = new UserService(repository);
const userController = new UserController(userService);

const router = Router();

router.post("/", userController.create.bind(userController) as () => void);
router.get("/", userController.getAll.bind(userController) as () => void);
router.get("/:id", userController.getById.bind(userController) as () => void);

export default router;
