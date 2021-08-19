const baseUrl = 'http://localhost:3000';

const garageUrl = `${baseUrl}/garage`;

const winnersUrl = `${baseUrl}/winners`;

const engineUrl = `${baseUrl}/engine`;

export const getCars = async (page: number, limit: number) => {
  const result = await fetch(`${garageUrl}?_page=${page}&_limit=${limit}`);

  return {
    cars: await result.json(),
    count: result.headers.get('X-Total-Count'),
  };
};

export const getCarInfo = async (id: number): Promise<{ name: string, color: string, id: number }> => {
  const carInfo = (await fetch(`${garageUrl}/${id}`)).json();
  return carInfo;
};

export const createCar = async (body: Record<string, unknown>) => (await fetch(garageUrl, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
})).json();

export const updateCar = async (id: number, body: Record<string, unknown>) => (await fetch(`${garageUrl}/${id}`, {
  method: 'PUT',
  body: JSON.stringify(body),
  headers: {
    'Content-Type': 'application/json',
  },
})).json();

export const deleteCar = async (id:number) => {
  (await fetch(`${garageUrl}/${id}`, {
    method: 'DELETE',
  })).json();
};

export const getWinners = async (page: number, limit: number) => {
  const result = await fetch(`${winnersUrl}?_page=${page}&_limit=${limit}`);

  return {
    winners: await result.json(),
    count: result.headers.get('X-Total-Count'),
  };
};

export const getWinner = async (id: number) => {
  const winnerInfo = (await fetch(`${winnersUrl}/${id}`)).json();
  return winnerInfo;
};

export const getDriveParams = async (id: number, status: string) => {
  const result = (await fetch(`${engineUrl}?id=${id}&status=${status}`)).json();

  return result;
};

export const switchDriveMode = async (id: number) => {
  const result = (await fetch(`${engineUrl}?id=${id}&status=drive`)).status;

  return result;
};

export const createWinner = async (body: Record<string, unknown>) => (await fetch(winnersUrl, {
  method: 'POST',
  body: JSON.stringify(body),
  headers: {
    'Content-Type': 'application/json',
  },
})).json();
