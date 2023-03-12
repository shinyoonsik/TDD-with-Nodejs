const request = require("supertest");
const should = require("should");
const app = require("./index"); // custome모듈은 아래. 외부 모듈은 위에

describe("GET /users는", () => {
  describe("성공시", () => {
    it("user객체를 담은 배열로 응답한다", (done) => {
      request(app)
        .get("/users?limit=1")
        .end((err, res) => {
          res.body.should.be.instanceOf(Array);
          done();
        });
    });

    it("최대 limit개수 만큼 응답한다", (done) => {
      request(app)
        .get("/users?limit=2")
        .end((err, res) => {
          res.body.should.have.lengthOf(2);
          done();
        });
    });
  });

  describe("실패시", () => {
    it("limit이 숫자형이 아니면 400을 응답한다", (done) => {
      request(app).get("/users?limit=two").expect(400).end(done);
    });
  });
});

describe("GET /user/:id", () => {
  describe("성공시", () => {
    it("id가 1인 유저 객체를 반환한다", (done) => {
      request(app)
        .get("/user/1")
        .end((err, res) => {
          res.body.should.have.property("id", 1);
          done();
        });
    });
  });

  describe("실패시", () => {
    it("id가 숫자가 아닐경우 400으로 응답한다", (done) => {
      request(app).get("/user/one").expect(400).end(done);
    });

    it("id로 유저를 찾을 수 없을 경우 404로 응답한다", (done) => {
      request(app).get("/user/10").expect(404).end(done);
    });
  });
});

describe("DELETE /user/:id", () => {
  describe("성공시", () => {
    it("삭제 성공했다면 204를 응답한다", (done) => {
      request(app).delete("/user/1").expect(204).end(done);
    });
  });

  describe("실패시", () => {
    it("id가 숫자가 아닐경우 400으로 응답한다", (done) => {
      request(app).delete("/user/one").expect(400).end(done);
    });
  });
  // describe('실패시', () => {
  //   it('id가 숫자가 아닐경우 400으로 응답한다', (done) => {
  //       request(app).delete('/user/1').expect(400).end(done)
  //   })
  // })
});

describe("POST /user", () => {
  describe("성공시", () => {
    it("201 상태코드를 반환한다", (done) => {
      request(app)
        .post("/user") // 요청 정보
        .send({ name: "레반" }) // 요청 정보
        .expect(201) // 응답 정보, 상태코드 201반환을 얘상한다
        .end(done); // 응답 정보
    });

    it("생성된 유저 객체를 반환한다", (done) => {
      request(app)
        .post("/user")
        .send({ name: "레반" })
        .expect(201)
        .end((req, res) => {
          res.body.should.have.property("id");
          done();
        });
    });

    it("입력한 name을 반환한다", (done) => {
      request(app)
        .post("/user")
        .send({ name: "레반" })
        .expect(201)
        .end((req, res) => {
          res.body.should.have.property("name", "레반");
          done();
        });
    });
  });
});

// descibe("POST /user") 테스트 코드 리팩토링
describe("Refactoring: POST /user", () => {
  describe("성공시", () => {
    let givenName = "레반",
      body = "",
      statusCode = "";

    before((done) => {
      request(app)
        .post("/user")
        .send({ name: givenName })
        .expect(201)
        .end((req, res) => {
          body = res.body;
          statusCode = res.statusCode;
          done();
        });
    });

    it("201 상태 코드를 반환하다", () => { // 비동기 테스트인 경우에만 done을 넣어준다? 즉, 비동기 테스티인 경우 인수에 콜백함수를 넣어주어야 한다! why?
      statusCode.should.have.equal(201)
    });

    it("생성된 유저 객체를 반환한다", () => {
      body.should.have.property("id");
    });

    it("입력한 name을 반환한다", () => {
      body.should.have.property("name", givenName);
    });
  });
});
