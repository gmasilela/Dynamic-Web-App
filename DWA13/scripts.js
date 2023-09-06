const provinces = ['Western Cape', 'Gauteng', 'Northern Cape', 'Eastern Cape', 'KwaZulu-Natal', 'Free State'];
const names = ['Ashwin', 'Sibongile', 'Jan-Hendrik', 'Sifso', 'Shailen', 'Frikkie'];

// Exercise 1
names.forEach((name) => {
  console.log(name);
});

// Exercise 2
names.forEach((name, index) => {
  console.log(`${name} (${provinces[index]})`);
});

// Exercise 3
const provincesUpperCase = provinces.map((province) => province.toUpperCase());
console.log(provincesUpperCase);

// Exercise 4
const nameLengths = names.map((name) => name.length);
console.log(nameLengths);

// Exercise 5
const sortedProvinces = provinces.slice().sort();
console.log(sortedProvinces);

// Exercise 6
const filteredProvinces = provinces.filter((province) => !province.includes("Cape"));
console.log(filteredProvinces.length);

// Exercise 7
const containsS = names.map((name) => name.includes("S"));
console.log(containsS);

// Exercise 8
const nameToProvince = names.reduce((acc, name, index) => {
  acc[name] = provinces[index];
  return acc;
}, {});
console.log(nameToProvince);

// Additional Exercises

const products = [
  { product: 'banana', price: "2" },
  { product: 'mango', price: 6 },
  { product: 'potato', price: ' ' },
  { product: 'avocado', price: "8" },
  { product: 'coffee', price: 10 },
  { product: 'tea', price: '' },
];

// Additional Exercise 1
products.forEach((product) => {
  console.log(product.product);
});

// Additional Exercise 2
const filteredProducts = products.filter((product) => product.product.length <= 5);
console.log(filteredProducts);

// Additional Exercise 3
const validProducts = products
  .filter((product) => product.price && !isNaN(Number(product.price)))
  .map((product) => Number(product.price));

const totalPrice = validProducts.reduce((acc, price) => acc + price, 0);
console.log(totalPrice);

// Additional Exercise 4
const concatenatedNames = products.reduce((acc, product, index) => {
  if (index === 0) {
    return product.product;
  }
  return `${acc}, ${product.product}`;
}, "");
console.log(concatenatedNames);

// Additional Exercise 5
const priceArray = products
  .filter((product) => product.price && !isNaN(Number(product.price)))
  .map((product) => ({ name: product.product, price: Number(product.price) }));

const highestPrice = priceArray.reduce((acc, product) =>
  product.price > acc.price ? product : acc
);
const lowestPrice = priceArray.reduce((acc, product) =>
  product.price < acc.price ? product : acc
);

console.log(`Highest: ${highestPrice.name}. Lowest: ${lowestPrice.name}.`);

// Additional Exercise 6
const modifiedProducts = products.map((product) => {
  const modifiedProduct = {};
  Object.entries(product).forEach(([key, value]) => {
    if (key === "product") {
      modifiedProduct.name = value;
    } else if (key === "price") {
      modifiedProduct.cost = value;
    } else {
      modifiedProduct[key] = value;
    }
  });
  return modifiedProduct;
});

console.log(modifiedProducts);
