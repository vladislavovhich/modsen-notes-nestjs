import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ImageSchema } from './schemas/image.schema';
import { Image } from './schemas/image.schema';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { ImageService } from './image.service';

@Module({
  controllers: [],
  providers: [ImageService],
  imports: [
    MongooseModule.forFeature([{ name: Image.name, schema: ImageSchema }]),
    CloudinaryModule
  ],
  exports: [ImageService]
})

export class ImageModule {}
