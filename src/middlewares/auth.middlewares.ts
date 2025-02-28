import { Injectable, Logger, NestMiddleware, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";

@Injectable()
export class VerifyBearerToken implements NestMiddleware {
    private logger: Logger = new Logger(VerifyBearerToken.name);
    public use(@Req() request: Request, @Res() response: Response, next: () => void) {
        try {
            this.logger.log(`[ VerifyBearerToken ]: Verificando headers`);
            const { authorization } = request.headers;
            if(authorization?.split(" ")[0] === "Bearer"){
                if(atob(authorization?.split(" ")[1].split(".")[0]) === `{"alg":"RS512","typ":"JWT"}`){
                    next();
                } else {
                    response.status(400).json({ message: 'Algoritmo y tipo de token invalido' });
                };
            } else {
                response.status(400).json({ message: 'El formato de envio no es correcto' });
            }
        } catch (error) {
            this.logger.error(`[ VerifyBearerToken ]: Ha ocurrido un error al verificar el token ${error}`);
            response.status(500).json({ message: 'Ha ocurrido un error al verificar el token', error });
            return error;
        };
    };
}
