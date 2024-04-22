export class ErrorExpired extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'expired';
  }
}

export class ErrorAlreadyDone extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'already done';
  }
}