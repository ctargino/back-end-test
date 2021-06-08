import Planet from '@modules/planets/infra/typeorm/entities/Planet';
import {
  ICreatePlanetDTO,
  IDeletePlanetResponseDTO,
  IListPlanetDTO,
} from '@modules/planets/dtos/IPlanetDTO';

export default interface IPlanetRepository {
  create(data: ICreatePlanetDTO): Promise<Planet>;
  all(param: IListPlanetDTO): Promise<Planet[]>;
  delete(id: string): Promise<IDeletePlanetResponseDTO>;
  findById(id: string): Promise<Planet | undefined>;
}
