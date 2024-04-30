// controllers/roshidController.mjs

import Roshid from '../models/roshid.model.js';

export const createRoshid = async (req, res) => {
    try {
        const roshid = new Roshid(req.body);
        await roshid.save();
        res.status(201).json({ message: 'Roshid form submitted successfully!', _id: roshid._id });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getRoshidById = async (req, res) => {
    try {
        const roshid = await Roshid.findById(req.params.id);
        if (!roshid) {
            return res.status(404).json({ message: 'Roshid form not found' });
        }
        res.status(200).json(roshid);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
