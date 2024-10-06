import { PaginationResponseDto } from "src/common/dto/pagination-response.dto";
import { ApiProperty } from "@nestjs/swagger";
import { Tag } from "../schemas/tag.schema";
import { TagDto } from "./tag.dto";

export class TagResponseDto extends PaginationResponseDto<TagDto> {
    @ApiProperty({ type: [TagDto]})
    items: TagDto[];
}