const request = require("supertest");
const app = require("../app");
const User = require("../models/User");

describe("Authentication API", () => {
  let token;

  beforeAll(async () => {
    await User.deleteMany({});

    // ✅ Register user
    await request(app).post("/api/v1/register").send({
      name: "ntm",
      email: "ntm@gmail.com",
      password: "ntm@gmail.com",
    });
    
    //✅ Log in to get the token
    const loginRes = await request(app).post("/api/v1/login").send({
      email: "ntm@gmail.com",
      password: "ntm@gmail.com",
    });

    console.log("Login Response:", loginRes.body); // Debugging step

    token = loginRes.body.token; // ✅ Store token
  });

  test("User should register and return token", async () => {
    expect(token).toBeDefined(); // ✅ Ensure token is received
  });
});