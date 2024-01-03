import request from "supertest";
import { app } from "../app";
import { AppDataSource } from "../data-source";

describe("Teste de todas as rotas", () => {
  describe("Cars", () => {
    beforeAll(async () => {
      await AppDataSource.initialize();
    });

    afterAll(async () => {
      await AppDataSource.dropDatabase();
      await AppDataSource.destroy();
    });

    afterEach(async () => {
      await AppDataSource.dropDatabase();
      await AppDataSource.destroy();
      await AppDataSource.initialize();
    });

    it("Criar um novo carro", async () => {
      const response = await request(app).post("/cars").send({
        plate: "hjn5525",
        color: "vermelho",
        brand: "fiat",
      });
      expect(response.body).toHaveProperty("id");
    });

    it("Buscar carros existentes", async () => {
      const carTest = await request(app).post("/cars").send({
        plate: "jdi7723",
        color: "azul",
        brand: "ferrari",
      });
      const response = await request(app).get("/cars").send();
      expect(response.body[0]).toStrictEqual(carTest.body);
    });

    it("Buscar carros existentes por id", async () => {
      const carTest = await request(app).post("/cars").send({
        plate: "jdi7723",
        color: "azul",
        brand: "ferrari",
      });
      await request(app).post("/cars").send({
        plate: "srd2461",
        color: "roxo",
        brand: "ford",
      });

      const response = await request(app).get("/cars").send({
        id: carTest.body.id,
      });
      expect(response.body[0]).toStrictEqual(carTest.body);
    });

    it("Buscar carros existentes por cor e marca", async () => {
      const carTest = await request(app).post("/cars").send({
        plate: "jdi7723",
        color: "azul",
        brand: "ferrari",
      });
      await request(app).post("/cars").send({
        plate: "srd2461",
        color: "roxo",
        brand: "ford",
      });

      const response = await request(app).get("/cars").send({
        color: "azul",
        brand: "ferrari",
      });
      expect(response.body[0]).toStrictEqual(carTest.body);
    });

    it("Apagar carro existentes por id", async () => {
      const carTest = await request(app).post("/cars").send({
        plate: "jdi7723",
        color: "azul",
        brand: "ferrari",
      });

      const response = await request(app)
        .delete("/cars/" + carTest.body.id)
        .send();
      expect(response.status).toBe(204);
    });

    it("Alterar informações de um carro existente", async () => {
      const carTest = await request(app).post("/cars").send({
        plate: "jdi7723",
        color: "azul",
        brand: "ferrari",
      });

      const response = await request(app)
        .put("/cars/" + carTest.body.id)
        .send({
          color: "roxo",
          brand: "ford",
        });

      expect(response.body.color).toStrictEqual("roxo");
      expect(response.body.brand).toStrictEqual("ford");
    });
  });

  describe("Drivers", () => {
    beforeAll(async () => {
      await AppDataSource.initialize();
    });

    afterAll(async () => {
      await AppDataSource.dropDatabase();
      await AppDataSource.destroy();
    });

    afterEach(async () => {
      await AppDataSource.dropDatabase();
      await AppDataSource.destroy();
      await AppDataSource.initialize();
    });

    it("Criar um novo motorista", async () => {
      const response = await request(app).post("/drivers").send({
        name: "Cleber",
      });
      expect(response.body).toHaveProperty("id");
    });

    it("Buscar motorista existentes", async () => {
      const driverTest = await request(app).post("/drivers").send({
        name: "Cleber",
      });
      const response = await request(app).get("/drivers").send();
      expect(response.body[0]).toStrictEqual(driverTest.body);
    });

    it("Buscar motorista existentes por id", async () => {
      const driverTest = await request(app).post("/drivers").send({
        name: "Cleber",
      });
      await request(app).post("/drivers").send({
        name: "João",
      });

      const response = await request(app).get("/drivers").send({
        id: driverTest.body.id,
      });
      expect(response.body[0]).toStrictEqual(driverTest.body);
    });

    it("Buscar motorista existente por nome", async () => {
      const driverTest = await request(app).post("/drivers").send({
        name: "Cleber",
      });
      await request(app).post("/drivers").send({
        name: "João",
      });

      const response = await request(app).get("/drivers").send({
        name: "Cleber",
      });
      expect(response.body[0]).toStrictEqual(driverTest.body);
    });

    it("Apagar motorista existente por id", async () => {
      const driverTest = await request(app).post("/drivers").send({
        name: "João",
      });

      const response = await request(app)
        .delete("/drivers/" + driverTest.body.id)
        .send();
      expect(response.status).toBe(204);
    });

    it("Alterar informações de um motorista existente existente", async () => {
      const carTest = await request(app).post("/drivers").send({
        name: "Cleber",
      });

      const response = await request(app)
        .put("/drivers/" + carTest.body.id)
        .send({
          name: "João",
        });
      expect(response.body.name).toStrictEqual("João");
    });
  });

  describe("Car utilization", () => {
    beforeAll(async () => {
      await AppDataSource.initialize();
    });

    afterAll(async () => {
      await AppDataSource.dropDatabase();
      await AppDataSource.destroy();
    });

    afterEach(async () => {
      await AppDataSource.dropDatabase();
      await AppDataSource.destroy();
      await AppDataSource.initialize();
    });

    it("Criar uma nova utilizaçao do carro", async () => {
      const carTest = await request(app).post("/cars").send({
        plate: "gde8231",
        color: "pink",
        brand: "ford",
      });
      const driverTest = await request(app).post("/drivers").send({
        name: "Cleber",
      });
      const response = await request(app).post("/car-utilization").send({
        carID: carTest.body.id,
        driverID: driverTest.body.id,
        reasonForUse: "Comprar pão",
      });
      expect(response.body).toHaveProperty("id");
    });

    it("Buscar utilização de carro existente", async () => {
      const carTest = await request(app).post("/cars").send({
        plate: "gde8231",
        color: "pink",
        brand: "ford",
      });
      const driverTest = await request(app).post("/drivers").send({
        name: "Cleber",
      });
      const carUtilizationTest = await request(app)
        .post("/car-utilization")
        .send({
          carID: carTest.body.id,
          driverID: driverTest.body.id,
          reasonForUse: "Comprar pão",
        });
      const response = await request(app).get("/car-utilization").send();
      expect(response.body[0].id).toBe(carUtilizationTest.body.id);
    });

    it("Apagar utilização de carro existente por id", async () => {
      const carTest = await request(app).post("/cars").send({
        plate: "gde8231",
        color: "pink",
        brand: "ford",
      });
      const driverTest = await request(app).post("/drivers").send({
        name: "Cleber",
      });
      const carUtilizationTest = await request(app)
        .post("/car-utilization")
        .send({
          carID: carTest.body.id,
          driverID: driverTest.body.id,
          reasonForUse: "Comprar pão",
        });

      const response = await request(app)
        .delete("/car-utilization/" + carUtilizationTest.body.id)
        .send();
      expect(response.status).toBe(204);
    });

    it("Alterar informações de uma utilização de carro existente", async () => {
      const carTest = await request(app).post("/cars").send({
        plate: "gde8231",
        color: "pink",
        brand: "ford",
      });
      const driverTest = await request(app).post("/drivers").send({
        name: "Cleber",
      });
      const carUtilizationTest = await request(app)
        .post("/car-utilization")
        .send({
          carID: carTest.body.id,
          driverID: driverTest.body.id,
          reasonForUse: "Comprar pão",
        });

      const response = await request(app)
        .put("/car-utilization/" + carUtilizationTest.body.id)
        .send({
          reasonForUse: "Ir para o Rio de janeiro",
        });
      expect(response.body.reasonForUse).toStrictEqual(
        "Ir para o Rio de janeiro"
      );
    });

    it("finalizar informações de uma utilização de carro existente", async () => {
      const carTest = await request(app).post("/cars").send({
        plate: "gde8231",
        color: "pink",
        brand: "ford",
      });
      const driverTest = await request(app).post("/drivers").send({
        name: "Cleber",
      });
      const carUtilizationTest = await request(app)
        .post("/car-utilization")
        .send({
          carID: carTest.body.id,
          driverID: driverTest.body.id,
          reasonForUse: "Comprar pão",
        });

      const response = await request(app)
        .put("/car-utilization/finish/" + carUtilizationTest.body.id)
        .send();
      console.log(response.body, carUtilizationTest.body);
      expect(response.body.endDate).not.toBe(null);
    });
  });
});
