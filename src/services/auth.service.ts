import { Injectable, Logger } from "@nestjs/common";
import { AuthPayload } from "../interfaces/auth.dto";
import { JwtUtil } from "../utils/jwt.util";

@Injectable()
export class AuthService {

    private logger: Logger = new Logger(AuthService.name);
    private jwt: JwtUtil = new JwtUtil();

    public async getSessionToken(payload: AuthPayload): Promise<string> {
        try {
            this.logger.log(`[ getSessionToken() ]: Generando un token de sesión para ${payload.email}`);
            const token: string = await this.jwt.sign(payload, '24h');
            return token;
        } catch (error) {
            this.logger.error(`[ getSessionToken() ]: Ha ocurrdo un error al generar el token se sesión ${error}`);
            return error;
        };
    };

    public async getValidationToken(payload: AuthPayload): Promise<string> {
        try {
            this.logger.log(`[ getValidationToken() ]: Generando un token de validacion para ${payload.email}`);
            const token: string = await this.jwt.sign(payload, '30m');
            return token;
        } catch (error) {
            this.logger.error(`[ getValidationToken() ]: Ha ocurrdo un error al generar el token se validacion ${error}`);
            return error;
        };
    };

    public async validate(token: string): Promise<{status: boolean, content: object}> {
        try {
            this.logger.log(`[ validate() ]: Realizando la validacion del token`);
            const verify: {status: boolean, content: object} = await this.jwt.verify(token);
            return verify;
        } catch (error) {
            this.logger.error(`[ validate() ]: Ha ocurrdo un error al verificar el token ${error}`);
            return error;
        };
    };

}
