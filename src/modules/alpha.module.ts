import { Module } from "@nestjs/common";
import { AlphaController } from "../controllers/alpha.controller";

@Module({
    controllers: [AlphaController]
})
export class AlphaModule {

}
