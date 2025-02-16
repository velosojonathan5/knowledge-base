import { Request, Response } from "express";
import { TopicService } from "../services/topic.service";

export class TopicController {
  constructor(private topicService: TopicService) {}

  create(req: Request, res: Response) {
    const { name, content, parentTopicId } = req.body;
    if (!name || !content) {
      return res
        .status(400)
        .json({ message: "Nome e conteúdo são obrigatórios" });
    }

    const topic = this.topicService.create(name, content, parentTopicId);
    res.status(201).json(topic);
  }

  update(req: Request, res: Response) {
    const { id } = req.params;
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ message: "Content is mandatory" });
    }

    const topic = this.topicService.update(id, content);
    res.status(201).json(topic);
  }

  getAll(req: Request, res: Response) {
    const topics = this.topicService.getAll();
    res.json(topics);
  }

  getById(req: Request, res: Response) {
    const { id } = req.params;
    const { version } = req.query;
    const topic = this.topicService.getById(id, Number(version));
    res.json(topic);
  }

  getSubtopics(req: Request, res: Response) {
    const { id } = req.params;
    const topics = this.topicService.getSubtopics(id);
    res.json(topics);
  }
}
