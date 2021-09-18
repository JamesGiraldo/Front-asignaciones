import { Role } from "../models/role.model";

export interface PerfilUpdate {

    nombre: string;
    apellido: string;
    email: string;
    edad: number;
    password: string;
    password2: string;
    terminos: boolean;
    roles?: Role[]

}