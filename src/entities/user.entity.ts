import { BaseEntity } from "./base.entity";

export enum Role {
  ADMIN = "ADMIN",
  EDITOR = "EDITOR",
  VIEWER = "VIEWER",
}

export class User extends BaseEntity {
  name: string;
  email: string;
  role: string;

  constructor(obj: { name: string; email: string; role: Role }) {
    super();
    this.name = obj.name;
    this.email = obj.email;
    this.role = obj.role;
  }
}
