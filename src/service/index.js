var api_url = 'http://localhost:3000'

export async function getFurnitures() {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };
  const response = await fetch(`${api_url}/furnitures`, requestOptions)
  .then(response => response.json())
  
  return response
}

async function getPiece(id) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };
  const response = await fetch(`${api_url}/pieces/${id}`, requestOptions)
  .then(response => response.json())
  
  return response
}

export function getAllPieces(idArray) {
  const piecesArray = [];
  idArray.map(async (item) => {
    const piece = await getPiece(item);
      piecesArray.push([piece, '#']);
  });

  return piecesArray;
}

export async function getCategories() {
const requestOptions = {
  method: 'GET',
  headers: { 'Content-Type': 'application/json' },
};
const response = await fetch(`${api_url}/categories`, requestOptions)
.then(response => response.json())

return response
}

export async function getCategoriesName(categoryId) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };
  
  const response = await fetch(`${api_url}/categories/${categoryId}`, requestOptions)
  .then(response => response.json())
  
  return response.name;
}

export async function getNumberOfFurnitures(categoryId) {
  let count = 0;
  const dataFurnitures = await getFurnitures()

  dataFurnitures.map((data) => {
    if (data.categoryId === categoryId) {
      count++;
    }
  });
  return count;
}

export async function getFurnituresbyCategory(categoryId) {
  const furnituresArray = [];
  const dataFurnitures = await getFurnitures();

  dataFurnitures.map((data) => {
    if (data.categoryId === categoryId) {
      furnituresArray.push(data);
    }
  });

  return furnituresArray;
}
