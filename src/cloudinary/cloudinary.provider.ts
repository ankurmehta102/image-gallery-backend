import { ConfigService } from '@nestjs/config';
import { v2 } from 'cloudinary';
export const CloudinaryProvider = {
  provide: 'cloudinary',
  useFactory: (configService: ConfigService): any => {
    return v2.config({
      cloud_name: configService.get('cloudinary').cloud_name,
      api_key: configService.get('cloudinary').api_key,
      api_secret: configService.get('cloudinary').api_secret,
    });
  },
  inject: [ConfigService],
};
