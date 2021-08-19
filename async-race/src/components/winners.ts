import { getCarInfo, getWinners } from '../api';
import { Car } from './car';

export const renderWinnerRow = (winner: Car, winnerImg: string, victories: number, time: number) => `
    <tr>
      <td>
        ${winner.name}
      </td>
      <td>
        ${winnerImg}
      </td>
      <td>
        ${victories}
      </td>
      <td>
        ${time}
      </td>
    </tr>
`;

export const renderWinners = async () => {
  const winnersInfo = await getWinners(1, 10);

  return `
  <section class="winners hidden">
    <h1>Winners (${winnersInfo.count})</h1>
    <h2>Page #1</h2>
    <table class="winners-table">
      <tr>
        <th>Name</th>
        <th>Picture</th>
        <th>Number of victories</th>
        <th>Best time</th>
      </tr>
    </table>
  </section>
  `;
};
