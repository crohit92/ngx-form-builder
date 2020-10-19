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
    userType: {
      type: "control",
      classList: "col-12 col-md-6",
      controlType: NgxFormElementType.Select,
      extras: {
        label: "User Type",
        placeholder: "Select User type"
      },
      options: [
        "Admin",
        "Client"
      ]
    },
    username: {
      type: "control",
      classList: "col-12 col-md-6",
      controlType: NgxFormElementType.Text,
      extras: {
        label: "First name",
        placeholder: "Enter first name"
      }
    },
    password: {
      type: "control",
      classList: "col-12 col-md-6",
      controlType: NgxFormElementType.Text,
      extras: {
        label: "Password",
        placeholder: "Enter password"
      }
    },
    address: {
      type: "group",
      controls: {
        location: {
          classList: "col-12 col-md-6 bg-dark",
          type: "control",
          controlType: NgxFormElementType.Text,
          extras: {
            label: "Location",
            placeholder: "Enter your address"
          }
        },
        postalInfo: {
          type: "group",
          classList: "",
          controls: {
            zipCode: {
              classList: "col-12 col-md-6",
              type: "control",
              controlType: NgxFormElementType.Text,
              extras: {
                label: "Zip code",
                placeholder: "Enter zip code"
              }
            }
          }
        }
      }
    }
  }
  ngAfterViewInit() {
  }
}
