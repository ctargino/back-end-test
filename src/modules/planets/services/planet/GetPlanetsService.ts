import { inject, injectable } from 'tsyringe';

import Planet from '@modules/planets/infra/typeorm/entities/Planet';
import IPlanetRepository from '@modules/planets/repositories/IPlanetRepostiroy';
import AppError from '@shared/errors/AppError';

@injectable()
export default class GetPlanetsService {
  constructor(
    @inject('PlanetRepository') private planetRepository: IPlanetRepository,
  ) {}

  public async execute(id: string): Promise<Planet | undefined> {
    try {
      const planet = await this.planetRepository.findById(id);

      if (!planet) throw new AppError('Planet not found', 404);

      return planet;
    } catch (err) {
      throw new AppError(err.message);
    }
  }
}
