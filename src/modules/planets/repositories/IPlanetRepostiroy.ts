import Planet from '@modules/planets/infra/typeorm/entities/Planet';
import {
  ICreatePlanetDTO,
  IDeletePlanetResponseDTO,
  IListPlanetDTO,
} from '@modules/planets/dtos/IPlanetDTO';

export default interface IPlanetRepository {
  create(data: ICreatePlanetDTO): Promise<Planet>;
  all(params: IListPlanetDTO): Promise<Planet[]>;
  delete(id: string): Promise<IDeletePlanetResponseDTO>;
}
