export type UserRole = "ADMIN" | "CLIENTE" | "VENDEDOR";
export type Genero = "FEMENINO" | "MASCULINO" | "SIN_ESPECIFICAR";

export interface UserCreateDTO {
    run: string;
    nombre: string;
    apellidos: string;
    email: string;
    password: string;
    fechaNacimiento: string;
    direccion: string;
    region: string;
    comuna: string;
    genero: Genero;
    codigoReferido?: string;
    roleIds?: number[];
}

export interface UserDTO {
    id: number;
    run: string;
    nombre: string;
    apellidos: string;
    email: string;
    fechaNacimiento: string;
    direccion: string;
    region: string;
    comuna: string;
    genero: Genero;
    roles: UserRole[];
    puntosLevelUp: number;
    codigoReferido?: string;
}

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    email: string;
    roles: UserRole[];
}

export interface UserUpdateDTO {
    nombre: string;
    apellidos: string;
    email: string;
    direccion: string;
    region: string;
    comuna: string;
    genero: Genero;
    roleIds?: number[];
}