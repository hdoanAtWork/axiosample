import * as express from 'express';
import { Request, Response } from 'express';

import worklifeRoutes from './worklife/users';

const router = express.Router();

router.get('/health-check', (req: Request, res: Response) => { res.send('OK')});

// router.use('/level1', worklifeRoutes); 
// router.use('/office', worklifeRoutes);
// router.get('/office', (req: Request, res: Response) => { res.send('/office route is OK')});
router.use('/office', worklifeRoutes); 

export default router;