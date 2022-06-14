import { getCategories, getProductList, createProductCard } from "./src/utils";
import "./style/main.scss";

const main = () => {
  const headerDomElement = document.querySelector("#main-header");
  const productContainerDomElement = document.querySelector("#product-container");
  const carouselOptions = {
    margin: 10,
    items: 4,
    center: false,
    nav: true,
    lazyLoad: true,
    responsive: {
      0: {
        items: 2,
        nav: true,
      },
      600: {
        items: 2,
        nav: false,
      },
      1000: {
        items: 4,
        nav: true,
        loop: false,
      },
    },
  };

  $(document).ready(() => {
    $(".owl-carousel").owlCarousel(carouselOptions);
  });

  const categories = getCategories();

  let selectedCategory;

  if (categories?.length) {
    selectedCategory = categories[0];
    categories.forEach((category) => {
      const categoryElement = document.createElement("div");
      categoryElement.className = "header-item";
      categoryElement.id = category;
      let categoryText = category;
      if (category.includes(">")) {
        categoryText = category.split(">")[1].trim();
      }
      categoryElement.innerHTML = categoryText;

      if (selectedCategory == category) {
        categoryElement.classList.add("selected");
      }

      categoryElement.addEventListener("click", (e) => {
        selectedCategory = categoryElement.id;
        document.querySelector(".header-item.selected").classList.remove("selected");
        e.target.classList.add("selected");
        showProductList();
        $(".owl-carousel").owlCarousel("destroy");
        $(".owl-carousel").owlCarousel(carouselOptions);
      });
      headerDomElement.appendChild(categoryElement);
    });
  }

  const showProductList = () => {
    const productList = getProductList(selectedCategory);
    if (!productList) {
      return false;
    }
    productContainerDomElement.innerHTML = "";
    productList.forEach((product) => productContainerDomElement.appendChild(createProductCard(product)));
  };
  showProductList();
};

window.addEventListener("load", () => main());
