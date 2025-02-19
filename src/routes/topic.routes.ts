import { Router } from "express";
import { TopicController } from "../controllers/topic.controller";
import { TopicService } from "../services/topic.service";
import { InMemoryRepository } from "../repositories/in-memory-repository";
import { Topic } from "../entities/topic.entity";

const repository = new InMemoryRepository<Topic>();
const topicService = new TopicService(repository);
const topicController = new TopicController(topicService);

const router = Router();

router.post("/", topicController.create.bind(topicController) as () => void);
router.patch(
  "/:id",
  topicController.update.bind(topicController) as () => void
);
router.get("/", topicController.getAll.bind(topicController) as () => void);
router.get("/:id", topicController.getById.bind(topicController) as () => void);
router.get(
  "/:id/subtopics",
  topicController.getSubtopics.bind(topicController) as () => void
);
router.get(
  "/:startId/shortest-path/:endId",
  topicController.findShortestPath.bind(topicController) as () => void
);

export default router;
