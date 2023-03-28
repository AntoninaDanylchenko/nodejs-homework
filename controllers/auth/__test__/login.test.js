const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../../../app");

const { DB_HOST } = process.env;

describe("test loginController", () => {
  beforeAll(async () => {
    await mongoose.connect(DB_HOST, { useNewUrlParser: true });
  });
  afterAll(async () => {
    await mongoose.connection.close();
  });

  test("loginController returns status 200, token and users data", async () => {
    const res = await request(app)
      .post("/api/users/login")
      .send({ email: "bo1@gmail.com", password: "123456789" });
    console.log(res.error.message);
    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeTruthy();
    expect(res.body.email).toBeTruthy();
    expect(res.body.subscription).toBeTruthy();
  });
});
