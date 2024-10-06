import { ApiProperty } from "@nestjs/swagger";
import { ImageDocument } from "../schemas/image.schema";

export class ImageDto {
    @ApiProperty()
    id: string

    @ApiProperty()
    url: string

    constructor(image: ImageDocument) {
        this.id = image._id.toString()
        this.url = image.url
    }
}