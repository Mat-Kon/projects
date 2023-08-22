export type Status = 'started' | 'stopped';
type Sort = 'id' | 'wins' | 'time';
type Order = 'ASC' | 'DESC';

export type TParamCarSpeed = { velocity: number, distance: number };

export interface IAll {
  items: [],
  quantityCars: number,
}

export interface IUpdateCar {
  name?: string,
  color?: string,
}

export interface ICar {
  name: string,
  color: string,
  id?: number,
}

export interface IPagination {
  page: number,
  limit: number,
}

export interface ICreateElement {
  tag: string,
  className: string[],
  innerHTML?: string,
}

export interface IEnginStartStop {
  id: number,
  status: Status,
}

export interface IDrive {
  id: number,
  status: 'drive',
}

export type TypeIsDrive = { 'success': boolean };

export interface IAllWinners {
  page: number,
  limit: number,
  sort: Sort,
  order: Order,
}

export interface IWinner {
  id: number,
  wins: number,
  time: number,
}

export interface IUpdateWinner {
  wins: number,
  time: number,
}

export interface IButtonsInPlace {
  select: NodeListOf<Element>;
  remove: NodeListOf<Element>;
  go: NodeListOf<Element>;
  stop: NodeListOf<Element>;
}
