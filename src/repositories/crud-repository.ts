import { BaseEntity } from "../entities/base.entity";

export interface CRUDRepository<T extends BaseEntity> {
  find(condition?: unknown): T[];
  getById(id: string, version?: number): T | undefined;
  insert(entity: T): T;
  update(entity: T, id: string): T;
  remove(condition: Record<string, unknown>): void;
  getHierarch(id: string): Set<string> | undefined;
}
