import './styles.scss';
import { createCar, deleteCar } from './api';
import { sendNewCarInfo } from './components/garage';
import { renderPage, updateCarInfo } from './components/page';
import { startRace } from './components/race';

renderPage();

const newCarData = {
  name: '',
  color: '',
};

const getNewCarData = (): void => {
  const newNameInput = <HTMLInputElement>document.querySelector('.car-model');
  const newColorInput = <HTMLInputElement>document.querySelector('.car-color');
  newCarData.name = newNameInput.value || 'default';
  newCarData.color = newColorInput.value || '';
};

document.addEventListener('click', async (e) => {
  const winnersSection = document.querySelector('.winners');
  const garageSection = document.querySelector('.garage');

  if (e.target === document.querySelector('.btn-garage')) {
    if (garageSection?.classList.contains('hidden')) {
      garageSection?.classList.remove('hidden');
    }
    if (!winnersSection?.classList.contains('hidden')) {
      winnersSection?.classList.add('hidden');
    }
  } else if (e.target === document.querySelector('.btn-winners')) {
    if (winnersSection?.classList.contains('hidden')) {
      winnersSection?.classList.remove('hidden');
    }
    if (!garageSection?.classList.contains('hidden')) {
      garageSection?.classList.add('hidden');
    }
  } else if (e.target === document.querySelector('.btn-create')) {
    e.preventDefault();
    getNewCarData();
    await createCar(newCarData);
    await renderPage();
  } else if (e.target === document.querySelector('.btn-update')) {
    e.preventDefault();
    await updateCarInfo();
    await renderPage();
  } else if (e.target === document.querySelector('.btn-race')) {
    await startRace();
  }
});
