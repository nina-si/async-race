import { renderGarage } from './garage';
import { renderWinners } from './winners';
import {
  deleteCar, getCarInfo, getDriveParams, getWinners, updateCar,
} from '../api';
import { CarMotion } from './car-motion';

export const renderHeader = `
    <header class="main-header">
      <button class="btn btn-menu btn-garage">Garage</button>
      <button class="btn btn-menu btn-winners">Winners</button>
    </header>
    `;

let currentCarId: number;

const selectCar = async (e: Event, nameInput: HTMLInputElement, colorInput: HTMLInputElement): Promise<void> => {
  const carId = (<HTMLElement>e.target).dataset.id;
  const selectedCar = await getCarInfo(Number(carId));
  nameInput.value = selectedCar.name;
  colorInput.value = selectedCar.color;
  currentCarId = Number(carId);
};

export const renderPage = async (): Promise<void> => {
    const garage = await renderGarage();
    const winners = await renderWinners();
    document.body.innerHTML = renderHeader + garage + winners;

    const removeBtns = document.querySelectorAll('.btn-remove');
    const selectBtns = document.querySelectorAll('.btn-select');
    const nameInput = <HTMLInputElement>document.querySelector('.update-model');
    const colorInput = <HTMLInputElement>document.querySelector('.update-color');
    const startBtns = document.querySelectorAll('.btn-start');

    for (let i = 0; i < removeBtns.length; i++) {
      removeBtns[i].addEventListener('click', async (e) => {
        const carId = (<HTMLElement>e.target).dataset.id;
        await deleteCar(Number(carId));
        await renderPage();
      });
    }

    for (let i = 0; i < selectBtns.length; i++) {
      selectBtns[i].addEventListener('click', async (e) => {
        selectCar(e, nameInput, colorInput);
      });
    }

    for (let i = 0; i < startBtns.length; i++) {
      startBtns[i].addEventListener('click', async (e) => {
        const startedCarId = Number((<HTMLElement>e.target).dataset.id);
        const carAnimation = new CarMotion(startedCarId);
        await carAnimation.moveCar();
      });
    }
  };

  const updatedCarData = {
    name: '',
    color: '',
  };

  const getUpdatedCarData = async (): Promise<void> => {
    const newNameInput = <HTMLInputElement>document.querySelector('.update-model');
    const newColorInput = <HTMLInputElement>document.querySelector('.update-color');
    updatedCarData.name = newNameInput.value;
    updatedCarData.color = newColorInput.value;
  };

  export const updateCarInfo = async (): Promise<void> => {
    await getUpdatedCarData();
    await updateCar(currentCarId, updatedCarData);
  };
