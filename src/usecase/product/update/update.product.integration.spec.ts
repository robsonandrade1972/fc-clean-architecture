import { describe, expect, it, beforeEach, afterEach } from "@jest/globals";
import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import UpdateProductUseCase from "./update.product.usecase";

describe("Integration test update product use case", () => {
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

  it("updates a persisted product", async () => {
    const repository = new ProductRepository();
    await repository.create(new Product("123", "Product 1", 100));
    const useCase = new UpdateProductUseCase(repository);

    const result = await useCase.execute({
      id: "123",
      name: "Product Updated",
      price: 200,
    });
    const persistedProduct = await ProductModel.findOne({
      where: { id: "123" },
    });

    expect(result).toEqual({
      id: "123",
      name: "Product Updated",
      price: 200,
    });
    expect(persistedProduct.toJSON()).toEqual(result);
  });
});
