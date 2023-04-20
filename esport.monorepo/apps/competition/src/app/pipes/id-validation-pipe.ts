import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class IdValidationPipe implements PipeTransform {
  async transform(value: string) {
    if (!value) {
      throw new BadRequestException('Id is required');
    }

    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException('Id is not valid');
    }

    return value;
  }
}
