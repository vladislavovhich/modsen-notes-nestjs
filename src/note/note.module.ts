import { Module } from '@nestjs/common';
import { NoteService } from './note.service';
import { NoteController } from './note.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Note, NoteSchema } from './schemas/note.schema';
import { TagModule } from 'src/tag/tag.module';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { ImageModule } from 'src/image/image.module';

@Module({
  controllers: [NoteController],
  providers: [NoteService],
  imports: [
    MongooseModule.forFeature([{ name: Note.name, schema: NoteSchema }]),
    TagModule,
    ImageModule
  ]
})
export class NoteModule {}
