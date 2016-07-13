'use strict'

import express from 'express';
import controller from './factFinancial.controller';
import auth from '../../services/auth/auth.service';

const router = express.Router();

router.get('/', controller.period);
router.get('/:period', controller.period);

export default router;
