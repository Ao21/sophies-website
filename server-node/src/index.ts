import * as express from 'express';

class Server {
  public app: express.Application;

  public static boostrap() {
    return new Server();
  }

  constructor() {
    this.app = express();
    this.config();
  }
  config() {
    this.app.listen(3000, function() {
      console.log('Example app listening on port 3000!');
    });
  }
}



const server = Server.boostrap();
export default server.app;
