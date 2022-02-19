let server = require("../index");
const supertest = require("supertest");
const request = supertest(server);
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
var mongoose = require("mongoose");

const { User } = require("../models/user");
let token;
let user;
let userSaved;

describe("/api/user", () => {
  beforeEach(async () => {
    server = require("../index");
    token = jwt.sign({ _id: "01", name: "Pamu" }, process.env.JWT);

    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash("12345", salt);

    user = new User({
      fullName: "Pamuditha Raja",
      email: "pamuditha@gmail.com",
      username: "pamuditha",
      password: password,
    });
    userSaved = await user.save();
  });

  afterEach(async () => {
    await User.deleteMany();
    server.close();
  });

  describe("GET /:id", () => {
    it("should return 400 if invalid id", async () => {
      const res = await request.get("/api/user/123");

      expect(res.status).toBe(400);
    });

    it("should return 404 if user not available", async () => {
      const id = mongoose.Types.ObjectId();

      const res = await request.get("/api/user" + id);

      expect(res.status).toBe(404);
    });

    it("should return the user", async () => {
      const res = await request.get("/api/user" + userSaved._id);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("fullName", "Pamuditha"),
        expect(res.body).toHaveProperty("email", "pamuditha@gmail.com");
    });
  });
});
