import { ApiProperty } from "@nestjs/swagger";
import { ImageDto } from "src/image/dto/image.dto";
import { TagDto } from "src/tag/dto/tag.dto";
import { NoteDocument } from "../schemas/note.schema";
import { Tag, TagDocument } from "src/tag/schemas/tag.schema";
import { ImageDocument } from "src/image/schemas/image.schema";

export class NoteDto {
    @ApiProperty()
    id: string

    @ApiProperty()
    name: string

    @ApiProperty()
    description: string

    @ApiProperty()
    place: string

    @ApiProperty()
    time: Date

    @ApiProperty({type: ImageDto})
    image: ImageDto | null

    @ApiProperty({type: [TagDto]})
    tags: TagDto[]

    constructor(note: NoteDocument) {
        this.id = note._id.toString()
        this.name = note.name
        this.description = note.description
        this.place = note.place
        this.time = note.time
        this.tags = note.tags.map(tag => new TagDto(tag as TagDocument))
        this.image = note.image ? new ImageDto(note.image as ImageDocument) : null
    }
}