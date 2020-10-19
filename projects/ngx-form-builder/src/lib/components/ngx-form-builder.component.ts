import { Component, ContentChild, EventEmitter, Input, Output, TemplateRef } from "@angular/core";
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { NgxFormElementType, NgxFormSchema } from '../models/ngx-form-schema';

@Component({
  selector: 'ngx-form-builder',
  template: `
    <ng-container *ngIf="group">
        <ng-container [formGroup]="group">
          <ng-container *ngTemplateOutlet="formGroupTemplate;context: {$implicit: schema}"></ng-container>
          <ng-template #formGroupTemplate let-group>
            <ng-container *ngFor="let key of keysOf(group)">
              <ng-container *ngIf="group[key].type === 'control'" [ngSwitch]="group[key].controlType">
                <ng-container *ngSwitchCase="NgxFormElementType.Text">
                  <ng-container *ngTemplateOutlet="textEl||defaultEl;context:{$implicit:group[key]}"></ng-container>
                </ng-container>
                <ng-container *ngSwitchCase="NgxFormElementType.Password">
                  <ng-container *ngTemplateOutlet="passwordEl||defaultEl;context:{$implicit:group[key]}"></ng-container>
                </ng-container>
                <ng-container *ngSwitchCase="NgxFormElementType.Select">
                  <ng-container *ngTemplateOutlet="selectEl||defaultEl;context:{$implicit:group[key]}"></ng-container>
                </ng-container>
              </ng-container>
              <ng-container *ngIf="group[key].type === 'group'">
                <ng-container [formGroup]="group[key].formGroup">
                  <ng-container *ngTemplateOutlet="formGroupTemplate;context: {$implicit: group[key]?.controls}"></ng-container>
                </ng-container>
              </ng-container>
            </ng-container>
          </ng-template>

        </ng-container>
    </ng-container>
    <ng-template #defaultEl></ng-template>
    `
})
export class NgxFormBuilderComponent {
  NgxFormElementType = NgxFormElementType;
  group: FormGroup;
  _schema: NgxFormSchema;

  @Input() set schema(value: NgxFormSchema) {
    if (value) {
      this._schema = value;
      this.group = this.init(value);
      this.schemaParsed.next(this.group);
    }
  }

  get schema(): NgxFormSchema {
    return this._schema;
  }

  @Output() schemaParsed = new EventEmitter<FormGroup>();

  @ContentChild("TextEl", {
    read: TemplateRef
  }) textEl: TemplateRef<any>;
  @ContentChild("PasswordEl", {
    read: TemplateRef
  }) passwordEl: TemplateRef<any>;
  @ContentChild("SelectEl", {
    read: TemplateRef
  }) selectEl: TemplateRef<any>;
  constructor() { }

  init(schema: NgxFormSchema) {
    const rawFormGroup = {};
    for (const key of Object.keys(schema)) {
      if (schema[key].type === "control") {
        const control = new FormControl(schema[key]?.value);
        Object.assign(rawFormGroup, { [key]: control });
        schema[key].formControl = control;
      } else {
        const group = this.init(schema[key].controls);
        Object.assign(rawFormGroup, { [key]: group });
        schema[key].formGroup = group;
      }
      schema[key].name = key;
    }
    return new FormGroup(rawFormGroup);
  }

  keysOf(obj) {
    return Object.keys(obj);
  }

}
