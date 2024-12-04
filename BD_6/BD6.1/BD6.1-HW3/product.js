const products = [
  { id: 1, name: "Laptop", category: "Electronics" },
  { id: 2, name: "Coffee Maker", category: "Appliances" },
  { id: 3, name: "Headphones", category: "Electronics" },
  { id: 4, name: "Running Shoes", category: "Footwear" },
];

const getProducts = () => {
  return products;
};

const getProductById = (id) => {
  const product = products?.find((product) => product?.id == id);
  return product;
};

const addProduct = (product) => {
  const newProduct = { id: products?.length + 1, ...product };
  products.push(newProduct);
  return newProduct;
};

module.exports = { getProductById, getProducts, addProduct };
