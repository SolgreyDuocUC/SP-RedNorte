//Interface de producto

export interface Product {
    id: number;
    name: string;
    slug: string;
    description: string;
    price: number;
    stock: number;
    stockCritico: number;
    category: string;
    imagen: string;
    featured?: boolean | null;
    createdAt?: string;
    updatedAt?: string;
}

//DTO para crear un producto

export interface ProductCreateDTO {
    name: string;
    slug: string;
    description: string;
    price: number;
    stock: number;
    stockCritico: number;
    category: string;
    imagen: string;
    featured?: boolean;
}

export interface ProductUpdateDTO {
    name?: string;
    slug?: string;
    description?: string;
    price?: number;
    stock?: number;
    stockCritico?: number;
    category?: string;
    imagen?: string;
    featured?: boolean | null;
}

export interface ProductCardProduct {
    id: number;
    name: string;
    description: string;
    price: number;
    featured?: boolean | null;
    imagen?: string;
}

export interface ProductCardProps {
    product: ProductCardProduct;
    onAddToCart: () => void;
    onViewDetails: () => void;
}
