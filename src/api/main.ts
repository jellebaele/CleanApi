import { DbConnection } from '../infrastructure/persistence/database/config/DbConnection';
import { setupServer } from './config/server';

const startServer = async () => {
  try {
    const app = setupServer();
    await new DbConnection('mongodb://localhost:27017/hobbyshopV2').connect();

    const port = 3001;
    app.listen(port, () => {
      console.log(`[api] Server listening on http://localhost:${port}`);
    });
  } catch (error) {
    console.error(`[api] Could not start the server: ${error}`);
  }
};

startServer();
