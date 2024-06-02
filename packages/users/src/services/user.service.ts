import { IUser } from '@users/database/models/user.model';
import { UserRepository } from '@users/database/repositories/user.repo';
import { logger } from '@users/utils/logger';

export class UserService {
  private userRepo: UserRepository;
  constructor() {
    this.userRepo = new UserRepository();
  }
  async CreateUser(user: IUser & { authId: string }) {
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
      return await this.userRepo.UpdateUserById({ id, update: update });
    } catch (error) {
      logger.error('Update error: ', error);
      throw error;
    }
  }
  async getAuthById(authId: string) {
    try {
      return await this.userRepo.FindAuthById(authId);
    } catch (error) {
      logger.error('Get Auth Error:', error);
      throw error;
    }
  }
  async showAllUser() {
    try {
      return await this.userRepo.showAllUser();
    } catch (error: unknown) {
      throw error;
    }
  }
  async getUserById({ id }: { id: string }) {
    try {
      return await this.userRepo.FindUserById({ id });
    } catch (error) {
      logger.error('Get user error:', error);
      throw error;
    }
  }
}
