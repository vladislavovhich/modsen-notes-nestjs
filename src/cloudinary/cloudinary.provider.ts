import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryConfig } from 'src/config/config.types';

export const CloudinaryProvider = {
  provide: 'CLOUDINARY',
  inject: [ConfigService],

  useFactory: (configService: ConfigService) => {
    const {cloudName, apiKey, apiSecret} = configService.get<CloudinaryConfig>('cloudinary')

    return cloudinary.config({
        cloud_name: cloudName,
        api_key: apiKey,
        api_secret: apiSecret
    });
  },
};