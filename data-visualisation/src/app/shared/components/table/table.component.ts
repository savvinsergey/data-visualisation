import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {IData} from "../../interfaces/data.interface";
import {CommonModule} from "@angular/common";
import {IsColorValuePipe} from "../../pipes/isColorValue.pipe";
import {IsModelInstancePipe} from "../../pipes/isModelInstance.pipe";
import {DataModel} from "../../models/data.model";
import {TableRowComponent} from "../table-row/table-row.component";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    TableRowComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
  @Input({ required: true }) data: DataModel[] | null = [];
  @Input() withBorder? = true;

  get names() {
    return Object.keys(this.data?.[0] || []) as (keyof IData)[];
  }

  public trackById(index: number, item: DataModel) {
    return item.id
  }
}
