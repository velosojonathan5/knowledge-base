import { VersionedEntity } from "../entities/versioned.entity";
import { CRUDRepository } from "./crud-repository";

export class InMemoryRepository<T extends VersionedEntity>
  implements CRUDRepository<T>
{
  private storage: Map<string, T[]> = new Map();
  private hierarchy: Map<string, Set<string>> = new Map();

  find(condition?: Partial<T>): T[] {
    const results: T[] = [];
    for (const versions of this.storage.values()) {
      const latest = versions[versions.length - 1];
      if (
        !condition ||
        Object.entries(condition).every(
          ([key, value]) => latest[key as keyof T] === value
        )
      ) {
        results.push(latest);
      }
    }
    return results;
  }

  getById(id: string, version?: number): T | undefined {
    const versions = this.storage.get(id);
    if (!versions) return undefined;
    return version !== undefined
      ? versions.find((v) => v.version === version)
      : versions[versions.length - 1];
  }

  insert(entity: T): T {
    entity.version = 1;
    this.storage.set(entity.id, [entity]);

    if (entity.parentTopicId) {
      if (!this.hierarchy.has(entity.parentTopicId)) {
        this.hierarchy.set(entity.parentTopicId, new Set());
      }
      this.hierarchy.get(entity.parentTopicId)?.add(entity.id);
    }

    return entity;
  }

  update(entity: T, id: string): T {
    const versions = this.storage.get(id) as T[];
    const newVersion = {
      ...entity,
      version: versions[versions.length - 1].version + 1,
    };
    this.storage.set(id, [...versions, newVersion]);
    return newVersion;
  }

  remove(condition: Record<string, unknown>): void {
    for (const [id, versions] of this.storage.entries()) {
      if (
        Object.entries(condition).every(
          ([key, value]) =>
            versions[versions.length - 1][key as keyof T] === value
        )
      ) {
        this.storage.delete(id);
      }
    }
  }

  getHierarch(id: string): Set<string> | undefined {
    return this.hierarchy.get(id);
  }
}
