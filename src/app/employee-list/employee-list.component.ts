import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Employee, EmployeePagination, FileDTO } from '../model/employee';
import { EmployeeService } from '../services/employee.service';
import { UtilService } from '../services/util.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class EmployeeListComponent implements OnInit {

    
  @ViewChild('searchInput', {static: false})  searchInput: ElementRef; 
 
  employee:Employee = null;
  status:string = '';
  employessList:Employee[];
  idEmployeeURL:number;

  currentPage = 0;
  totalItems = 0;
  pageSize = 3;
  pageSizes = [3, 6, 9];

  searching:boolean = false;

  constructor(private employeeService:EmployeeService,
    private utilService:UtilService,
    private router:Router,
    private _ngxSpinner: NgxSpinnerService,
    config: NgbModalConfig, 
    private modalService: NgbModal) { 
         // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
    }

  ngOnInit(): void {
    this.getEmployeesPagination(this.currentPage,this.pageSize);
  }
  
  getEmployees(){
    this.employeeService.getEmployeesList()
    .subscribe((resp:Employee[]) => {
      this.employessList = resp;

      this.totalItems= resp.length;
    })
  }
  getEmployeesPagination(currentPage:number,pageSize:number){
    this.employeeService.getEmployeesListPagination(currentPage,pageSize)
    .subscribe((resp:EmployeePagination) => {
      // console.log(resp);

      this.currentPage = resp.currentPage > 0? resp.currentPage+1: resp.currentPage;
      this.employessList = resp.employees;
      this.totalItems= resp.totalItems;
    })
  }

  updateEmployee(id:number){
    this.router.navigate(['update-employee',id]);
  }
  
  deleteEmployee(id:number){
  
    this.utilService.openConfirm('¿Seguro?').then(r => {
      // console.log("Resp promise",r);
      if(r){
        this._ngxSpinner.show();
        this.employeeService.deleteEmployee(id).subscribe(resp => {
          // console.log("resp deleteEmployee ==>",resp);
          this._ngxSpinner.hide();
          this.getEmployees();
        })
      }

    }).catch(e => {});
  }

  viewDetails(nameModal:any,employee:Employee){
    console.log("view details",employee);
    this.modalService.open(nameModal,{ size: 'lg',centered: true });

    this.getEmployeeById(employee.id);
  }

  getEmployeeById(id:number){
    this.employeeService.getEmployeeById(id)
    .subscribe((resp:Employee) => {
      console.log("Resp",resp);

      this.status = resp.fgStatus ? 'Activo':'Inactivo'
      this.employee = resp;

    })
  }

  exportToPDF(){
    console.log("Export to PDF...");
    this._ngxSpinner.show();

    this.employeeService.exportData('pdf').subscribe((resp:FileDTO) => {

      console.log("resp report ==> ",resp);
      this._ngxSpinner.hide();
      this.utilService.openSnackBar(this.utilService.convertBase64ToFile(resp.base64,resp.filename,resp.filetype), 'success');

    },(error) => {

      this.utilService.openSnackBar('Ups! algo ocurrio', 'error');
      this._ngxSpinner.hide();
      console.log("error ==>",error);
    })
  }

  handlePageChange(event) {
    console.log("handlePageChange",event);
    this.currentPage = event;
    this.getEmployeesPagination(this.currentPage,this.pageSize);
  }

  handlePageSizeChange(event) {
    console.log("handlePageSizeChange",event);
    
    this.pageSize = event.target.value;
    this.currentPage = 0;
    this.getEmployeesPagination(this.currentPage,this.pageSize);
  }

  onKeypressEvent(event: any){
    console.log(event.target.value);

    let letras =  event.target.value;
    console.log("letras",letras);


    if (letras.length >= 1) {

      this.searching = true;

      this.employeeService.searchEmployee(letras)
      .subscribe((resp:EmployeePagination) => {
        console.log("resp",resp);
        this.currentPage = resp.currentPage > 0? resp.currentPage+1: resp.currentPage;
        this.employessList = resp.employees;
        this.totalItems= resp.totalItems;

        if(this.employessList.length >0){
          this.searching = false;
        }
   
  
      },(error)=> {
        console.log("error:",error);
        this.searching = false;
      })
    } else {

 
      this.searching = false;
      this.getEmployeesPagination(this.currentPage,this.pageSize);
    }



 }

 onChange(event: any) {
  console.log("onChange",event.target.value);
  if(event.target.value.length == 0){
    this.searchInput.nativeElement.value = ""; 
    this.searching = false;
    this.getEmployeesPagination(this.currentPage,this.pageSize);
  }
 
}


}
