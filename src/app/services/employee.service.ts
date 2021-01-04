import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee, EmployeePagination, FileDTO } from '../model/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseURL ="http://localhost:8080/api/v1/employees"
  private baseURLReport ="http://localhost:8080/api/v1/report"


  constructor(private http:HttpClient) { }

  getEmployeesList():Observable<Employee[]>{
    return this.http.get<Employee[]>(`${this.baseURL}`);
  }
  getEmployeesListPagination(page:number,size:number):Observable<EmployeePagination>{

    page = page == 0? page:page-1;
    let url = `http://localhost:8080/api/v1/misEmployees?page=${page}&size=${size}`;
    console.log(url);
    
    return this.http.get<EmployeePagination>(url);
  }
  saveEmployee(employee:Employee):Observable<Object>{
    return this.http.post(`${this.baseURL}`,employee);
  }
  getEmployeeById(id:number):Observable<Employee>{
    return this.http.get<Employee>(`${this.baseURL}/${id}`);
  }
  updateEmployee(id:number,employee:Employee):Observable<Object>{
    return this.http.put(`${this.baseURL}/${id}`,employee);
  }
  deleteEmployee(id:number):Observable<Object>{
    return this.http.delete(`${this.baseURL}/${id}`)
  }
  exportData(format:string):Observable<FileDTO>{
    return this.http.get<FileDTO>(`${this.baseURLReport}/${format}`);
  }
}
