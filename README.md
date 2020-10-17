# Form Builder
 
This library is supposed to create dynamic forms in angular application

## Scope

A dynamic form has to have a schema. The schema of the form builder is derived from the FormBuilder Class in angular

Form can have three different type of elements

* FormArray
* FormGroup
* FormControl

These elements are similar to their angular counterparts.

FormControl is the lowest element in the schema. It represents the html elements in the form. 

The form has to have a top level FormGroup. A FormGroup can have FormControl/FormGroup/FormArray as its children. A FormArray can have FormGroup or FormControl as its children.

Following are the types of form controls available

```ts
export enum FormElementType {
    Text,
    Number,
    Date,
    Time,
    Email,
    Select,
    LongText,
    Checkbox,
    Radio,
    File
}
```

The library should give the following control to the developer

* Ability to add event listeners on controls and react to those events
* Ability to access dom elements representing the controls, so that dev can set properties on the dom element or call methods exposed from the component
* Ability to access underlying FormControl instance so that value changes can be subscribed and new values can be set.

## Advanced features

This library should be able to work with a UI framework, composed of different Components

* There should be provision to specify the class name to be used against element type, so that custom controls can be used as required.