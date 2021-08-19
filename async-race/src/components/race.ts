import { createWinner, getWinner } from '../api';
import { CarMotion } from './car-motion';

export const checkWinnerRecord = async (id: number): Promise<boolean> => {
  const result = await getWinner(id);
  if (result.status === 200) {
    return true;
  } return false;
};

export const createCarMotions = async (carsIds: Array<number>): Promise<CarMotion[]> => {
  const carMotions: Array<CarMotion> = [];
  const race = [...carsIds].map(async (racingCarId) => {
    const carAnimation = new CarMotion(racingCarId);
    carMotions.push(carAnimation);
    await carAnimation.moveCar();
  });
  return carMotions;
};

export const detectWinner = (carMotions: Array<CarMotion>): Record<string, unknown> => {
  const finishedCars: Array<Record<string, unknown>> = [];
  for (let i = 0; i < carMotions.length; i++) {
    if (carMotions[i].record) {
      const finishedCarInfo = {
        id: carMotions[i].carId,
        time: carMotions[i].record,
      };
      finishedCars.push(finishedCarInfo);
    }
  }

  const winner: {
    id?: number | undefined,
    time?: number | undefined,
  } = {};

  for (let i = 0; i < carMotions.length; i++) {
    if (!winner.id && !winner.time) {
      winner.id = carMotions[i].carId;
      winner.time = carMotions[i].record;
    } else {
      const currentCarRecord = carMotions[i].record ?? 0;
      const winnerRecord = winner.time ?? 0;
      if (currentCarRecord < winnerRecord && winnerRecord > 0) {
        winner.id = carMotions[i].carId;
        winner.time = currentCarRecord;
      }
    }
  }

  return winner;
};

export const startRace = async ():Promise<void> => {
  const racingCarsImgs = document.querySelectorAll('.car');
  const racingCarsIds: Array<number> = [];
  for (let i = 0; i < racingCarsImgs.length; i++) {
    const racingCarId = Number((<HTMLElement>racingCarsImgs[i]).dataset.id);
    racingCarsIds.push(racingCarId);
  }

  const carCycle = function (): Promise<CarMotion[]> {
    return new Promise((resolve) => {
      createCarMotions(racingCarsIds);
    });
  };

  const waitWinner = function (carMotions: Array<CarMotion>) {
    return new Promise((resolve) => detectWinner(carMotions));
  };

  carCycle().then((result) => waitWinner(result));
};
