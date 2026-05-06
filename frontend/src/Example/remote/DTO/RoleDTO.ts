export interface RoleDTO {
    id: number;
    name: string; // ADMIN | CLIENTE | VENDEDOR
}

export interface RoleCreateDTO {
    name: string;
}

export interface RoleUpdateDTO {
    name: string;
}
