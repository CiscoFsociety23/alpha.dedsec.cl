import { Controller, Get, Logger, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";

@Controller('/api-alpha')
export class AlphaController {

    private logger: Logger = new Logger(AlphaController.name);

    @Get()
    public getInformation(@Req() request: Request, @Res() response: Response): void {
        response.status(200).json({ server: "Dedsec Alpha" });
    };

}