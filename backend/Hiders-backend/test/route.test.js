const request = require("supertest");
const app = require("../routes/users");

describe("Backend Paths Test", () => {
  it("should return status 400 for GET /testRoute", async () => {
    request(app)
      .get("/testRoute")
      .expect(400)
      .end(function (err, res) {
        if (err) throw err;
      });
  });
});
