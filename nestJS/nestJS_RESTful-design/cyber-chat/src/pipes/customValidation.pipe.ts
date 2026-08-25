import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from "@nestjs/common";

@Injectable()
export class ParseDatePipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata): Date {
    // Tries to transform string in date object.
    const date = new Date(value);

    // If date is valid, date.getTime() returns a number. If date is invalid, it returns NaN and throws BadRequestException.
    if (isNaN(date.getTime())) {
      throw new BadRequestException(`"${value}" is not a valid date.`);
    }
    // Return of valid date object.
    return date;
  }
}
