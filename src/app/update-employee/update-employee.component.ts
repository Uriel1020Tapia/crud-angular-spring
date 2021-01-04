import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { fromEvent, merge, Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Employee } from '../model/employee';
import { EmployeeService } from '../services/employee.service';
import { UtilService } from '../services/util.service';
import { GenericValidator } from '../shared/generic-validator';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.scss']
})
export class UpdateEmployeeComponent implements OnInit {

      // Access every form input fields in our signup html file
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  employee:Employee;
  employeeForm: FormGroup;
  idEmployeeURL:number;

  submitted = false;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private genericValidator: GenericValidator;

  constructor(
    private fb: FormBuilder,
    private employeeService:EmployeeService,
    private router:Router,
    private route:ActivatedRoute,
    private _ngxSpinner: NgxSpinnerService,
    private utilService:UtilService) { 
    this.genericValidator = new GenericValidator();
  }

  ngOnInit(): void {
    this.createForm();
    this.getEmployeeById();

  }

  getEmployeeById(){

    this.idEmployeeURL = this.route.snapshot.params['id'];
    this.employeeService.getEmployeeById(this.idEmployeeURL)
    .subscribe((resp:Employee) => {
      console.log("Resp",resp);
      this.employee = resp;

      this.employeeForm.patchValue({
        id:this.employee.id,
        firstName: this.employee.firstName,
        lastName: this.employee.lastName,
        email: this.employee.email,
        aboutMe:this.employee.aboutMe,
        alias:this.employee.alias,
        fgStatus:this.employee.fgStatus
       });
    })
  }

  createForm() {
    this.employeeForm = this.fb.group({
      id: ['', [Validators.required]],
      firstName: ['', [Validators.required, Validators.minLength(4),Validators.maxLength(25)]],
      lastName: ['', [Validators.required, Validators.minLength(4),Validators.maxLength(25)]],
      email: ['', [Validators.required, Validators.email]],
      aboutMe:['', [Validators.minLength(4),Validators.maxLength(250)]],
      alias:['', [Validators.minLength(4),Validators.maxLength(100)]],
      fgStatus:[1]
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
    
    this.employeeService.updateEmployee(this.idEmployeeURL,this.employeeForm.value).subscribe((resp) =>{
      
      console.log("response ==>",resp);
      this._ngxSpinner.hide();
      this.utilService.openSnackBar('Actualizado', 'success');
      this.goToEmployeeList();

    },(error) =>{
      console.log("error ==>",error);
      this.utilService.openSnackBar('Ups! algo ocurrio', 'error');
      this._ngxSpinner.hide();
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
