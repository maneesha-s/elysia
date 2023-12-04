import { Elysia } from "elysia";

const app = new Elysia()
  .decorate("getDate", () => Date.now())
  .state({
    id: 1,
    Title: "Introduction to Bun",
  })
  .get("/", () => "Hello Elysia!")
  .get("/post/:id", ({ params: { id } }) => {
    return { id };
  })
  .post("/post", ({ body, set, store, getDate }) => {
    console.log(body);
    console.log(store);
    console.log("Created at..", getDate());
    set.status = 201;
    return { body };
  })
  .post("/context", (context) => {
    return { context };
  })
  .get("/track/*", () => {
    return "Tracking Route!";
  })
  .get("/tracks", () => {
    return new Response(
      JSON.stringify({
        tracks: ["Dancing Feat", "Giggles"],
      }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
