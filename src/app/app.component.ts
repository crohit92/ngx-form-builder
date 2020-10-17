import { AfterViewInit, Component, ViewChild, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgxFormElementType, NgxFormSchema } from "ngx-form-builder";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  registrationForm: FormGroup;
  schema: NgxFormSchema = {
    username: {
      type: "control",
      controlType: NgxFormElementType.Text
    },
    password: {
      type: "control",
      controlType: NgxFormElementType.Text
    },
    address: {
      type: "group",
      controls: {
        location: {
          type: "control",
          controlType: NgxFormElementType.Text
        },
        postalInfo: {
          type: "group",
          controls: {
            zipCode: {
              type: "control",
              controlType: NgxFormElementType.Text
            }
          }
        }
      }
    }
  }
  ngAfterViewInit() {
  }
}
