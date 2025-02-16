import { BaseEntity } from "./base.entity";

export class Resource extends BaseEntity {
  topicId: string;
  url: string;
  description: string;
  type: string;

  constructor(obj: {
    topicId: string;
    url: string;
    description: string;
    type: string;
  }) {
    super();
    this.topicId = obj.topicId;
    this.url = obj.url;
    this.description = obj.description;
    this.type = obj.type;
  }
}
