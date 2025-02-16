import { Resource } from "../entities/resource.entity";
import { NotFoundException } from "../exceptions/NotFoundException";
import { BasicRepository } from "../repositories/basic.repository";

export class ResourceService {
  constructor(private readonly repository: BasicRepository<Resource>) {}

  create(obj: {
    topicId: string;
    url: string;
    description: string;
    type: string;
  }): Resource {
    const resource = new Resource(obj);
    this.repository.insert(resource);
    return resource;
  }

  update(
    id: string,
    obj: {
      url: string;
      description: string;
      type: string;
    }
  ): Resource {
    const resource = this.getById(id);
    resource.url = obj.url;
    resource.description = obj.description;
    resource.type = obj.type;
    return this.repository.update(resource, id);
  }

  getAll(): Resource[] {
    return this.repository.find();
  }

  getById(id: string): Resource {
    const resource = this.repository.getById(id);

    if (!resource) {
      throw new NotFoundException("resource not found");
    }

    return resource;
  }
}
