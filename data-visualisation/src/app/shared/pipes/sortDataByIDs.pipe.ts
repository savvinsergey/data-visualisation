import { Pipe, PipeTransform } from '@angular/core';
import { DataModel } from "../models/data.model";

@Pipe({
  name: 'sortDataByIDs',
  pure: true,
  standalone: true,
})
export class SortDataByIDsPipe implements PipeTransform {
  transform(value: DataModel[] | null, additional: string, limit: number = 10): DataModel[] {
    if (!value?.length) {
      return [];
    }

    return this.getDataWithAdditionalIds(value, additional, limit);
  }

  private getDataWithAdditionalIds(data: DataModel[],
                                   additionalIds: string,
                                   limit: number): DataModel[] {
    const additionalItems = this.findAdditionalItems(data, additionalIds, limit);
    const lastItems = data
      .splice((additionalItems.length - 1) - limit);

    return [
      ...additionalItems,
      ...lastItems
    ];
  }

  private findAdditionalItems(data: DataModel[],
                              additionalIds: string,
                              limit: number): DataModel[] {
    return additionalIds
      .trim()
      .split(',', limit)
      .map(id => data.find(item => item.id === Number(id.trim())))
      .filter(Boolean) as DataModel[];
  }
}
