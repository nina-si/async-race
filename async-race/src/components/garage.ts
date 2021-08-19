import { createCar, getCars, updateCar } from '../api';
import { Car } from './car';

export const renderGarage = async (): Promise<string> => {
  const garageCars = await getCars(1, 7);
  const carsList = [...garageCars.cars];
  const carsItems = [];
  for (let i = 0; i < carsList.length; i++) {
    const carItem = new Car(carsList[i].name, carsList[i].color, carsList[i].id);
    const carItemHtml = carItem.renderCar();
    carsItems.push(`<div class='car-item'>${carItemHtml}</div>`);
  }
  return `
  <section class="garage">
    <form class="create-form">
      <input id="car-model" class="car-model" type="text">
      <input id="car-color" class="car-color" type="color">
      <button class="btn btn-create">Create</button>
    </form>
    <form class="update-form">
      <input id="update-model" class="update-model" type="text">
      <input id="update-color" class="update-color" type="color">
      <button class="btn btn-update">Update</button>
    </form>
    <div class="garage-btns">
      <button class="btn btn-race">Race</button>
      <button class="btn">Reset</button>
      <button class="btn">Generate Cars</button>
    </div>
    <h1>Garage (${garageCars.count})</h1>
    <h2>Page #1</h2>
    <div class='cars-list'>
      ${carsItems.join(' ')}
    </div>
  </section>
`;
};

export const sendNewCarInfo = async (): Promise<void> => {
  const input = {
    name: document.querySelector('.car-model')?.nodeValue,
    color: document.querySelector('.car-color')?.nodeValue,
  };
  await createCar(input);
};
