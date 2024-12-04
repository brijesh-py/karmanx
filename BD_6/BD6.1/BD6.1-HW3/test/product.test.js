const { getProductById, getProducts, addProduct } = require("../product");

describe("Products Functions", () => {
  // Exercise 4: Test get all Products
  it("should be get all Products", () => {
    const products = getProducts();
    expect(products?.length).toBe(4);
    expect(products).toEqual([
      { id: 1, name: "Laptop", category: "Electronics" },
      { id: 2, name: "Coffee Maker", category: "Appliances" },
      { id: 3, name: "Headphones", category: "Electronics" },
      { id: 4, name: "Running Shoes", category: "Footwear" },
    ]);
  });

  // Exercise 5: Test get Product by ID
  it("should be get a Product by ID", () => {
    const product = getProductById(3);
    expect(product).toEqual({
      id: 3,
      name: "Headphones",
      category: "Electronics",
    });
  });

  //  Exercise 6: Test get Product by non-existent ID
  it("Should be return undefined by out-of-range Product ID", () => {
    expect(getProductById(5)).toEqual(undefined);
    expect(getProductById(12)).toEqual(undefined);
  });

  //   Exercise 7: Test add new Product
  it("Should be return New Product", () => {
    const product = addProduct({
      name: "Mobile",
      category: "Electronics",
    });
    expect(product).toEqual({
      id: 5,
      name: "Mobile",
      category: "Electronics",
    });
    expect(getProducts().length).toBe(5);
  });
});
