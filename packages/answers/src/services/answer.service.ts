import { IAnswer } from '@answers/database/@types/answer.type';
import { AnswerRepository } from '@answers/database/repositories/answer.repo';
import { logger } from '@answers/utils/logger';

export class AnswerService {
  answerRepo: AnswerRepository;
  constructor() {
    this.answerRepo = new AnswerRepository();
  }

  async createAnswer(answer: IAnswer) {
    try {
      const newAnswer = await this.answerRepo.create(answer);
      return newAnswer;
    } catch (error) {
      logger.error(`Create() method error: ${error}`);
      throw error;
    }
  }

  async findById(id: string) {
    try {
      return await this.answerRepo.findById(id);
    } catch (error) {
      logger.error(`FindById() method error: ${error}`);
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.answerRepo.findAll();
    } catch (error) {
      logger.error(`FindAll() method error: ${error}`);
      throw error;
    }
  }

  async updateAnswer(id: string, answer: IAnswer) {
    try {
      return await this.answerRepo.update(id, answer);
    } catch (error) {
      logger.error(`UpdateAnswer() method error: ${error}`);
      throw error;
    }
  }

  async deleteAnswer(id: string) {
    try {
      return await this.answerRepo.delete(id);
    } catch (error) {
      logger.error(`DeleteAnswer() method error: ${error}`);
      throw error;
    }
  }

  async findByIdWithUser(id: string) {
    try {
      return await this.answerRepo.findByIdWithUser(id);
    } catch (error) {
      logger.error(`FindByIdWithUser() method error: ${error}`);
      throw error;
    }
  }
}
