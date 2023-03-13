export interface Technician {
  id?: number | string ;
  fullName: string;
  cpf: string;
  email: string;
  password: string;
  profiles: string[];
  createAt: string | Date;
}