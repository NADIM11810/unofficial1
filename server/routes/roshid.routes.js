// routes/roshidRoutes.js

import express from 'express';
import { createRoshid, getRoshidById } from '../controllers/roshid.controller.js';

const router = express.Router();

// POST request to submit Roshid form
router.post('/', createRoshid);

// GET request to fetch Roshid form by ID
router.get('/:id', getRoshidById);

export default router;
