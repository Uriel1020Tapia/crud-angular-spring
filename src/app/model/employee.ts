export class Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  createAt: string;
  fgStatus: boolean;
  alias: string;
  aboutMe: string;
}

export class EmployeePagination {
  totalItems: number;
  totalPages: number;
  employees: Employee[];
  currentPage: number;
}


export class FileDTO {
  filetype: string;
  filename:string;
  filesize: string;
  base64:string;
}