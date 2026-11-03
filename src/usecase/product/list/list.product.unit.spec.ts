import { describe, expect, it, jest } from "@jest/globals";
import Product from "../../../domain/product/entity/product";
import ListProductUseCase from "./list.product.usecase";

const products = [
  new Product("123", "Product 1", 100),
  new Product("456", "Product 2", 200),
];

const createMockRepository = () => ({
  create: jest.fn<Promise<void>, [Product]>(),
  update: jest.fn<Promise<void>, [Product]>(),
  find: jest.fn<Promise<Product>, [string]>(),
  findAll: jest.fn<Promise<Product[]>, []>().mockResolvedValue(products),
});

describe("Unit test list product use case", () => {
  it("lists all products", async () => {
    const repository = createMockRepository();
    const useCase = new ListProductUseCase(repository);

    const result = await useCase.execute({});

    expect(result).toEqual({
      products: [
        { id: "123", name: "Product 1", price: 100 },
        { id: "456", name: "Product 2", price: 200 },
      ],
    });
    expect(repository.findAll).toHaveBeenCalledTimes(1);
  });
});
