import { describe, expect, it, beforeEach, afterEach } from "@jest/globals";
import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ListProductUseCase from "./list.product.usecase";

describe("Integration test list product use case", () => {
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

  it("lists persisted products", async () => {
    const repository = new ProductRepository();
    await repository.create(new Product("123", "Product 1", 100));
    await repository.create(new Product("456", "Product 2", 200));
    const useCase = new ListProductUseCase(repository);

    const result = await useCase.execute({});

    expect(result).toEqual({
      products: [
        { id: "123", name: "Product 1", price: 100 },
        { id: "456", name: "Product 2", price: 200 },
      ],
    });
  });
});
