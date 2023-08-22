import {
  IEnginStartStop,
  ICar,
  IDrive,
  IAllWinners,
  IWinner,
  TypeIsDrive,
  IUpdateCar,
  IUpdateWinner,
  TParamCarSpeed,
  IPagination,
  IAll,
} from 'src/types/types';

const apiUrl = 'http://127.0.0.1:3000';

const carName: string[] = [
  'BMW',
  'Maserati',
  'Audi',
  'Acura',
  'Range Rover',
  'Lada',
  'Honda',
  'Hyunday',
  'Toyota',
  'Ford',
];
const carModel: string[] = [
  'Sport',
  'Coupe',
  'GT',
  '4X4',
  'Pickup',
  'Mini',
  'Limited',
  'SRC',
  'Ultra',
  'Taburet',
];
const valuesForColor = '0123456789abcdef';

const getRandomNumInt = (num: number): number => Math.floor(Math.random() * num);

const carNameGenerator = (): string => {
  const name = `${carName[getRandomNumInt(10)]} ${carModel[getRandomNumInt(10)]}`;
  return name;
};

const colorGenerator = (): string => {
  let color = '#';
  let numOfLetters = 6;

  while (numOfLetters > 0) {
    color += valuesForColor[getRandomNumInt(16)];
    numOfLetters -= 1;
  }
  return color;
};

export const checkServerAvailability = () => {
  const xhr = new XMLHttpRequest();
  const serverUrl = apiUrl;

  xhr.open('GET', serverUrl, true);

  xhr.onload = (): void => {
    if (xhr.status >= 200 && xhr.status < 300) {
      console.log('Сервер доступен!');
    } else {
      console.error('Сервер недоступен.');
    }
  };

  xhr.onerror = () => {
    throw new Error('Запусти или правильно настрой сервер!');
  };

  xhr.send();
};

export const getAllCars = async (options: IPagination): Promise<IAll> => {
  const requestParameters = new URLSearchParams({
    _page: options.page.toString(),
    _limit: options.limit.toString(),
  });
  const response = await fetch(`${apiUrl}/garage/?${requestParameters.toString()}`);
  const carsInGarage = {
    items: await response.json(),
    quantityCars: Number(await response.headers.get('X-Total-Count')),
  };
  return carsInGarage;
};

export const getCar = async (id: number): Promise<ICar> => {
  const response = await fetch(`${apiUrl}/garage/${id}`);
  const car = await response.json();
  return car;
};

export const createCar = async (carOptions: ICar): Promise<void> => {
  const response = await fetch(`${apiUrl}/garage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(carOptions),
  });
  await response.json();
};

export const createHundredCars = (): void => {
  let quantityCar = 100;

  while (quantityCar > 0) {
    const carOptions: ICar = {
      name: carNameGenerator(),
      color: colorGenerator(),
    };

    createCar(carOptions);
    quantityCar -= 1;
  }
};

export const updateCarOnServer = async (id: number, options: IUpdateCar): Promise<void> => {
  const response = await fetch(`${apiUrl}/garage/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(options),
  });
  await response.json();
};

export const removeCar = async (id: number): Promise<void> => {
  const response = await fetch(`${apiUrl}/garage/${id}`, {
    method: 'DELETE',
  });
  await response.json();
};

export const startStopEngine = async (parameters: IEnginStartStop):
Promise<void | TParamCarSpeed> => {
  const requestParameters = new URLSearchParams({
    id: parameters.id.toString(),
    status: parameters.status,
  });
  const response = await fetch(`${apiUrl}/engine/?${requestParameters.toString()}`, { method: 'PATCH' });
  const answer = await response.json();
  const data = {
    velocity: answer.velocity,
    distance: answer.distance,
  };
  return data;
};

export const isDrive = async (parameters: IDrive): Promise<TypeIsDrive> => {
  const requestParameters = new URLSearchParams({
    id: parameters.id.toString(),
    status: parameters.status,
  });

  const response = await fetch(`${apiUrl}/engine/?${requestParameters.toString()}`, { method: 'PATCH' });
  if (response.status === 500) {
    const success: TypeIsDrive = {
      success: false,
    };
    return success;
  }
  const success: TypeIsDrive = await response.json();
  return success;
};

export const getAllWinners = async (parameters: IAllWinners): Promise<IAll> => {
  const requestParameters = new URLSearchParams({
    _page: parameters.page.toString(),
    _limit: parameters.limit.toString(),
    _sort: parameters.sort,
    _order: parameters.order,
  });

  const response = await fetch(`${apiUrl}/winners/?${requestParameters.toString()}`);
  const winners = {
    items: await response.json(),
    quantityCars: Number(await response.headers.get('X-Total-Count')),
  };
  return winners;
};

export const getWinner = async (id: number): Promise<IWinner | boolean> => {
  const response = await fetch(`${apiUrl}/winners/${id}`);
  if (!response.ok) {
    return false;
  }
  const winner = await response.json();
  return winner;
};

export const createWinner = async (winOptions: IWinner): Promise<void> => {
  const response = await fetch(`${apiUrl}/winners`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(winOptions),
  });
  await response.json();
};

export const removeWinner = async (id: number): Promise<void> => {
  const response = await fetch(`${apiUrl}/winners/${id}`, {
    method: 'DELETE',
  });
  await response.json();
};

export const updateWinner = async (id: number, options: IUpdateWinner): Promise<void> => {
  const response = await fetch(`${apiUrl}/winners/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(options),
  });
  await response.json();
};
