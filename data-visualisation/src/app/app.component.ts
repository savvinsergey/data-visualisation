import {ChangeDetectionStrategy, Component, DestroyRef, inject} from '@angular/core';
import {NonNullableFormBuilder} from "@angular/forms";
import {ISettings} from "./shared/interfaces/settings.interface";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {DataService} from "./shared/services/data.service";
import {first} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly destroyRef = inject(DestroyRef);
  private readonly dataService = inject(DataService);

  // -------------------- //

  public readonly settingsControl = this.fb.control<ISettings>({} as ISettings)
  public readonly data$ = this.dataService.data$;

  get additionalIds() {
    return this.settingsControl.value.additionalArrayIds;
  }

  constructor() {
    if (typeof Worker !== 'undefined') {
      const worker = new Worker(new URL('./app.worker', import.meta.url));
      worker.onmessage = ({ data }) => this.dataService.data = data;
      this.initSettingsChanges(worker)
    } else {
      console.error("Web workers aren't supported");
    }
  }

  private initSettingsChanges(worker: Worker) {
    this.settingsControl.valueChanges.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((settings: ISettings) =>
      worker.postMessage(settings)
    )
  }
}
