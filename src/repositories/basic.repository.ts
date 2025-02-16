import { BaseEntity } from "../entities/base.entity";

export class BasicRepository<T extends BaseEntity> {
  private entities: T[] = [];

  find(): T[] {
    return this.entities;
  }

  getById(id: string): T | undefined {
    return this.entities.find((entity) => entity.id === id);
  }

  insert(entity: T): T {
    this.entities.push(entity);
    return entity;
  }

  update(entity: T, id: string): T {
    const index = this.entities.findIndex((e) => e.id === id);
    if (index !== -1) {
      this.entities[index] = entity;
    }
    return entity;
  }

  remove(id: string): void {
    this.entities = this.entities.filter((entity) => entity.id !== id);
  }
}
