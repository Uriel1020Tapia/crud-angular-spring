import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { Employee } from '../model/employee';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { GenericValidator } from '../shared/generic-validator';
import { fromEvent, merge, Observable } from 'rxjs';
import { debounceTime } from "rxjs/operators";
import { EmployeeService } from '../services/employee.service';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
import { UtilService } from '../services/util.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent implements OnInit,AfterViewInit  {

    // Access every form input fields in our signup html file
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  employee:Employee = new Employee();
  employeeForm: FormGroup;

  submitted = false;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private genericValidator: GenericValidator;

  constructor(
    private fb: FormBuilder,
    private employeeService:EmployeeService,
    private router:Router,
    private _ngxSpinner: NgxSpinnerService,
    private utilService:UtilService) { 
    this.genericValidator = new GenericValidator();
  }

  ngOnInit(): void {
    this.createForm();
  }


  createForm() {
    this.employeeForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(4),Validators.maxLength(25)]],
      lastName: ['', [Validators.required, Validators.minLength(4),Validators.maxLength(25)]],
      email: ['', [Validators.required, Validators.email]],
      aboutMe:['', [Validators.minLength(4),Validators.maxLength(250)]],
      alias:['', [Validators.minLength(4),Validators.maxLength(100)]]
    });
  }
    // convenience getter for easy access to form fields
  get f() { return this.employeeForm.controls; }

  onSubmit(){
    this.submitted = true;

    // stop here if form is invalid
    if (this.employeeForm.invalid) {
        return;
    }


    console.info('request ==>!' , this.employeeForm.value);

    this._ngxSpinner.show();
    this.employeeService.saveEmployee(this.employeeForm.value)
    .subscribe((resp) =>{
      console.log("response ==>",resp);

      this._ngxSpinner.hide();
      this.goToEmployeeList();
      this.utilService.openSnackBar('Employee Created!', 'success');

    },(error) => {

      this.utilService.openSnackBar('Ups! algo ocurrio', 'error');
      this._ngxSpinner.hide();
      console.log("error ==>",error);
    })
  }

  goToEmployeeList(){
    this.router.navigate(['/employees']);
  }
  onReset() {
    this.submitted = false;
    this.employeeForm.reset();
  }

  ngAfterViewInit(): void {
    // Watch for the blur event from any input element on the form.
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    // Merge the blur event observable with the valueChanges observable
    merge(this.employeeForm.valueChanges, ...controlBlurs)
    .pipe(
      debounceTime(800)
    ).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.employeeForm);
    });
  }
}
