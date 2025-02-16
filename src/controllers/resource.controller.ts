import { Request, Response } from "express";
import { ResourceService } from "../services/resource.service";

export class ResourceController {
  constructor(private topicService: ResourceService) {}

  create(req: Request, res: Response) {
    const { topicId, url, description, type } = req.body;
    if (!topicId || !url || !description || !type) {
      return res
        .status(400)
        .json({ message: "topicId, url, description e type são obrigatórios" });
    }

    const topic = this.topicService.create({ topicId, url, description, type });
    res.status(201).json(topic);
  }

  update(req: Request, res: Response) {
    const { id } = req.params;
    const { url, description, type } = req.body;
    if (!url || description || type) {
      return res
        .status(400)
        .json({ message: "url, description e type são obrigatórios" });
    }

    const topic = this.topicService.update(id, { url, description, type });
    res.status(201).json(topic);
  }

  getAll(req: Request, res: Response) {
    const topics = this.topicService.getAll();
    res.json(topics);
  }

  getById(req: Request, res: Response) {
    const { id } = req.params;
    const topic = this.topicService.getById(id);
    res.json(topic);
  }
}
