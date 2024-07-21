import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FindProductsDto } from './dto/find-products.dto';
import { SortableFields } from './dto/find-products.dto';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';

function isSortableField(field: any): field is SortableFields {
  return [
    'id',
    'name',
    'description',
    'price',
    'quantity',
    'sold',
    'pending_orders',
    'created_at',
    'updated_at'
  ].includes(field);
}

@Injectable()
export class ProductService {
  private products: Product[] = [];
  private LOW_STOCK_THRESHOLD: number = 5;

  constructor() {
    this.loadProducts();
  }

  private loadProducts() {
    const filePath = path.join(__dirname, '../../../products.json');
    if (fs.existsSync(filePath)) {
      this.products = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }
  }

  create(createProductDto: CreateProductDto): Product {
    const { name } = createProductDto;
    if (this.products.some(product => product.name === name)) {
      throw new ConflictException('Product name must be unique');
    }
    const newProduct = { ...createProductDto, id: uuidv4(), created_at: new Date().toISOString(), updated_at: new Date().toISOString(), sold: 0, pending_orders: 0 } as Product;
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: string, updateProductDto: UpdateProductDto): Product {
    const index = this.products.findIndex(product => product.id === id);
    if (index === -1) {
      throw new NotFoundException('Product not found');
    }
    const updatedProduct = { ...this.products[index], ...updateProductDto, updated_at: new Date().toISOString() };
    if (updateProductDto.name && this.products.some(product => product.name === updateProductDto.name && product.id !== id)) {
      throw new ConflictException('Product name must be unique');
    }
    this.products[index] = updatedProduct;

    return updatedProduct;
  }

  delete(id: string): void {
    const index = this.products.findIndex(product => product.id === id);
    if (index === -1) {
      throw new NotFoundException('Product not found');
    }
    if (this.products[index].pending_orders > 0) {
      throw new BadRequestException('Cannot delete product with pending orders');
    }
    this.products.splice(index, 1);
  }

  findAll(query: FindProductsDto): Product[] {
    let products = this.products.filter(
      product => {
        if (query.name && product.name !== query.name) {
          return false;
        }
        if (query.description && !product.description.includes(query.description)) {
          return false;
        }
        return true;
      });
    if (query.sortBy && isSortableField(query.sortBy)) {
      const sortByField = query.sortBy as SortableFields;
      products.sort((a, b) => {
        if (a[sortByField] > b[sortByField]) {
          return query.sortOrder === 'ASC' ? 1 : -1;
        }
        if (a[sortByField] < b[sortByField]) {
          return query.sortOrder === 'ASC' ? -1 : 1;
        }
        return 0;
      });
    }
    const page = query.page || 0;
    const limit = query.limit || 10;
    products = products.slice(page * limit, (page + 1) * limit);
    return products;
  }

  findLowStock(): Product[] {
    return this.products.filter(product => product.quantity < this.LOW_STOCK_THRESHOLD);
  }

  findPopularItems(): Product[] {
    return this.products.sort((a, b) => b.sold - a.sold);
  }
}
