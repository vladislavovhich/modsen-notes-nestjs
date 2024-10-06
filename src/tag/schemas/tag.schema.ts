import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { Note } from 'src/note/schemas/note.schema';

@Schema()
export class Tag {
    @Prop()
    name: string

    @Prop({ type: Types.ObjectId, ref: 'Note' })  
    note: Note; 
}

export type TagDocument = HydratedDocument<Tag>

export const TagSchema = SchemaFactory.createForClass(Tag)