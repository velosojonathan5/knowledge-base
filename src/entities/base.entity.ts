interface IEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export abstract class BaseEntity implements IEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(id?: string) {
    this.id = id || crypto.randomUUID();
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  updateTimestamp() {
    this.updatedAt = new Date();
  }
}
