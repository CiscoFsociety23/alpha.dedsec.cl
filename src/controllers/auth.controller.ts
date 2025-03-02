import { Body, Controller, Logger, Post, Req, Res, UseGuards } from "@nestjs/common";
import { Request, Response } from "express";
import { AuthPayload } from "../interfaces/auth.dto";
import { AuthGuard } from "../guards/auth.guard";
import { AuthService } from "../services/auth.service";

@Controller('api-alpha')
export class AuthController {

    private logger: Logger = new Logger(AuthController.name);
    constructor(private authService: AuthService) {};

    @Post('belerofonte')
    @UseGuards(AuthGuard)
    public async belerofonte(@Req() request: Request, @Res() response: Response, @Body() data: AuthPayload): Promise<void> {
        try {
            this.logger.log(`[ POST ${request.url} ]: Solicitando crear un token de sesión`);
            const token: string = await this.authService.getSessionToken(data);
            response.status(200).json({ message: "Token firmado con exito", data: { ...data, expiresIn: '24 horas' }, token: token });
        } catch (error) {
            this.logger.error(`[ POST ${request.url} ]: Ha ocurrido un error en el firmado del token ${error}`);
            response.status(500).json({ message: "No se ha procesado la generacion del token", error });
        };
    };

    @Post('camelot')
    @UseGuards(AuthGuard)
    public async camelot(@Req() request: Request, @Res() response: Response, @Body() data: AuthPayload): Promise<void> {
        try {
            this.logger.log(`[ POST ${request.url} ]: Solicitando token de validacion`);
            const token: string = await this.authService.getValidationToken(data);
            response.status(200).json({ message: 'Token generado con exito', data: { ...data, expiresIn: '30 minutos' }, token: token });
        } catch (error) {
            this.logger.error(`[ POST ${request.url} ]: Ha ocurrido un error al generar un token de validacion`);
            response.status(500).json({ message: "No se ha procesado la generacion del token", error });
        };
    };

    @Post('quimera')
    public async quimera(@Req() request: Request, @Res() response: Response): Promise<void> {
        try {
            this.logger.log(`[ POST ${request.url} ]: Solicitando verificar un token`);
            const { token } = request.headers;
            const verification: { status: boolean, content: object } = await this.authService.validate(String(token));
            if (verification.status){
                response.status(200).json({ message: "Token verificado con exito", data: verification, token });
            } else {
                response.status(400).json({ message: "Token inválido o expirado", data: verification, token });
            };
        } catch (error) {
            this.logger.error(`[ POST ${request.url} ]: Ha ocurrido un error en el firmado del token ${error}`);
            response.status(500).json({ message: "No se ha procesado la generacion del token", status: false, error });
        };
    };

}
