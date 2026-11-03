import { describe, expect, it, jest } from "@jest/globals";
import Product from "../../../domain/product/entity/product";
import UpdateProductUseCase from "./update.product.usecase";

const product = new Product("123", "Product 1", 100);

const createMockRepository = () => ({
  create: jest.fn<Promise<void>, [Product]>(),
  update: jest.fn<Promise<void>, [Product]>().mockResolvedValue(undefined),
  find: jest.fn<Promise<Product>, [string]>().mockResolvedValue(product),
  findAll: jest.fn<Promise<Product[]>, []>(),
});

describe("Unit test update product use case", () => {
  it("updates a product", async () => {
    const repository = createMockRepository();
    const useCase = new UpdateProductUseCase(repository);
    const input = { id: "123", name: "Product Updated", price: 200 };

    const result = await useCase.execute(input);

    expect(result).toEqual(input);
    expect(repository.find).toHaveBeenCalledWith("123");
    expect(repository.update).toHaveBeenCalledWith(product);
  });

  it("propagates errors when the product cannot be found", async () => {
    const repository = createMockRepository();
    repository.find.mockRejectedValue(new Error("Product not found"));
    const useCase = new UpdateProductUseCase(repository);

    await expect(
      useCase.execute({ id: "missing", name: "Product Updated", price: 200 })
    ).rejects.toThrow("Product not found");
  });
});
