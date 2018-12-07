import * as express from "express";
import * as dotenv from 'dotenv';
import { UnauthorizedError } from 'express-jwt';
import axios from 'axios';
import * as axiosTypes from 'axios';

export class JwtTokenValidator 
{
    private static validationEndpoint = process.env.JWT_TOKEN_VALIDATION_SVC_URI 
                                        ? process.env.JWT_TOKEN_VALIDATION_SVC_URI
                                        : ''; // 'http://localhost:3000/auth/v1/token/validate';
    
    static async validate(req: express.Request, res: express.Response, next: express.NextFunction) : Promise<void> {
        console.log('****>>>> REQUEST <<<<****');        
        console.log(`basUrl: ${req.baseUrl}`);
        console.log(`url: ${req.url}`);
        console.log(`originalUrl: ${req.originalUrl}`);
        let token = '';
        if (req.headers && req.headers.authorization) {
            const parts = req.headers.authorization.split(' ');
            if (parts.length === 2) {
                const scheme = parts[0];
                const credentials = parts[1];

                if (scheme && scheme.toLowerCase() === 'bearer')
                    token = credentials;
                else {
                    // 
                    // return next(new UnauthorizedError('credentials_bad_scheme', { message: 'Invalid bearer format'}));
                    res.status(400).send('Invalid bearer format');      
                    return;              
                }
            }
            else {
                // return next(new UnauthorizedError('credentials_bad_scheme', { message: 'Invalid bearer format'}));
                res.sendStatus(400).send('Invalid bearer format');                                    
                return;
            }
        }
    

        if (!token) {
            console.log('Token not found LINE 31' );
            res.sendStatus(400).send('Bearer token is mssing');
            return;
        }

        // console.log(token);

        /*
        axios({
            method: 'post',
            url: 'http://localhost:3000/auth/v1/token/validate',
            data: {
                token
            },
            timeout: 1000,
            headers: { 'content-type': 'application/json'},
        }).then((response: axiosTypes.AxiosResponse) => {
            if (response.data.valid) {
                console.log('GOOD');
            } else {
                console.log('BAD');
                next(new UnauthorizedError('invalid_token', response.data.error));
            }
        }).catch((error: axiosTypes.AxiosError) => {
            if (error.code === 'ECONNREFUSED' || error.code === 'ECONNABORTED') {
                next(new Error('Internal Error: Could not reach authentication service.'));
            } else {
                next(new UnauthorizedError('invalid_token', error));
            }
        });
        */
        const SVC = process.env.JWT_TOKEN_VALIDATION_SVC_URI 
                    ? process.env.JWT_TOKEN_VALIDATION_SVC_URI
                    : '';         
        console.log('JWT URI');
        console.log(process.env.JWT_TOKEN_VALIDATION_SVC_URI);
                                
        // POST Request
        await axios.post(
            'https://auth-production.herokuapp.com/auth/v1/token/validate', // 'http://localhost:3000/auth/v1/token/validate',
            { authorization: `bearer ${token}`},
            { timeout: 3000, 
              headers: { 'Content-type': 'application/json'}
            }
        ).then((authResponse) => {
            console.log(`Is it OK? ${authResponse.data.isOk}`);
            console.log(authResponse.data);
            console.log(`decoded: ${authResponse.data.decoded}`);
            // res.sendStatus(401);
            if (authResponse.data.isOk === false) {
                console.log(authResponse.data);
                // res.sendStatus(response.data.httpCode).send(response.data.error);
                if (authResponse.data.httpCode && authResponse.data.httpCode >= 500)
                    next(new Error(authResponse.data.error));
                else {
                    res.status(authResponse.data.httpCode).send(authResponse.data.error.message);
                    return;
                }
                // next(new Error(`INVALID DAMN IT! ${response.data.error}`));
            }
            // console.log(authResponse.data.decoded);
            //console.log(authResponse.data.decoded.apps);
            const appx = authResponse.data.decoded.apps;
            console.log(appx);
            for (let i in appx) {
                let { name, appRoute } = appx[i];
                console.log(name);
                console.log(appRoute);                               
            }
            res.locals.apps = appx;
            
            next();
        }).catch((error) => {                        
            console.log(`Error Happened: ${error}`);
            next (error);
        })        
    }
}