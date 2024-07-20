import express, { Router } from 'express';

import * as errorController from '@controllers/error';

export const errorRouter: Router = express.Router();

errorRouter.use('/', errorController.get404);