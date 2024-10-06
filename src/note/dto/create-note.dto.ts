import { ApiProperty } from "@nestjs/swagger"
import { Transform } from "class-transformer"
import { IsArray, IsDate, IsDateString, IsISO8601, IsOptional, IsString, MinLength } from "class-validator"
import { UserDocument } from "src/user/schemas/user.schema"

export class CreateNoteDto {
    @ApiProperty()
    @IsString()
    @MinLength(3)
    name: string

    @ApiProperty()
    @IsString()
    @MinLength(5)
    description: string

    @ApiProperty()
    @IsString()
    @MinLength(3)
    place: string

    @ApiProperty()
    @IsISO8601()
    time: Date

    @ApiProperty()
    @Transform(({ value }) => value.split(','))
    @IsArray()
    @IsString({ each: true})
    tags: string[] = []

    @ApiProperty({ type: 'string', format: 'binary', required: false })
    @IsOptional()
    file?: Express.Multer.File

    user: UserDocument
}