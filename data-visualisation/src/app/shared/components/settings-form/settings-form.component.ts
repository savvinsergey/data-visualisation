import {ChangeDetectionStrategy, Component, forwardRef, inject} from '@angular/core';
import {NG_VALUE_ACCESSOR, NonNullableFormBuilder, ReactiveFormsModule} from "@angular/forms";
import {BaseControl} from "../../utils/base-control/base-control";
import {ISettings} from "../../interfaces/settings.interface";

@Component({
  selector: 'app-settings-form',
  templateUrl: './settings-form.component.html',
  styleUrls: ['./settings-form.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SettingsFormComponent),
      multi: true,
    },
  ],
})
export class SettingsFormComponent extends BaseControl<ISettings>{
  private readonly fb = inject(NonNullableFormBuilder);

  // -------------------------- //

  public override form = this.fb.group({
    timer: this.fb.control<number>(300),
    arraySize: this.fb.control<number>(1000),
    additionalArrayIds: this.fb.control<string>('')
  });
}
