import { Elysia, t } from "elysia";
import { Route } from "../interfaces/router.interfaces";
import * as resControl from "../controllers/index";
interface RequestWithSayHello {
  sayHello: (name: string) => string;
}
class IndexRoute implements Route {
  public path = "/";
  public router = new Elysia();
  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
this.router.get("/decorate", (req: RequestWithSayHello) => {
  return req.sayHello("tummmm");
});

    this.router.get(`${this.path}JsonPlacHolder`, () =>
      resControl.JsonPlacHolder()
    );
    this.router.post(
      `${this.path}posttestschema`,
      ({ body }) => {
        console.log(body);
        const response = resControl.PostTitle({
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
    this.router.post(
      `${this.path}register`,
      async ({ body, set }) => {
        try {
          let userData = body;
          userData.password = await Bun.password.hash(userData.password, {
            algorithm: "argon2id", // "argon2id" | "argon2i" | "argon2d"
            memoryCost: 4, // memory usage in kibibytes
            timeCost: 3, // the number of iterations
          });
          const response = await resControl.createUser(body);
          return response;
        } catch (error) {
          set.status = 500;
          return { message: error };
        }
      },
      {
        body: t.Object({
          email: t.String(),
          password: t.String(),
        }),
      }
    );
    this.router.post(
      `${this.path}login`,
      async ({ body, set, jwt, cookie: { token } }) => {
        try {
          // ตรวจสอบและรับข้อมูลผู้ใช้
          const response = await resControl.checkLogin(body);
          if (response.length === 0) {
            set.status = 401; // Unauthorized
            return { message: "Invalid email or password" };
          }
          const jwtToken = await jwt.sign(
            { email: body.email },
            { expiresIn: "36000" }
          );
          token.value = {
            beare: jwtToken,
          };

          return { message: "Login successful", auth: token.value.beare };
        } catch (error) {
          set.status = 500;
          return { message: "Internal server error" };
        }
      },
      {
        body: t.Object({
          email: t.String(),
          password: t.String(),
        }),
      }
    );
    //!** เปิด route เพื่อทด สอบ derive
    this.router
      .derive(async ({ cookie = { token }, jwt }) => {
        if (cookie.token && cookie.token.value) {
          try {
            const responseProfile = await jwt.verify(
              cookie.token.initial.value.beare
            );
            return { resProfile: responseProfile };
          } catch (error) {
            throw new Error("Invalid token");
          }
        }
        return { resProfile: null };
      })
      .get("/test", ({ resProfile }) => resProfile.email);

    this.router.get(
      "/lifecycle",
      ({ resProfile }) => {
        return "gg";
      },
      {
        beforeHandle({ set, resProfile }) {
          if (!resProfile) {
            set.status = 401;
            return "Uuauthorized";
          }
          // ต้อง return ค่าเพื่อให้การทำงานไปต่อ
          return resProfile;
        },
      }
    );
    //** lession ต่อ คือ gard ที่ เราไม่ต้องทำ beforehandle ทุกตัว */
    this.router.onRequest(() => {
      console.log("global hook");
    });
    this.router.guard(
      {
        beforeHandle({ set, resProfile }) {
          if (!resProfile) {
            set.status = 401;
            return "Unauthorized";
          }
        },
      },
      (router) => {
        router.get(`${this.path}gg`, () => resControl.queryTitiel());
        router.get("/testguard", () => "gg");
        return router;
      }
    );

    this.router.guard(
      {
        headers: t.Object({
          authorization: t.TemplateLiteral("Bearer ${string}"),
        }),
      },
      (app) => {
        app
          .resolve(({ headers: { authorization } }) => {
            return {
              bearer: authorization.split(" ")[1],
            };
          })
          .get("/bearer", ({ bearer }) => bearer);
        return app;
      }
    );
    this.router.guard(
      {
        headers: t.Object({
          authorization: t.TemplateLiteral("Bearer ${string}"),
        }),
        beforeHandle({ set, resProfile }) {
          if (!resProfile) {
            set.status = 401;
            return "Unauthorized";
          }
          return;
        },
      },
      (app) => {
        app
          .resolve(({ headers: { authorization }, resProfile }) => {
            return {
              bearer: authorization.split(" ")[1],
              profile: resProfile,
            };
          })
          .get("/riphandle", ({ bearer, profile }) => {
            // ใช้ bearer และ profile ที่ได้รับจาก resolve
            return { bearer, profile };
          });
        return app;
      }
    );

    this.router.group('/v1',app=>app.get("/test",()=>"dddd"))



  }

  
}

export default IndexRoute;
