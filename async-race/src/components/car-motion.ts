import { getDriveParams, switchDriveMode } from '../api';

const TRACK_START = 10; // начальная точка трека в % от ширины родителя
const TRACK_END = 91; // конечная точка трека в % от ширины родителя
const ANIMATION_SPEED = 10; // миллисекунды

export class CarMotion {
  private startTime;

  public carId;

  public isMoving;

  public isBroken;

  public isFinished;

  public movingCar: HTMLElement | null;

  private asessedDriveTime: number | undefined;

  public record: number | undefined;

  public btnStop: HTMLElement | null;

  public position: number | null;

  constructor(carId: number) {
    this.carId = carId;
    this.startTime = new Date().getTime();
    this.isMoving = true;
    this.movingCar = document.getElementById(`car-${this.carId}`);
    this.btnStop = document.querySelector(`.btn-stop[data-id = '${this.carId}']`);
    this.isBroken = false;
    this.isFinished = false;
    this.position = TRACK_START;

    this.btnStop?.addEventListener('click', () => {
      this.isMoving = false;
      if (this.movingCar) (<HTMLElement> this.movingCar).style.left = '10%';
    });
  }

  moveCar = async (): Promise<void> => {
    this.asessedDriveTime = await this.countDriveTime();
    this.animateCar();
    const response = await switchDriveMode(this.carId);
    if (response === 500) {
      this.isBroken = true;
      this.isMoving = false;
    } else if (response === 200) {
      this.isFinished = true;
      await this.getFinishingTime();
    }
  };

  animateCar = async (): Promise<void> => {
    if (this.asessedDriveTime) {
      const animationStep = (TRACK_END - TRACK_START) / ((this.asessedDriveTime) / ANIMATION_SPEED);
      let currentPosition = TRACK_START;
      setInterval(() => {
        if (this.isMoving && !this.isBroken) {
          if (this.movingCar && currentPosition < TRACK_END) {
            currentPosition += animationStep;
            this.movingCar.style.left = `${currentPosition}%`;
          } else if (this.movingCar && currentPosition >= TRACK_END) {
            this.isMoving = false;
            this.isFinished = true;
          }
        } else if (this.isBroken) {
          this.position = currentPosition;
          this.isMoving = false;
        }
      }, ANIMATION_SPEED);
    }
  };

  countDriveTime = async (): Promise<number> => { // получаем скорость авто, возвращаем предварительное время движения в мс
    const driveParams = await getDriveParams(this.carId, 'started');
    return driveParams.distance / driveParams.velocity;
  };

  getFinishingTime = async (): Promise<number | void> => {
      const record = new Date().getTime() - this.startTime;
      this.record = record;
  };
}
