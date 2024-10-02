import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Note } from 'src/note/schemas/note.schema';

export type ImageDocument = HydratedDocument<Image>

@Schema()
export class Image {
    @Prop()
    url: string

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Note' })
    note: Note; 
}

export const ImageSchema = SchemaFactory.createForClass(Image)