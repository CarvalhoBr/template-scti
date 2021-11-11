import BaseClientQueue from "./BaseClientQueue";

export default class VerificationEmailQueue extends BaseClientQueue{
  public queueUrl() {
    return process.env.VERIFICATION_EMAIL_QUEUE;
  }
}