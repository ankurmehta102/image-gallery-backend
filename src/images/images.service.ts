import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Image } from './entities/image.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'express';
import { join } from 'path';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image) private readonly imagesRepo: Repository<Image>,
  ) {}

  async saveFile(file: any, userId: number) {
    try {
      const payload = {
        path: file.path,
        title: file.originalname,
        user: userId,
      };
      return await this.imagesRepo.save(this.imagesRepo.create(payload));
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getFile(imageId: number) {
    try {
      const fileInfo = await this.imagesRepo.findOneBy({ id: imageId });
      if (!fileInfo) {
        throw new BadRequestException('Image not found.');
      }
      const filePath = fileInfo.path;
      return join(__dirname, '..', '..', filePath);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
