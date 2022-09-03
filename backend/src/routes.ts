import { Router, Request, Response } from 'express';

const router = Router();

router.get('/teste', (req: Request, res: Response) => {
    //throw new Error('Error while making this request');
    return res.json({ name: 'Sujeito Pizza' });
});

export { router };