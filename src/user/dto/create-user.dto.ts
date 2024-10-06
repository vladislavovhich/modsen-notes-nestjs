import { ApiProperty } from "@nestjs/swagger"
import { IsString, MaxLength, Min, MinLength } from "class-validator"

export class CreateUserDto {
    @ApiProperty()
    @IsString()
    @MinLength(3)
    username: string

    @ApiProperty()
    @IsString()
    @MinLength(8)
    @MaxLength(35)
    password: string
}
