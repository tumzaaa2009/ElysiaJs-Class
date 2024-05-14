import { Elysia } from "elysia";
import { Route } from "./interfaces/router.interfaces";
import { PORT } from "@config";
export class App {
  public app = new Elysia();
  public port = PORT || 3000;
  constructor(routes: Route[]) {
    this.initializeRoutes(routes);
  }
  private initializeRoutes(routes: Route[]) {
    routes.forEach((route) => {
      this.app.use(route.router);
    });
  }
  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}
