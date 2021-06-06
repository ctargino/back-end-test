import {
  ICreatePlanetDTO,
  IDeletePlanetResponseDTO,
  IListPlanetDTO,
} from '@modules/planets/dtos/IPlanetDTO';
import IPlanetRepository from '@modules/planets/repositories/IPlanetRepostiroy';
import Planet from '@modules/planets/infra/typeorm/entities/Planet';
import { getMongoRepository, MongoRepository } from 'typeorm';
import { ObjectId } from 'bson';

export default class PlanetRespository implements IPlanetRepository {
  private ormRepository: MongoRepository<Planet>;

  constructor() {
    this.ormRepository = getMongoRepository(Planet);
  }

  public async create(data: ICreatePlanetDTO): Promise<Planet> {
    const planet = this.ormRepository.create(data);
    await this.ormRepository.save(planet);

    return planet;
  }

  public async all(param: IListPlanetDTO): Promise<Planet[]> {
    const { climate, terrain, films, name, id } = param;
    const params: Object = {};

    if (climate) {
      const climateSearch = { climate };
      Object.assign(params, climateSearch);
    }
    if (terrain) {
      const terrainSearch = { terrain };
      Object.assign(params, terrainSearch);
    }
    if (name) {
      const nameSearch = { name };
      Object.assign(params, nameSearch);
    }
    if (films) {
      const filmsSearch = { films };
      Object.assign(params, filmsSearch);
    }
    if (id) {
      const idSearch = { _id: new ObjectId(id) };
      Object.assign(params, idSearch);
    }

    const planets = await this.ormRepository.find({
      where: params,
      order: { name: 'ASC' },
    });

    return planets;
  }

  public async delete(id: string): Promise<IDeletePlanetResponseDTO> {
    const planetExist = await this.ormRepository.findOneOrFail({
      where: { _id: new ObjectId(id) },
    });

    await this.ormRepository.delete(planetExist);

    return {
      planetExist,
      message: `Planet ${planetExist.name} successfully deleted`,
    };
  }
}
