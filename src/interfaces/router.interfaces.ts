import { Elysia } from "elysia";

export interface Route {
  path: string;
  router: Elysia;
}
