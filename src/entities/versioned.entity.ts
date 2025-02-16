import { BaseEntity } from "./base.entity";

export abstract class VersionedEntity extends BaseEntity {
  version!: number;
  parentTopicId?: string;
}
