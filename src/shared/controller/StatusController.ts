import { Request, Response } from 'express';

export default {
  async status(request: Request, response: Response) {
    const status = {
      application: true,
    };
    return response.status(200).json(status);
  },
};
