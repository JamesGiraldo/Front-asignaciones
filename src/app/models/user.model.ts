import { Curso } from "./curso.model";
import { Role } from "./role.model";

export class Usuario {

    constructor(
        public id:  number,
        public nombre: string,
        public apellido: string,
        public email: string,
        public edad: number,
        public password?: string,
        public roles?: Role[],
        public cursos?: Curso[]
    ) { }

}