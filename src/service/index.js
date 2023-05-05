import { furnitures, pieces, categories } from "../data/dataArrays";

export function getFurnitures() {
  return furnitures;
}

export function getAllPieces(idArray) {
  const piecesArray = [];
  idArray.map((index) => {
    pieces.map((data) => {
      if (data.id == index[0]) {
        piecesArray.push([data, index[1]]);
      }
    });
  });
  return piecesArray;
}

export function getCategories() {
  return categories;
}

export function getCategoriesName(categoryId) {
  let categoryName = "";
  categories.map((item) => {
    if (item.id == categoryId) {
      categoryName = item.name;
    }
  });

  return categoryName;
}

export function getNumberOfFurnitures(categoryId) {
  let count = 0;
  furnitures.map((data) => {
    if (data.categoryId == categoryId) {
      count++;
    }
  });
  return count;
}

export function getFurnituresbyCategory(categoryId) {
  const furnituresArray = [];
  furnitures.map((data) => {
    if (data.categoryId == categoryId) {
      furnituresArray.push(data);
    }
  });
  return furnituresArray;
}
