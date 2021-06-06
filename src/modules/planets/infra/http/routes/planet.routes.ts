import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import PlanetController from '../controllers/PlanetController';

const planetRouter = Router();
const planetController = new PlanetController();

planetRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      climate: Joi.string().required(),
      terrain: Joi.string().required(),
    },
  }),
  planetController.create,
);

planetRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      id: Joi.string(),
      name: Joi.string(),
      climate: Joi.string(),
      terrain: Joi.string(),
      films: Joi.string(),
    },
  }),
  planetController.all,
);

planetRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  planetController.delete,
);

export default planetRouter;
