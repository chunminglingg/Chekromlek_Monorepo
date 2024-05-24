import { IUser } from '@users/database/models/user.model';
import { UserRepository } from '@users/database/repositories/user.repo';
import { logger } from '@users/utils/logger';

export class UserService {
  private userRepo: UserRepository;
  constructor() {
    this.userRepo = new UserRepository();
  }
  async CreateUser(user: IUser & { userId: string }) {
    try {
      const newUser = await this.userRepo.createUser(user);
      return newUser;
    } catch (error) {
      logger.error(`Create() method error: ${error}`);
      throw error;
    }
  }
  async UpdateById(id: string, update: IUser) {
    try {
      return await this.userRepo.UpdateUserbyId({ id, update: update });
    } catch (error) {
      logger.error('Update error: ', error);
      throw error;
    }
  }
}
