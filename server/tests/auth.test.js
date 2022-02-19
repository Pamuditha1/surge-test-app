let server = require("../index");
const supertest = require("supertest");
const request = supertest(server);

const jwt = require("jsonwebtoken");

describe("auth middleware", () => {
  let token;

  beforeEach(() => {
    server = require("../index");
    token = jwt.sign({ _id: "01", username: "Pamu" }, process.env.JWT);
  });
  afterEach(async () => {
    server.close();
  });

  const exec = () => {
    return request.put("/api/user").set("auth-token", token);
  };

  it("should return 401 if no token is provided", async () => {
    token = "";
    const res = await exec();
    expect(res.status).toBe(401);
  });

  it("should return 400 if invalid token is provided", async () => {
    token = "3";
    const res = await exec();
    expect(res.status).toBe(400);
  });

  //   it("should return 200 if token is valid", async () => {
  //     const res = await exec();
  //     expect(res.status).toBe(200);
  //   });
});
