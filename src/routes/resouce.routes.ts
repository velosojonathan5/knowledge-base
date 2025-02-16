import { Router } from "express";
import { BasicRepository } from "../repositories/basic.repository";
import { Resource } from "../entities/resource.entity";
import { ResourceService } from "../services/resource.service";
import { ResourceController } from "../controllers/resource.controller";

const repository = new BasicRepository<Resource>();
const resourceService = new ResourceService(repository);
const resourceController = new ResourceController(resourceService);

const router = Router();

router.post(
  "/",
  resourceController.create.bind(resourceController) as () => void
);
router.patch(
  "/:id",
  resourceController.update.bind(resourceController) as () => void
);
router.get(
  "/",
  resourceController.getAll.bind(resourceController) as () => void
);
router.get(
  "/:id",
  resourceController.getById.bind(resourceController) as () => void
);

export default router;
