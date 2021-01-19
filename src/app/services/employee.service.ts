import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee, EmployeePagination, FileDTO } from '../model/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseURL ="http://localhost:8080/api/v1";


  constructor(private http:HttpClient) { }

  getEmployeesList():Observable<Employee[]>{
    return this.http.get<Employee[]>(`${this.baseURL}`);
  }
  getEmployeesListPagination(page:number,size:number):Observable<EmployeePagination>{
    page = page == 0? page:page-1;    
    return this.http.get<EmployeePagination>(`${this.baseURL}/misEmployees?page=${page}&size=${size}`);
  }
  saveEmployee(employee:Employee):Observable<Object>{
    return this.http.post(`${this.baseURL}/employees`,employee);
  }
  getEmployeeById(id:number):Observable<Employee>{
    return this.http.get<Employee>(`${this.baseURL}/employees/${id}`);
  }
  updateEmployee(id:number,employee:Employee):Observable<Object>{
    return this.http.put(`${this.baseURL}/employees/${id}`,employee);
  }
  deleteEmployee(id:number):Observable<Object>{
    return this.http.delete(`${this.baseURL}/employees/${id}`)
  }
  exportData(format:string):Observable<FileDTO>{
    return this.http.get<FileDTO>(`${this.baseURL}/report/${format}`);
  }

  searchEmployee(query:string){
    return this.http.get<EmployeePagination>(`${this.baseURL}/misEmployees/search/filter?query=${query}`);
  }
}
