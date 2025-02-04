// 1. Transform the given array of objects into an object using .reduce().

const data = [
  { key: "item", value: "Pencil" },
  { key: "price", value: 250 },
  { key: "inStock", value: true },
];
console.log(
  data.reduce((acc, ele) => {
    acc[ele.key] = ele.value;
    return acc;
  }, {})
);
// Output: { item: 'Pencil', price: 250, inStock: true }

// 2. Convert the given array of objects into an array of colors using .reduce().

const students = [
  { item: "Pen", color: "blue" },
  { item: "Pen", color: "black" },
  { item: "Pen", color: "red" },
];
console.log(
  students.reduce((acc, ele) => {
    acc.push(ele.color);
    return acc;
  }, [])
);

// Output: [ 'blue', 'black', 'red' ]

// 3. Convert the given array of objects into an array of cities using .reduce().

const countries = [
  { item: "Car", manufacturingCity: "New York" },
  { item: "Car", manufacturingCity: "Los Angeles" },
  { item: "Car", manufacturingCity: "Chicago" },
];
console.log(
  countries.reduce((acc, ele) => {
    acc.push(ele.manufacturingCity);
    return acc;
  }, [])
);
// Output: [ 'New York', 'Los Angeles', 'Chicago' ]

// 4. Convert the given array of objects into an array of fruits using .reduce().

const groceryItems = [
  { item: "Fruit", name: "Apple" },
  { item: "Fruit", name: "Banana" },
  { item: "Fruit", name: "Orange" },
];
console.log(
  groceryItems.reduce((acc, ele) => {
    acc.push(ele.name);
    return acc;
  }, [])
);
// Output: [ 'Apple', 'Banana', 'Orange' ]

// 5.  Transform the given array of objects into an object using .reduce()

const details = [
  { key: "category", value: "Electronics" },
  { key: "rating", value: 4.5 },
  { key: "available", value: true },
];
console.log(
  details.reduce((acc, ele) => {
    acc[ele.key] = ele.value;
    return acc;
  }, {})
);
// Output: { category: 'Electronics', rating: 4.5, available: true }
