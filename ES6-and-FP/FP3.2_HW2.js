// 1. Transform the given array of objects into an object using .reduce().

const productInfo = [
  { key: "name", value: "Laptop" },
  { key: "price", value: 12000 },
  { key: "brand", value: "Dell" },
];
console.log(
  productInfo.reduce((acc, ele) => {
    acc[ele.key] = ele.value;
    return acc;
  }, {})
);
// Output: { name: 'Laptop', price: 12000, brand: 'Dell' }

// 2. Convert the given array of objects into an array of universities using .reduce().

const colleges = [
  { item: "Book", university: "Harvard" },
  { item: "Book", university: "MIT" },
  { item: "Book", university: "Stanford" },
];
console.log(
  colleges.reduce((acc, ele) => {
    acc.push(ele.university);
    return acc;
  }, [])
);
// Output: [ 'Harvard', 'MIT', 'Stanford' ]

// 3. Transform the given array of objects into an object using .reduce().

const userPreferences = [
  { key: "theme", value: "Dark Mode" },
  { key: "fontSize", value: 16 },
  { key: "notifications", value: true },
];
console.log(
  userPreferences.reduce((acc, ele) => {
    acc[ele.key] = ele.value;
    return acc;
  }, {})
);

// // Output: { theme: 'Dark Mode', fontSize: 16, notifications: true }

// 4. Transform the given array of objects into an object using .reduce().

const continents = [
  { key: "Asia", country: "India" },
  { key: "Europe", country: "France" },
  { key: "North America", country: "USA" },
];
console.log(
  continents.reduce((acc, ele) => {
    acc[ele.key] = ele.country;
    return acc;
  }, {})
);
// // Output: { Asia: 'India', Europe: 'France', 'North America': 'USA' }

// 5.  Transform the given array of objects into an object using .reduce().

const information = [
  { key: "city", value: "New York" },
  { key: "population", value: 8398748 },
  { key: "area", value: 468.9 },
];
console.log(
  information.reduce((acc, ele) => {
    acc[ele.key] = ele.value;
    return acc;
  }, {})
);
// // Output: { city: 'New York', population: 8398748, area: 468.9 }
