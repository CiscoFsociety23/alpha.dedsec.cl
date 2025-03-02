import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { AuthController } from "../controllers/auth.controller";
import { VerifyBearerToken } from "../middlewares/auth.middlewares";
import { AuthService } from "src/services/auth.service";

@Module({
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule implements NestModule {
    
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(VerifyBearerToken).forRoutes({
            path: 'api-alpha/quimera',
            method: RequestMethod.POST
        });
    };

}