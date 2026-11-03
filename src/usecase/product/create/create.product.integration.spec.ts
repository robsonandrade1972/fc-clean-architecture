import { describe, expect, it, beforeEach, afterEach } from "@jest/globals";
import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "./create.product.usecase";

describe("Integration test create product use case", () => {
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

  it("creates and persists a product", async () => {
    const useCase = new CreateProductUseCase(new ProductRepository());

    const result = await useCase.execute({ name: "Product 1", price: 100 });
    const persistedProduct = await ProductModel.findOne({
      where: { id: result.id },
    });

    expect(result).toEqual({
      id: expect.any(String),
      name: "Product 1",
      price: 100,
    });
    expect(persistedProduct.toJSON()).toEqual(result);
  });
});
