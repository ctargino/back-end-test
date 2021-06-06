import { IPlanetByAPIDTO } from '@modules/planets/dtos/IPlanetBYAPIDTO';
import AppError from '@shared/errors/AppError';
import axios from 'axios';

interface IRequest {
  search: string;
}

export default async (params: IRequest): Promise<IPlanetByAPIDTO> => {
  const planets = await axios({
    method: 'GET',
    url: `${process.env.SW_API_URL}/planets/`,
    params,
  })
    .then(async res => {
      return res.data;
    })
    .catch(error => {
      return {
        error: error,
      };
    });

  if (planets.error) {
    throw new AppError(`Unexpected error getting planets - ${planets.error}`);
  }

  return planets;
};
