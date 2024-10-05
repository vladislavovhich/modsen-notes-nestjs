import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsOptional, IsNotEmpty, IsEnum, IsString, IsArray, ValidateIf, IsISO8601, IsDateString } from "class-validator";
import { PaginationDto } from "src/common/dto/pagination.dto";
import { SortEnum } from "src/common/enums";

export class NotePaginationDto extends PaginationDto {
    @ApiProperty({description: "Name order [asc, desc]", required: false})
    @IsOptional()
    @IsNotEmpty()
    @IsEnum(SortEnum)
    nameOrder: string = "asc"

    @ApiProperty({description: "name filter", required: false})
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    nameFilter: string


    @ApiProperty({description: "Place order [asc, desc]", required: false})
    @IsOptional()
    @IsNotEmpty()
    @IsEnum(SortEnum)
    placeOrder: string = "asc"

    @ApiProperty({description: "Place filter", required: false})
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    placeFilter: string


    @ApiProperty({description: "Time order [asc, desc]", required: false})
    @IsOptional()
    @IsNotEmpty()
    @IsEnum(SortEnum)
    timeOrder: string = "asc"

    @ApiProperty({description: "Time filter", required: false})
    @IsOptional()
    @IsNotEmpty()
    @IsISO8601()
    timeFilter: string
}