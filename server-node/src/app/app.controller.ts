import * as express from 'express';
import { BaseAPI } from './api/api.service';

export class Server {
  public app: express.Application;
  private api: BaseAPI;

  public static boostrap() {
    return new Server();
  }

  constructor() {
    this.app = express();
    this.api = new BaseAPI();
    this.config();

    this.api.getRoutes().forEach((route) => {
      this.app.use(route);
    })
  }


  config() {
    this.app.listen(3000, function() {
      console.log('Example app listening on port 3000!');
    });
  }
}
