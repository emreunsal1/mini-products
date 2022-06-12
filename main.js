import userCategories from "./dataJson/userCategories";
import { getProductList } from "./dataJson/productsList";

const headerDomElement = document.querySelector("#main-header");
const productContainerDomElement = document.querySelector("#product-container");
const productDetailContainerElement = document.querySelector(
  "#product-detail-container"
);
let selectedCategorie = "Size Özel";
const priceFormatter = new Intl.NumberFormat("tr-TR", {
  style: "currency",
  currency: "TRY",
  currencyDisplay: "name",
  minimumFractionDigits: 2,
});

if (userCategories) {
  userCategories.map((categorie) => {
    const categorieElement = document.createElement("div");
    categorieElement.className = "header-item";
    categorieElement.id = categorie;
    categorieElement.innerHTML = categorie;
    categorieElement.addEventListener("click", () => {
      selectedCategorie = categorieElement.id;
      showProductList();
    });
    headerDomElement.appendChild(categorieElement);
  });
}

const showProductList = () => {
  productContainerDomElement.innerHTML = "";
  if (!getProductList(selectedCategorie)) {
    return false;
  }
  getProductList(selectedCategorie).map((product) => {
    const productCardElement = document.createElement("div");
    const productNameElement = document.createElement("div");
    productCardElement.className = "product-card";
    productCardElement.id = "product-card";
    productNameElement.className = "product-name";
    productNameElement.id = "product-name";
    productNameElement.innerHTML = product.name;
    productCardElement.appendChild(productNameElement);
    productCardElement.addEventListener("click", () =>
      showProductDetail(product)
    );
    productContainerDomElement.appendChild(productCardElement);
  });
};

const showProductDetail = (product) => {
  productDetailContainerElement.innerHTML = "";
  const productPriceElement = document.createElement("div");
  productPriceElement.className = "product-price";
  productPriceElement.id = product.productId;
  productPriceElement.innerHTML = priceFormatter.format(product.price);
  productDetailContainerElement.appendChild(productPriceElement);
};

showProductList();
