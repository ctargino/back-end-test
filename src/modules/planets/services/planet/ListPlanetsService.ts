import { IListPlanetDTO } from '@modules/planets/dtos/IPlanetDTO';
import Planet from '@modules/planets/infra/typeorm/entities/Planet';
import IPlanetRepository from '@modules/planets/repositories/IPlanetRepostiroy';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class ListPlanetsService {
  constructor(
    @inject('PlanetRepository') private planetRepository: IPlanetRepository,
  ) {}

  public async execute(params: IListPlanetDTO): Promise<Planet[]> {
    try {
      const planets = await this.planetRepository.all(params);

      return planets;
    } catch (err) {
      throw new AppError(err.message);
    }
  }
}
