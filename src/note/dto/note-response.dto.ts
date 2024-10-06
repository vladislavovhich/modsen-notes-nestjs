import { PaginationResponseDto } from "src/common/dto/pagination-response.dto";
import { ApiProperty } from "@nestjs/swagger";
import { NoteDto } from "./note.dto";

export class NotesResponseDto extends PaginationResponseDto<NoteDto> {
    @ApiProperty({ type: [NoteDto]})
    items: NoteDto[];
}