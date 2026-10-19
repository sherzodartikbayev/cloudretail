export class NoRecordsFound extends Error {
  constructor() {
    super('No records found');
  }
}
