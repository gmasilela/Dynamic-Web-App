import { names, provinces, products } from "./data.js";

//
names.forEach((name) => {
  console.log(name);
});

//
names.forEach((name, index) => {
  console.log(`${name} (${provinces[index]})`);
});

//
const provincesUpperCase = provinces.map((province) => province.toUpperCase());
console.log(provincesUpperCase);

//
const nameLengths = names.map((name) => name.length);
console.log(nameLengths);

//
const sortedProvinces = provinces.slice().sort();
console.log(sortedProvinces);

//
const filteredProvinces = provinces.filter((province) => !province.includes("Cape"));
console.log(filteredProvinces.length);

//
const containsS = names.map((name) => name.includes("S"));
console.log(containsS);

//
const nameToProvince = names.reduce((acc, name, index) => {
  acc[name] = provinces[index];
  return acc;
}, {});
console.log(nameToProvince);


//
products.forEach((product) => {
  console.log(product.product);
});

//
const filteredProducts = products.filter((product) => product.product.length <= 5);
console.log(filteredProducts);

//
const validProducts = products
  .filter((product) => product.price && !isNaN(Number(product.price)))
  .map((product) => Number(product.price));

const totalPrice = validProducts.reduce((acc, price) => acc + price, 0);
console.log(totalPrice);

//
const concatenatedNames = products.reduce((acc, product, index) => {
  if (index === 0) {
    return product.product;
  }
  return `${acc}, ${product.product}`;
}, "");
console.log(concatenatedNames);

//
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

//
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
