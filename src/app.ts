import { Elysia } from "elysia";
import { Route } from "./interfaces/router.interfaces";
import { PORT } from "@config";
import { jwt } from "@elysiajs/jwt";
import { cookie } from "@elysiajs/cookie";
import { swagger } from "@elysiajs/swagger";
export class App {
  public app = new Elysia();
  public port = PORT || 3000;
  constructor(routes: Route[]) {
    this.initializeRoutes(routes);
    this.initializeSwagger();
  }
  private initializeRoutes(routes: Route[]) {
    routes.forEach((route) => {
      this.app.decorate("sayHello", (name:string) => `Hello, ${name}!`);
      this.app.use(
        jwt({
          name: "jwt",
          secret: process.env.JWT_SECRET,
        })
      );
      this.app.use(cookie());

      this.app.use(route.router);
    });
  }
  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
  private initializeSwagger() {
    console.log("seager");
    this.app.use(swagger());
  }
}
