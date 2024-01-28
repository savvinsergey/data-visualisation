import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {IData} from "../interfaces/data.interface";
import {plainToClass} from "class-transformer";
import {DataModel} from "../models/data.model";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private readonly dataSource = new BehaviorSubject<DataModel[]>([])
  public readonly data$ = this.dataSource.asObservable();

  set data(value: IData[]) {
    const convertedValue = value.map(item => {
      item.child = plainToClass(DataModel, item.child);
      return plainToClass(DataModel, item);
    });

    this.dataSource.next(convertedValue);
  }
}
