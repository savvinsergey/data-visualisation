import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isModelInstance',
  pure: true,
  standalone: true,
})
export class IsModelInstancePipe implements PipeTransform {
  transform(value: any, model: any): boolean {
    return value instanceof model;
  }
}
