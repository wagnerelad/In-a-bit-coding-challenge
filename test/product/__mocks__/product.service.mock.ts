import { CreateProductDto } from '../../../src/modules/product/dto/create-product.dto';
import { UpdateProductDto } from '../../../src/modules/product/dto/update-product.dto'

export const createProductDto: CreateProductDto = {
    name: 'Test Product',
    description: 'Test Description',
    price: 20.0,
    quantity: 10,
    stock: 1
};

export const lowStockProductDto: CreateProductDto = {
    name: 'Low Stock Product',
    description: 'Description',
    price: 50.0,
    quantity: 4,
    stock: 1
};

export const lessPopularProductDto: CreateProductDto = {
    name: 'Less Popular Product',
    description: 'Description',
    price: 70.0,
    quantity: 40,
    stock: 1
}

export const updateProductDto: UpdateProductDto = {
    name: 'Updated Product',
    description: 'Updated Description',
    price: 35.0,
    quantity: 5,
};

