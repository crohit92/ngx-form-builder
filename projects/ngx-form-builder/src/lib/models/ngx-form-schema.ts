import { AsyncValidatorFn, FormArray, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

export class NgxFormSchema {
  [key: string]: {
    type: "control" | "group";
    value?: any;
    options?: any[];
    controlType?: NgxFormElementType;
    controls?: NgxFormSchema;
    classList?: string,
    /**
     * Extra properties available to the control template
     * These extra properties should have control specific
     * UI information. e.g. placeholder, label etc.
     */
    extras?: { [key: string]: any };
    /**
     * Generated Properties
     * These properties are added by ngx-form-builder
     * they are not supposed to be provided as part
     * of schema
     */
    formGroup?: FormGroup;
    formControl?: FormControl;
    name?: string;
  }
}
export enum NgxFormElementType {
  Text = "Text",
  Password = "Password",
  Number = "Number",
  Date = "Date",
  Time = "Time",
  Email = "Email",
  Select = "Select",
  LongText = "LongText",
  Checkbox = "Checkbox",
  Radio = "Radio",
  File = "File"
}
