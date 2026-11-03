import { describe, expect, it, jest } from "@jest/globals";
import Product from "../../../domain/product/entity/product";
import CreateProductUseCase from "./create.product.usecase";

const createMockRepository = () => ({
  create: jest.fn<Promise<void>, [Product]>().mockResolvedValue(undefined),
  update: jest.fn<Promise<void>, [Product]>().mockResolvedValue(undefined),
  find: jest.fn<Promise<Product>, [string]>(),
  findAll: jest.fn<Promise<Product[]>, []>(),
});

describe("Unit test create product use case", () => {
  it("creates and persists a product", async () => {
    const repository = createMockRepository();
    const useCase = new CreateProductUseCase(repository);

    const result = await useCase.execute({ name: "Product 1", price: 100 });

    expect(result).toEqual({
      id: expect.any(String),
      name: "Product 1",
      price: 100,
    });
    expect(repository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        id: result.id,
        name: "Product 1",
        price: 100,
      })
    );
  });
});
