import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { AuthController } from "../controllers/auth.controller";
import { VerifyBearerToken } from "../middlewares/auth.middlewares";

@Module({
    controllers: [AuthController]
})
export class AuthModule implements NestModule {
    
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(VerifyBearerToken).forRoutes({
            path: 'api-alpha/quimera',
            method: RequestMethod.POST
        });
    };

}