import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class PageValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (value < 1) {
      throw new BadRequestException('Page must be greater than 0');
    }

    return value;
  }
}
