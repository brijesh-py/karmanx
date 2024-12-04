const { app, getProducts, getProductById, addProduct } = require("../app");
const http = require("http");

jest.mock("../app", () => ({
  ...jest.requireActual("../app"),
  getProducts: jest.fn(),
  getProductById: jest.fn(),
  addProduct: jest.fn(),
}));

let server;
beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe("Functions Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Exercise 4: Test get all Products
  test("Get Products should return an Products list", () => {
    const mockProducts = [
      { id: 1, name: "Laptop", category: "Electronics" },
      { id: 2, name: "Coffee Maker", category: "Appliances" },
      { id: 3, name: "Headphones", category: "Electronics" },
      { it: 4, name: "Running Shoes", category: "Footwear" },
    ];
    getProducts.mockReturnValue(mockProducts);

    let products = getProducts();
    expect(products).toEqual(mockProducts);
    expect(getProducts).toHaveBeenCalled();
  });

  // Exercise 5: Test get Product by ID
  test("Get Product by ID should return an Product", () => {
    const mockProduct = {
      id: 1,
      title: "The Shawshank Redemption",
      director: "Frank Darabont",
    };
    getProductById.mockReturnValue(mockProduct);

    let product = getProductById(1);
    expect(product).toEqual(mockProduct);
    expect(getProductById).toHaveBeenCalledWith(1);
  });

  // Exercise 6: Test get Product by non-existent ID
  test("Get Product by Id should return undefined", () => {
    getProductById.mockReturnValue(undefined);

    let product = getProductById(4);
    expect(product).toBeUndefined();
    expect(getProductById).toHaveBeenCalledWith(4);
  });

  // Exercise 7: Test add New Product
  test("Add Product: ID, Name and Category should return a new Product", () => {
    const mockProduct = {
      id: 5,
      name: "Mobile",
      category: "Electronics",
    };
    addProduct.mockReturnValue(mockProduct);

    let product = addProduct(mockProduct);
    expect(product).toEqual(mockProduct);
    expect(addProduct).toHaveBeenCalledWith(mockProduct);
  });
});
