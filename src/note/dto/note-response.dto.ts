import { PaginationResponseDto } from "src/common/dto/pagination-response.dto";
import { ApiProperty } from "@nestjs/swagger";
import { Note } from "../schemas/note.schema";

export class NotesResponseDto extends PaginationResponseDto<Note> {
    @ApiProperty({ type: [Note]})
    items: Note[];
}