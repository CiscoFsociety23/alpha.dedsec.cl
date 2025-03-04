import { Module } from "@nestjs/common";
import { AlphaController } from "../controllers/alpha.controller";
import { AlphaService } from "../services/alpha.service";

@Module({
    controllers: [AlphaController],
    providers: [AlphaService]
})
export class AlphaModule {

}
