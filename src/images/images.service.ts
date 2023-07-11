import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Image } from './entities/image.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { RolesEnum } from '../users/entities/user.entity';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image) private readonly imagesRepo: Repository<Image>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async saveFile(file: any, userId: number) {
    try {
      const response = await this.cloudinaryService.uploadFile(file);
      console.log(response);
      const payload = {
        path: response.secure_url,
        title: file.originalname,
        user: userId,
      };
      return await this.imagesRepo.save(this.imagesRepo.create(payload));
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getFile(imageId: number, userId: number, userRole: string) {
    try {
      const table =
        userRole === RolesEnum.ADMIN
          ? this.imagesRepo
              .createQueryBuilder('images')
              .where('images.id = :imageId', { imageId })
          : this.imagesRepo
              .createQueryBuilder('images')
              .where('images.user = :userId', { userId })
              .andWhere('images.id = :imageId', { imageId });

      const fileInfo = await table.getOne();
      if (!fileInfo) {
        throw new BadRequestException('Image not found.');
      }
      return fileInfo;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
