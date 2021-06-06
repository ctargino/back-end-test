import { Router, Request, Response } from 'express';

import StatusController from '@shared/controller/StatusController';
import planetRouter from '@modules/planets/infra/http/routes/planet.routes';

const routes = Router();

routes.use('/status', StatusController.status);
routes.use('/planets', planetRouter);

routes.get('/', function (request: Request, response: Response) {
  response.json({
    api: 'bw2test',
    version: '1.0',
    owner: 'c.targino@gmail.com',
  });
});

export default routes;
