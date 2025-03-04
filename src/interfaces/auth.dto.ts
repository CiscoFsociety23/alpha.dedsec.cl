import { IsEmail, IsString } from "class-validator";

export class AuthPayload {

    @IsEmail()
    public email: string;

    @IsString()
    public profile: string;

}
