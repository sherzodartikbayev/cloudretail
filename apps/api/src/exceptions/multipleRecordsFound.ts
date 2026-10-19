export class MultipleRecordsFound extends Error {
  constructor() {
    super('Multiple records found');
  }
}
