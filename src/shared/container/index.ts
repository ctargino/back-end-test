import PlanetRespository from '@modules/planets/infra/typeorm/repositories/PlanetRepository';
import IPlanetRepository from '@modules/planets/repositories/IPlanetRepostiroy';
import { container } from 'tsyringe';

container.registerSingleton<IPlanetRepository>(
  'PlanetRepository',
  PlanetRespository,
);
