import { IAnswer } from '../@types/answer.type';
import { AnswerModel } from '../models/answer.model';

export class AnswerRepository {
  async create(answer: IAnswer) {
    return await AnswerModel.create(answer);
  }

  async findById(id: string) {
    return await AnswerModel.findById(id);
  }

  async findAll() {
    return await AnswerModel.find();
  }

  async update(id: string, answer: IAnswer) {
    return await AnswerModel.findByIdAndUpdate(id, answer, {
      new: true,
    });
  }

  async delete(id: string) {
    return await AnswerModel.findByIdAndDelete(id);
  }

  async findByIdWithUser(id: string) {
    return await AnswerModel.findById(id).populate('userId', 'username');
  }
}
