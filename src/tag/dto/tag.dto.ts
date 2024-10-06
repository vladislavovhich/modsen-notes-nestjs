import { ApiProperty } from "@nestjs/swagger";
import { TagDocument } from "../schemas/tag.schema";

export class TagDto {
    @ApiProperty()
    id: string

    @ApiProperty()
    name: string

    constructor(tag: TagDocument) {
        this.id = tag.id
        this.name = tag.name
    }
}