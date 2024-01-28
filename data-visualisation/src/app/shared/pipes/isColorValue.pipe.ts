import { Pipe, PipeTransform } from '@angular/core';
// @ts-ignore
import { isColor } from 'is-color-stop';

@Pipe({
  name: 'isColorValue',
  pure: true,
  standalone: true,
})
export class IsColorValuePipe implements PipeTransform {
  transform(value: any): string {
    return isColor(value) ? value : '';
  }
}
