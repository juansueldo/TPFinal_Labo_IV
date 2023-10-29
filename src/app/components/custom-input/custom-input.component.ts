import { Component, Input } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss']
})
export class CustomInputComponent {
  @Input() controlName!: string;
  @Input() label!: string;
  @Input() class!: string;
  @Input() type!: string;
  @Input() helpText!: string;
  @Input() errorText!: string;
  @Input() readOnly!: boolean;

  form!: FormGroup;

  constructor(private rootFormGroup: FormGroupDirective) {}

  ngOnInit() {
    this.form = this.rootFormGroup.control;
  }
}
