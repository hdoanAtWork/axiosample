import { Request, Response } from 'express';
import * as express from 'express';
import { JwtTokenValidator } from '../../JwtTokenValidator';

const router = express.Router();

router.get('/health-check', JwtTokenValidator.validate, (req: Request, res: Response) => res.send('Validattion SUCCEEDED!!!'));
router.get('/testFail', JwtTokenValidator.validate, (req: Request, res: Response) => {
    let testResult = false;
    let hasProperAppRoute = false;
    if (res.locals.apps) {
        console.log('>>>>> LOCAL VAR <<<<<');
        for (let i in res.locals.apps) {
            let { name, appRoute } = res.locals.apps[i];
            console.log(name);
            console.log(appRoute);     
            console.log(req.baseUrl);                          
            if (req.baseUrl.includes(appRoute)) {                
                hasProperAppRoute = true;
                break;
            }
        }
        // console.log(res.locals.apps);
    }
    if (hasProperAppRoute)  
        res.send('Test SUCCEEDED!!!');
    else 
        res.status(403).send('Access to App not allowed due to bad app route!!!!');
});
router.get('/worklife', JwtTokenValidator.validate, (req: Request, res: Response) => {
    let testResult = false;
    let hasProperAppRoute = false;
    if (res.locals.apps) {
        console.log('>>>>> LOCAL VAR <<<<<');
        for (let i in res.locals.apps) {
            let { name, appRoute } = res.locals.apps[i];
            // console.log(name);
            // console.log(appRoute);     
            // console.log(`url: ${req.url}`);                          
            // console.log(`base url: ${req.baseUrl}`);                          
            // console.log(`original url: ${req.originalUrl}`);   
            if (req.originalUrl.toLowerCase().includes(appRoute.toLowerCase())) {                
                hasProperAppRoute = true;
                break;
            }
        }
        // console.log(res.locals.apps);
    }
    if (hasProperAppRoute)  
        res.send('Test SUCCEEDED!!!');
    else 
        res.status(403).send('Access to App not allowed due to bad app route!!!!');
});

export default router;