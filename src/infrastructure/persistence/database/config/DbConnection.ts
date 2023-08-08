import mongoose from 'mongoose';

export class DbConnection {
  public readonly connectionUrl: string;

  constructor(connectionUrl: string) {
    this.connectionUrl = connectionUrl;
  }

  public async connect(): Promise<void> {
    try {
      mongoose.connect(this.connectionUrl);
      console.log('[db] Connected to mongoose database');
    } catch (error: any) {
      console.error(`[db] Could not connect to mongoose. ${error}`);
    }
  }
}
