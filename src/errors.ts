export abstract class CustomError extends Error {
  abstract statusCode: number;

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

export class PropertyAccessError extends CustomError {
  statusCode = 403;

  constructor(property: string) {
    super(`Access to the property "${property}" is not allowed here.`);
    Object.setPrototypeOf(this, PropertyAccessError.prototype);
  }
}

export class UnexpectedError extends CustomError {
  statusCode = 500;

  constructor() {
    super('Unexpected error has occured.');
    Object.setPrototypeOf(this, UnexpectedError.prototype);
  }
}

export class UniqueConstraintError extends CustomError {
  statusCode = 409;

  constructor(constraint: string) {
    super(`Provided ${constraint} is already taken.`);
    Object.setPrototypeOf(this, UniqueConstraintError.prototype);
  }
}

export class InvalidCredentialsError extends CustomError {
  statusCode = 401;

  constructor() {
    super('Invalid username or password.');
    Object.setPrototypeOf(this, InvalidCredentialsError.prototype);
  }
}
