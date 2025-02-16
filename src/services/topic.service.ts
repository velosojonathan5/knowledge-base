import { Topic } from "../entities/topic.entity";
import { NotFoundException } from "../exceptions/NotFoundException";
import { InMemoryRepository } from "../repositories/in-memory-repository";

export class TopicService {
  constructor(private readonly repository: InMemoryRepository<Topic>) {}

  create(name: string, content: string, parentTopicId?: string): Topic {
    if (parentTopicId && !this.repository.getById(parentTopicId)) {
      throw new NotFoundException(`Parent topi ID ${parentTopicId} not found.`);
    }

    const topic = new Topic({
      name,
      content,
      parentTopicId,
    });
    this.repository.insert(topic);
    return topic;
  }

  update(id: string, content: string): Topic {
    const { name, parentTopicId } = this.getById(id);
    const newTopic = new Topic({
      id,
      name,
      content,
      parentTopicId,
    });
    return this.repository.update(newTopic, id);
  }

  getAll(): Topic[] {
    return this.repository.find();
  }

  getById(id: string, version?: number): Topic {
    const topic = this.repository.getById(id, version);

    if (!topic) {
      throw new NotFoundException("topic not found");
    }

    return topic;
  }

  getSubtopics(id: string): Topic[] {
    return this.repository.getSubItemsRecursive(id);
  }
}
