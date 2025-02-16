import { Request, Response } from "express";
import { UserService } from "../services/user.service";

export class UserController {
  constructor(private userService: UserService) {}

  create(req: Request, res: Response) {
    const { name, email, role } = req.body;
    if (!name || !email || !role) {
      return res
        .status(400)
        .json({ message: "name, email e role são obrigatórios" });
    }

    const topic = this.userService.create(name, email, role);
    res.status(201).json(topic);
  }

  getAll(req: Request, res: Response) {
    const users = this.userService.getAll();
    res.json(users);
  }

  getById(req: Request, res: Response) {
    const { id } = req.params;
    const user = this.userService.getById(id);
    res.json(user);
  }
}
