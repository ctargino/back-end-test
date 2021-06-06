import { IDeletePlanetResponseDTO } from '@modules/planets/dtos/IPlanetDTO';
import IPlanetRepository from '@modules/planets/repositories/IPlanetRepostiroy';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class DeletePlanetService {
  constructor(
    @inject('PlanetRepository') private planetRepository: IPlanetRepository,
  ) {}

  public async execute(id: string): Promise<IDeletePlanetResponseDTO> {
    try {
      const planet = await this.planetRepository.delete(id);

      return planet;
    } catch (err) {
      throw new AppError(err.message);
    }
  }
}
