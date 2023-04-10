const request = require('supertest');
const app = require('../../index')
const jwt = require('jsonwebtoken');
let token = jwt.sign({ id: 1, username: "test" },
  "lakjlakjlakjalkjalkjalkjalkajlakjlakjlakjalksdiuasdknbasdiuahsdmansbdiausdaksdlakjsasdjanbsdlai",
  { expiresIn: '5s' });

describe("POST /login", () => {
  test("Ellenőrzöm hogy a megadott értékek mefgelelő-e", async () => {
    const response = await request(app).post("/login").send({
      nev: "asd",
      jelszo: "asda"
    })
    expect(response.statusCode).toBeTruthy()
  })

  test("Hibás adatok esetén 400 status kóddal tér vissza", async () => {
    const response = await request(app).post("/login").send({
      nev: '',
      jelszo: ''
    })
    expect(response.statusCode).toBe(400)
  })
})

describe("GET /verify", () => {
  test("Sikeres token ellenőrzés esetén a status kód 200", async () => {
    const response = await request(app).get("/verify").set('Authorization', token)
    expect(response.statusCode).toBe(200)
  })
})

describe("POST /register", () => {
  test("Minden adatok megadása esetén a status Kód 200", async () => {
    const response = await request(app).post("/register").send({
      felhasznalonev: "user",
      emailcim: "minta@gmail.com",
      jelszo: "pswrd",
    })
    expect(response.statusCode).toBe(200)
  })

  test("Hibás adatok megadása esetén a status Kód 400", async () => {
    const response = await request(app).post("/register").send({
      felhasznalonev: "user",
      emailcim: "minta@gmail.com",
      jelszo: "",
    })
    expect(response.statusCode).toBe(400)
  })
})

describe("POST /vasarlas", () => {
  test("A vásárlás végén az emailben kiküldjük a számlát, siker esetén a status kód 200 ",async () => {
    const response = await request(app).post("/vasarlas")
    const response2 = await request(app).post("/vasarlas",token)
      expect(response2.statusCode).toBe(200)
       expect(response.statusCode).toBe(200);
      expect(response.text).toContain('Email elküldve');
  })

  test("Termék lekérése id alapján, sikeres esetben a status kód 200", async () =>{
    const response = await request(app).get('/termekek/:termekek/:id')
    expect(response.statusCode).toBe(200)
  })
})


