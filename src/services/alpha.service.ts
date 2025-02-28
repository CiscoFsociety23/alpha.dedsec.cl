import { Injectable, Logger } from "@nestjs/common";
import { ServiceInformation, Services } from "../interfaces/alpha.interface";
import { PropertyUtil } from "../utils/property.util";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class AlphaService {

    private logger: Logger = new Logger(AlphaService.name);
    private property: PropertyUtil = new PropertyUtil();
    private prisma: PrismaClient = new PrismaClient();
    private serviceList: Array<Services> = new Array();

    public async getInformation(): Promise<ServiceInformation> {
        try {
            this.logger.log(`[ getInformation() ]: Obteniendo informacion del servicio`);
            this.prisma.$connect();
            this.serviceList.splice(0, this.serviceList.length);
            const serverName: string = await this.property.getProperty('Server Name');
            this.logger.log(`[ getInformation() ]: Obteniendo listado de servicios`);
            const services = await this.prisma.serviceStatus.findMany({ select: {
                name: true, status: { select: {
                    name: true
                }}
            }});
            services.forEach(service => {
                this.serviceList.push({ name: service.name, status: service.status.name });
            });
            return { server: serverName, services: this.serviceList };
        } catch (error) {
            this.logger.log(`[ getInformation() ]: Ha ocurrido un error al obtener la informacion ${error}`);
            return error;
        } finally {
            this.prisma.$disconnect();
        };
    };

}
