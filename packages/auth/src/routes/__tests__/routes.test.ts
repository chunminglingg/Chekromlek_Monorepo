// monolith.routes.test.js
import request from "supertest";
import { app } from "../../app";

describe("Monolith Routes", () => {
  test("GET /monolith responds with 200 status code", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
  });
});
