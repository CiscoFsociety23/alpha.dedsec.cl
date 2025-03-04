import { Controller, Get, Logger, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { ServiceInformation } from "../interfaces/alpha.interface";
import { AlphaService } from "../services/alpha.service";

@Controller('/api-alpha')
export class AlphaController {

    private logger: Logger = new Logger(AlphaController.name);
    constructor(private alphaService: AlphaService) {};

    @Get()
    public async getInformation(@Req() request: Request, @Res() response: Response): Promise<void> {
        try {
            this.logger.log(`[ GET ${request.url} ]: Se solicita informacion del sistema`);
            const information: ServiceInformation = await this.alphaService.getInformation();
            response.status(200).json(information);
        } catch (error) {
            this.logger.log(`[ GET ${request.url} ]: Ha ocurrido un error al obtener la informacion`);
            response.status(500).json({ Mensaje: 'Ha ocurrido un error al obtener la informacion', Error: error });
        };
    };

}
