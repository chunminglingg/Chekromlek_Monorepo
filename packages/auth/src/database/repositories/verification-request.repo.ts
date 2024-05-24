import VerificationModel from "../models/verification-request.model";

export class VerificationRepository {
  async createVerification({
    userId,
    token,
  }: {
    userId: string;
    token: string;
  }) {
    try {
      const accountVerification = new VerificationModel({ userId, token });
      return await accountVerification.save();
    } catch (error) {
      throw error;
    }
  }
  async FindAccountVerificationToken({ token }: { token: string }) {
    try {
      const existedToken = await VerificationModel.findOne({
        token: token,
      });
      return existedToken;
    } catch (error) {
      throw error;
    }
  }
  async FindVerificationTokenById({ id }: { id: string }) {
    try {
      const existedToken = await VerificationModel.findOne({
        userId: id,
      });

      return existedToken;
    } catch (error) {
      throw error;
    }
  }

  async deleteAccountVerificationToken({ token }: { token: string }) {
    try {
      await VerificationModel.deleteOne({
        token: token,
      });
    } catch (error) {
      throw error;
    }
  }
}
