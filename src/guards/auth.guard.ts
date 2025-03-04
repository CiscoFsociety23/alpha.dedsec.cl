import { CanActivate, ExecutionContext, Logger } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Request } from "express";

export class AuthGuard implements CanActivate {
    private logger: Logger = new Logger(AuthGuard.name);
    private prisma = new PrismaClient().$extends(withAccelerate());
    public async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            this.logger.log(`[ AuthGuard() ]: Verificando credenciales de acceso`);
            const request: Request = context.switchToHttp().getRequest() as Request;
            const { user, pass } = request.query;
            if (user != undefined && pass != undefined){
                this.prisma.$connect();
                const dataUser = await this.prisma.users.findFirst({where: {user: String(user)}});
                if(dataUser?.user === user && dataUser?.passwd === pass) {
                    this.logger.log(`[ AuthGuard() ]: Acceso válido ${user}`);
                    return true;
                } else {
                    this.logger.warn(`[ AuthGuard() ]: Usuario o contraseña no válido`);
                    return false;
                };
            } else {
                this.logger.warn(`[ AuthGuard() ]: No se ha ingresado un acceso válido`);
                return false;
            };
        } catch (error) {
            this.logger.log(`[ AuthGuard() ]: Ha ocurrido un error al verificar el usuario ${error}`);
            return false;
        } finally {
            this.prisma.$disconnect();
        };
    };
}
