import { Logger } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

export class PropertyUtil {

    private logger: Logger = new Logger(PropertyUtil.name);
    private prisma: PrismaClient = new PrismaClient();

    public async getProperty(key: string): Promise<string> {
        try {
            this.logger.log(`[ getProperty() ]: Obteniendo la propiedad ${key}`);
            this.prisma.$connect();
            const [ property ]: { value: string }[] = await this.prisma.property.findMany({
                select: { value: true },
                where: { key: key }
            });
            return property.value;
        } catch (error) {
            this.logger.error(`[ getProperty() ]: Ha ocurrido un error al obtener la propiedad ${error}`);
            return error;
        } finally {
            this.prisma.$disconnect();
        };
    };

}
