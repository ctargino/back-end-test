import { ICreatePlanetDTO } from '@modules/planets/dtos/IPlanetDTO';
import Planet from '@modules/planets/infra/typeorm/entities/Planet';
import IPlanetRepository from '@modules/planets/repositories/IPlanetRepostiroy';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class CreatePlanetService {
  constructor(
    @inject('PlanetRepository')
    private planetRepository: IPlanetRepository,
  ) {}

  public async execute(data: ICreatePlanetDTO): Promise<Planet> {
    try {
      const planet = await this.planetRepository.create(data);

      return planet;
    } catch (err) {
      throw new AppError(err.message);
    }
  }
}
