import { describe, expect, it, jest } from "@jest/globals";
import Product from "../../../domain/product/entity/product";
import FindProductUseCase from "./find.product.usecase";

const product = new Product("123", "Product 1", 100);

const createMockRepository = () => ({
  create: jest.fn<Promise<void>, [Product]>(),
  update: jest.fn<Promise<void>, [Product]>(),
  find: jest.fn<Promise<Product>, [string]>().mockResolvedValue(product),
  findAll: jest.fn<Promise<Product[]>, []>(),
});

describe("Unit test find product use case", () => {
  it("finds a product by id", async () => {
    const repository = createMockRepository();
    const useCase = new FindProductUseCase(repository);

    const result = await useCase.execute({ id: "123" });

    expect(result).toEqual({ id: "123", name: "Product 1", price: 100 });
    expect(repository.find).toHaveBeenCalledWith("123");
  });

  it("propagates errors when the product cannot be found", async () => {
    const repository = createMockRepository();
    repository.find.mockRejectedValue(new Error("Product not found"));
    const useCase = new FindProductUseCase(repository);

    await expect(useCase.execute({ id: "123" })).rejects.toThrow(
      "Product not found"
    );
  });
});
