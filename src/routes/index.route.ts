import { Elysia } from "elysia";
import { Route } from "../interfaces/router.interfaces";
class IndexRoute implements Route {
  public path = "/";
  public router = new Elysia();
  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.get(`${this.path}`, () => "Hello World!");
    this.router.get(`${this.path}gg`, () => "gg");
  }
}
export default IndexRoute;
