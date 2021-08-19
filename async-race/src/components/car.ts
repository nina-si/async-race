export class Car {
  public name = '';

  public color = '';

  public id: number;

  constructor(carName: string, carColor: string, id: number) {
    this.name = carName;
    this.color = carColor;
    this.id = id;
  }

  renderCarImg = (): string => `
  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width='60px'
    height='60px' viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" fill="${this.color}" xml:space="preserve">
    <metadata> Svg Vector Icons : http://www.onlinewebfonts.com/icon </metadata>
    <g><path d="M990,570.1v52.5c0,19.3-15.7,35-35,35h-36.6c1-5.7,1.6-11.5,1.6-17.5c0-58-47-105-105-105c-58,0-105,47-105,
    105c0,6,0.6,11.8,1.6,17.5H253.4c1-5.7,1.6-11.5,1.6-17.5c0-58-47-105-105-105s-105,47-105,105c0,6,0.6,11.8,1.6,
    17.5H45c-19.3,0-35-15.7-35-35v-52.5c0-3.2,0.6-6.2,1.4-9.2c7.4-47.8,21-93.5,28.4-106.1c3.1-5.3,
    5.2-7.8,5.2-7.8c1.1-5.6,63-109.9,70.5-118.9c23.6-43.3,121.1-38.1,121.1-38.1s275.1,0.4,322.5,0.4c38.7,3,41.9,11.1,
    57.4,23.1c6.4,4.8,144.2,133.9,151.5,134c115.1,1,142.2,17,142.2,17C994.3,510,990,570.1,990,570.1z M325,342.6c0,0-64.5,
    0-105,0c-40.5,0-52.5,35-52.5,35L148,421.4l177,8.7V342.6z M587.5,373.2c0,0-24.6-30.6-42.1-30.6S360,343.2,360,
    343.2v87l191.9,12.6v-24.6c0,0,6.1-15.5,20.5-12.5c11.9,2.4,24.9,16,36.1,40.9l51.6,3.4L587.5,373.2z M150,570.1c38.7,
    0,70,31.3,70,70c0,38.7-31.3,70-70,70c-38.7,0-70-31.3-70-70C80,601.4,111.3,570.1,150,570.1z M815,570.1c38.7,0,70,31.3,70,
    70c0,38.7-31.3,70-70,70c-38.7,0-70-31.3-70-70C745,601.4,776.3,570.1,815,570.1z"/></g>
  </svg>
  `;

  renderCar = (): string => {
    const carName = this.name;
    const carId = this.id;
    return `
    <div class="car-btns">
      <button class="btn btn-select" data-id="${carId}">Select</button>
      <button class="btn btn-remove" data-id="${carId}">Remove</button>
      <span class="car-name">${carName}</span>
    </div>
    <div class="track">
      <div class="control-btns">
        <button class="btn btn-start" data-id="${carId}">Start</button>
        <button class="btn btn-stop" data-id="${carId}">Stop</button>
      </div>
      <div class="car" id="car-${carId}" data-id="${carId}">
        ${this.renderCarImg()}
      </div>
      <div class="flag" id="flag-1">&#9872</div>
    </div>
  `;
  };
}
