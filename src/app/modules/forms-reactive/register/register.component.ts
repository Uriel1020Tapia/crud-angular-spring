import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
export function requiredFileType( type: string ) {
  return function (control: FormControl) {
    const file = control.value;
    if ( file ) {
      console.log("file validation ",file);
      const extension = file.name.split('.')[1].toLowerCase();
      if ( type.toLowerCase() !== extension.toLowerCase() ) {
         control.setValue('');
        return { extensionNotValid: true};
      }
      
      return null;
    }
   
    return null;
  };
}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm:FormGroup;
  @ViewChild('_labelKey', {static: false}) _labelKey: ElementRef;
  
  constructor(
    private fb: FormBuilder,
  ) {
    this.registerForm = this.fb.group({
      text1:  [null,{disabled: true}, [Validators.required]],
      text2:  new FormControl({value: '', disabled: false}, [ Validators.required]),
      file:  new FormControl({value: '', disabled: false}, [Validators.required, requiredFileType('key')]),
      file2:  new FormControl({value: '', disabled: false}, [Validators.required, requiredFileType('cer')]),
    });
    this.registerForm.get('file').valueChanges.subscribe(value => {
      console.log("file.valueChanges ==>",value);
    });
   }

  ngOnInit(): void {

  }
  get fm(){
    return this.registerForm.controls;
  }

  get CFile(): AbstractControl{
    return this.registerForm.get('file');
  }
  get CFile2(): AbstractControl{
    return this.registerForm.get('file2');
  }

  onSave(){
    if(!this.registerForm.valid ){
      return;
    }
    console.log("form value ==>",this.registerForm.value);
  }
}
