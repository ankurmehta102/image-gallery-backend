import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ImageValidationPipe implements PipeTransform {
  transform(value: any) {
    const validImageType = ['image/jpeg', 'image/png'];
    if (!validImageType.includes(value.mimetype)) {
      throw new BadRequestException('Image format is not support.');
    }
    return value;
  }
}
