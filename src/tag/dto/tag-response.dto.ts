import { PaginationResponseDto } from "src/common/dto/pagination-response.dto";
import { ApiProperty } from "@nestjs/swagger";
import { Tag } from "../schemas/tag.schema";

export class TagResponseDto extends PaginationResponseDto<Tag> {
    @ApiProperty({ type: [Tag]})
    items: Tag[];
}