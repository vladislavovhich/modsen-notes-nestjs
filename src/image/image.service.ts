import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Image, ImageDocument } from './schemas/image.schema';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class ImageService {
    constructor(
        private readonly cloudinaryService: CloudinaryService,

        @InjectModel(Image.name)
        private imageModel: Model<ImageDocument>
    ) {}

    async upload(file: Express.Multer.File) {
        const uploadedImage = await this.cloudinaryService.uploadImage(file)
        const image = new this.imageModel({url: uploadedImage.url})

        await image.save()

        return image
    }
}