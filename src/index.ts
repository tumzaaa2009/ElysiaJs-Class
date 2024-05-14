import { Elysia, t } from "elysia";
import { queryTitiel, PostTitle } from "@controllers";
const app = new Elysia();
app.get("/", () => "Hello Elysia");
app.get("/gettest", () => queryTitiel());

//** local schema */
app.post(
  "/posttest",
  ({ body }) => {
    const response = PostTitle({
      title: body.title,
    });

    return response;
  },
  {}
);

app.post(
  "/posttestschema",
  ({ body }) => {
    const response = PostTitle({
      title: body.title,
    });
    return response;
  },
  {
    headers: t.Object({
      authorization: t.String(),
    }),
    body: t.Object({
      title: t.String(),
      price: t.String(),
    }),
  }
);
app.route("M-SEARCH", "/m-search", ({}) => "connect");

app.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
