export class ValidationError extends Error {
  constructor(message = 'ValidationError') {
    super(message);
  }
}
