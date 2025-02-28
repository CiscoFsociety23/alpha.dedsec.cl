import * as jwt from 'jsonwebtoken';
import { Logger } from '@nestjs/common';
import { PropertyUtil } from './property.util';
import { AuthPayload } from 'src/interfaces/auth.dto';

export class JwtUtil {

  private logger: Logger = new Logger(JwtUtil.name);
  private property: PropertyUtil = new PropertyUtil();

  public async sign(payload: AuthPayload, expiresIn: string = '5m'): Promise<string> {
    try {
      this.logger.log(`[ sign() ]: Ejecutando firmado para {${payload.email}, ${payload.profile}} por un tiempo de ${expiresIn}`);
      const key: string = atob(await this.property.getProperty('Private Key'));
      return jwt.sign(payload, key, { algorithm: 'RS512', expiresIn });
    } catch (error) {
      this.logger.error(`[ sign() ]: Ha ocurrido un error al firmar el token ${error}`);
      return error;
    };
  };

  public async verify(token: string): Promise<object> {
    try {
      this.logger.log(`[ verify() ]: Verificando token ${token}`);
      const key: string = atob(await this.property.getProperty('Public Key'));
      return jwt.verify(token, key, { algorithms: ['RS512'] });
    } catch (error) {
      this.logger.error(`[ verify() ]: Token inválido o expirado ${error}`);
      return error;
    };
  };

}
