export class ErrorToken extends Error {
  errorCode: string
  errorMessage: string

  constructor(code: string, message: string) {
    super(message);
    this.name = 'error token';
    this.errorCode = code
    this.errorMessage = message
  }
}

export class ErrorAlreadyDone extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'already done';
  }
}