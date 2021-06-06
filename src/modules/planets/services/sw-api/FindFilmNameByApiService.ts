import { IFilmByAPIDTO } from '@modules/planets/dtos/IFilmByAPIDTO';
import AppError from '@shared/errors/AppError';
import axios from 'axios';

export default async (url: string): Promise<IFilmByAPIDTO> => {
  const films = await axios({
    method: 'GET',
    url: url,
  })
    .then(async res => {
      return res.data;
    })
    .catch(error => {
      return {
        error: error,
      };
    });

  if (films.error) {
    throw new AppError(`Unexpected error getting film - ${films.error}`);
  }

  return films;
};
