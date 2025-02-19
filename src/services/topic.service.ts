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
    const buildTree = (id: string): any => {
      const hierarchy = this.repository.getHierarch(id);
      const subtopicIds = hierarchy || new Set();
      const subtopics = Array.from(subtopicIds).map((subId) =>
        this.getById(subId)
      ) as Topic[];

      return {
        ...this.getById(id),
        children: subtopics.map((sub) => buildTree(sub.id)),
      };
    };

    return buildTree(id);
  }

  findShortestPath(startId: string, endId: string): string[] | null {
    console.log(startId, endId);

    if (!this.repository.getById(startId) || !this.repository.getById(endId)) {
      return null;
    }

    const queue: { topicId: string; path: string[] }[] = [
      { topicId: startId, path: [startId] },
    ];
    const visited = new Set<string>();

    while (queue.length > 0) {
      const { topicId, path } = queue.shift()!;

      if (topicId === endId) {
        return path;
      }

      visited.add(topicId);

      const hierarchy = this.repository.getHierarch(topicId);
      const children = hierarchy || new Set();

      const parent = [...this.getAll()]
        .flat()
        .find((topic) => topic.id === topicId)?.parentTopicId;

      const neighbors = [...children];
      if (parent) neighbors.push(parent);

      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          queue.push({ topicId: neighbor, path: [...path, neighbor] });
        }
      }
    }

    return null;
  }
}
