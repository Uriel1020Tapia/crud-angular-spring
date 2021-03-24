import { Component, ElementRef, forwardRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-f-input-file',
  templateUrl: './f-input-file.component.html',
  styleUrls: ['./f-input-file.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FInputFileComponent),
      multi: true
    }
  ]
})
export class FInputFileComponent implements OnInit, ControlValueAccessor  {

  constructor() {
  }

  @Input() labelTitle: string = 'Seleccionar archivo';
  @Input() extension: string = '';

  @ViewChild('_labelFile', {static: false}) _labelFile: ElementRef;

  onChange = (_: any) => { };
  onTouch = () => { };
  isDisabled: boolean;

  fileSelected:any;

  onFileChange($event) {
    console.log("file .key selected!",$event.target);
    this.onTouch();

    if( $event.target.files.length > 0){

        this.fileSelected = ($event.target as HTMLInputElement).files[0];
        this._labelFile.nativeElement.innerHTML = this.fileSelected.name;
        this.onChange(this.fileSelected);
    }

  }

  //Valor por defecto pasado desde el padre
  writeValue(value: any): void {
    console.log('writeValue');
    if (value) {
      this.fileSelected = value;
    }
    console.log('fileSelected',this.fileSelected);
  }
  //registra cuando hay un cambio 
  registerOnChange(fn: any): void {
    console.log('registerOnChange');
    this.onChange = fn;
  }
    //registra cuando es tocado
  registerOnTouched(fn: any): void {
    console.log('registerOnTouched');
    
    this.onTouch = fn;
  }
  //registra cuando deshablitar el componente
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  ngOnInit(): void {
  }



}
