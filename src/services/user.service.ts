import { Role, User } from "../entities/user.entity";
import { NotFoundException } from "../exceptions/NotFoundException";
import { BasicRepository } from "../repositories/basic.repository";

export class UserService {
  constructor(private readonly repository: BasicRepository<User>) {}

  create(name: string, email: string, role: Role): User {
    const user = new User({
      name,
      email,
      role,
    });
    this.repository.insert(user);
    return user;
  }

  getAll(): User[] {
    return this.repository.find();
  }

  getById(id: string): User {
    const user = this.repository.getById(id);

    if (!user) {
      throw new NotFoundException("topic not found");
    }

    return user;
  }
}
