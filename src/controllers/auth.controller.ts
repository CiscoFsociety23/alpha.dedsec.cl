import { Body, Controller, Logger, Post, Query, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { JwtUtil } from "../utils/jwt.util";
import { AuthPayload } from "../interfaces/auth.dto";

@Controller('api-alpha')
export class AuthController {

    private logger: Logger = new Logger(AuthController.name);
    private jwt: JwtUtil = new JwtUtil();

    @Post('belerofonte')
    public async belerofonte(@Req() request: Request, @Res() response: Response, @Body() data: AuthPayload): Promise<void> {
        try {
            this.logger.log(`[ POST ${request.url} ]: Solicitando crear un token`);
            const token: string = await this.jwt.sign(data, '24h');
            response.status(200).json({ message: "Token firmado con exito", data: { ...data, expiresIn: '24 horas' }, token: token });
        } catch (error) {
            this.logger.error(`[ POST ${request.url} ]: Ha ocurrido un error en el firmado del token ${error}`);
            response.status(500).json({ message: "No se ha procesado la generacion del token", error });
        };
    };

    @Post('quimera')
    public async quimera(@Req() request: Request, @Res() response: Response): Promise<void> {
        try {
            this.logger.log(`[ POST ${request.url} ]: Solicitando verificar un token`);
            response.status(200).json({ message: "Token verificado con exito", status: true });
        } catch (error) {
            this.logger.error(`[ POST ${request.url} ]: Ha ocurrido un error en el firmado del token ${error}`);
            response.status(500).json({ message: "No se ha procesado la generacion del token", status: false, error });
        };
    };

}
