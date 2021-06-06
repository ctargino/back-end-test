import Planet from '../infra/typeorm/entities/Planet';

export interface ICreatePlanetDTO {
  name: string;
  climate: string;
  terrain: string;
  films: Array<string>;
}

export interface IListPlanetDTO {
  id?: string;
  name?: string;
  climate?: string;
  terrain?: string;
  films?: string;
}

export interface IDeletePlanetResponseDTO {
  planetExist: Planet;
  message: string;
}
