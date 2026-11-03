import { describe, expect, it, beforeEach, afterEach } from "@jest/globals";
import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import FindProductUseCase from "./find.product.usecase";

describe("Integration test find product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
    });
    sequelize.addModels([ProductModel]);
    await sequelize.sync({ force: true });
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("finds a persisted product by id", async () => {
    const repository = new ProductRepository();
    const product = new Product("123", "Product 1", 100);
    await repository.create(product);
    const useCase = new FindProductUseCase(repository);

    const result = await useCase.execute({ id: "123" });

    expect(result).toEqual({ id: "123", name: "Product 1", price: 100 });
  });
});
