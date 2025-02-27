import { Module } from "@nestjs/common";
import { AlphaController } from "src/controllers/alpha.controller";

@Module({
    controllers: [AlphaController]
})
export class AlphaModule {

}
