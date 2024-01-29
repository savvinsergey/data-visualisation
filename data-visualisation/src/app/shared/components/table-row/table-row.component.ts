import {ChangeDetectionStrategy, Component, forwardRef, Input} from '@angular/core';
import {IData} from "../../interfaces/data.interface";
import {CommonModule} from "@angular/common";
import {IsColorValuePipe} from "../../pipes/isColorValue.pipe";
import {IsModelInstancePipe} from "../../pipes/isModelInstance.pipe";
import {DataModel} from "../../models/data.model";
import {TableComponent} from "../table/table.component";

@Component({
  selector: 'app-table-row',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    forwardRef(() => TableComponent),
    IsColorValuePipe,
    IsModelInstancePipe
  ],

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableRowComponent {
  @Input({ required: true }) row!: DataModel;
  @Input() names!: (keyof IData)[];
  @Input() withBorder? = false;

  public readonly DataModel = DataModel;
}
