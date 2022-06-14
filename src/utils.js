import data from "./data.json";

export const formatPrice = (price) => {
  const formatter = new Intl.NumberFormat("tr-TR", {
    minimumFractionDigits: 0,
  });
  return `${formatter.format(price)} TL`;
};

export const getCategories = () => {
  const categories = data.responses[0][0].params.userCategories;
  if (!categories?.length) {
    return false;
  }
  return categories;
};

export const getProductList = (selectedCategory = "Size Özel") => {
  const productList = data.responses[0][0].params.recommendedProducts[selectedCategory];
  if (!productList?.length) {
    return false;
  }
  return productList;
};

// const showProductDetail = (product) => {
//   const productDetailContainerElement = document.querySelector("#product-detail-container");
//   productDetailContainerElement.innerHTML = "";
//   const productPriceElement = document.createElement("div");
//   productPriceElement.className = "product-price";
//   productPriceElement.id = product.productId;
//   productPriceElement.innerHTML = formatPrice(product.price);
//   console.log(formatPrice(product.price));
//   productDetailContainerElement.appendChild(productPriceElement);
// };

export const createProductCard = (product) => {
  const productCardElement = document.createElement("div");
  const productNameElement = document.createElement("div");
  const productImageElement = document.createElement("img");
  const productPriceElement = document.createElement("div");
  const productCargoElement = document.createElement("div");
  const productAddBasketElement = document.createElement("div");
  const cargoTruckIcon = document.createElement("img");
  productCardElement.className = "product-card";

  productImageElement.className = "product-image owl-lazy";
  productImageElement.setAttribute("data-src", product.image);

  productNameElement.className = "product-name";
  productNameElement.innerHTML = product.name;

  productPriceElement.className = "product-price";
  productPriceElement.innerHTML = product.priceText;

  productCargoElement.className = "product-cargo";
  productCargoElement.innerHTML = "Ücretsiz Kargo";
  cargoTruckIcon.src = "../src/truck.png";
  productCargoElement.appendChild(cargoTruckIcon);

  productAddBasketElement.className = "product-add-basket";
  productAddBasketElement.innerHTML = "Sepete Ekle";

  productAddBasketElement.addEventListener("click", async () => {
    const basketPopupElement = document.querySelector("#add-basket-popup");
    basketPopupElement.style.display = "flex";
    basketPopupElement.style.transform = "translateX(-10%)";
    setTimeout(() => {
      basketPopupElement.style.transform = "translateX(100%)";
    }, 2500);
  });

  if (!productCardElement.className.includes("item")) {
    productCardElement.classList.add("item");
  }

  productCardElement.append(
    productImageElement,
    productNameElement,
    productPriceElement,
    product.params.shippingFee == "FREE" ? productCargoElement : "",
    productAddBasketElement
  );
  // productCardElement.addEventListener("click", () => showProductDetail(product));

  return productCardElement;
};
