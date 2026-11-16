import Product from "./product";

describe("Product unit tests", () => {
  it("should add an error to the notification when id is empty", () => {
    const product = new Product("", "Product 1", 100);

    expect(product.notification.getErrors()).toEqual([
      { context: "product", message: "Id is required" },
    ]);
  });

  it("should add an error to the notification when name is empty", () => {
    const product = new Product("123", "", 100);

    expect(product.notification.getErrors()).toEqual([
      { context: "product", message: "Name is required" },
    ]);
  });

  it("should add an error to the notification when price is less than zero", () => {
    const product = new Product("123", "Name", -1);

    expect(product.notification.getErrors()).toEqual([
      { context: "product", message: "Price must be greater than zero" },
    ]);
  });

  it("should collect errors for multiple invalid properties", () => {
    const product = new Product("123", "", -1);

    expect(product.notification.getErrors()).toEqual([
      { context: "product", message: "Name is required" },
      { context: "product", message: "Price must be greater than zero" },
    ]);
    expect(product.validate()).toBe(false);
  });

  it("should clear previous errors when the product becomes valid", () => {
    const product = new Product("123", "", -1);

    product.changeName("Product 1");
    product.changePrice(100);

    expect(product.notification.hasErrors()).toBe(false);
    expect(product.validate()).toBe(true);
  });

  it("should change name", () => {
    const product = new Product("123", "Product 1", 100);
    product.changeName("Product 2");
    expect(product.name).toBe("Product 2");
  });

  it("should change price", () => {
    const product = new Product("123", "Product 1", 100);
    product.changePrice(150);
    expect(product.price).toBe(150);
  });
});
