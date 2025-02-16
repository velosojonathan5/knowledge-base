import { VersionedEntity } from "./versioned.entity";

export class Topic extends VersionedEntity {
  name: string;
  content: string;

  constructor(obj: {
    id?: string;
    name: string;
    content: string;
    parentTopicId?: string;
  }) {
    super(obj.id);
    this.name = obj.name;
    this.content = obj.content;
    this.parentTopicId = obj.parentTopicId;
  }
}
