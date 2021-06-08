import CreatePlanetService from '@modules/planets/services/planet/CreatePlanetService';
import DeletePlanetService from '@modules/planets/services/planet/DeletePlanetService';
import GetPlanetsService from '@modules/planets/services/planet/GetPlanetsService';
import ListPlanetsService from '@modules/planets/services/planet/ListPlanetsService';
import FindFilmNameByApiService from '@modules/planets/services/sw-api/FindFilmNameByApiService';
import FindPlanetFilmsByAPIService from '@modules/planets/services/sw-api/FindPlanetFilmsByAPIService';

import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class PlanetController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, climate, terrain } = request.body;

    const findPlanet = await FindPlanetFilmsByAPIService({ search: name });

    if (findPlanet.results.length < 1) {
      return response
        .status(404)
        .json({ message: 'This planet does not exist!' });
    }

    const filmsLinks: string[] = [];
    findPlanet.results[0].films.map(film => filmsLinks.push(film));

    const films: string[] = [];
    await Promise.all(
      filmsLinks.map(async film => {
        const getFilm = await FindFilmNameByApiService(film);

        films.push(getFilm.title);
      }),
    );

    const createPlanet = container.resolve(CreatePlanetService);
    const planet = await createPlanet.execute({
      name,
      climate,
      terrain,
      films,
    });

    return response.json(planet);
  }

  public async all(request: Request, response: Response): Promise<Response> {
    const params = request.query;

    const listPlanets = container.resolve(ListPlanetsService);
    const planets = await listPlanets.execute(params);

    if (planets.length == 1) {
      return response.json(planets[0]);
    }

    return response.json(planets);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deletePlanet = container.resolve(DeletePlanetService);
    const planet = await deletePlanet.execute(id);

    return response.json(planet);
  }

  public async get(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const getPlanet = container.resolve(GetPlanetsService);
    const planet = await getPlanet.execute(id);

    return response.json(planet);
  }
}
