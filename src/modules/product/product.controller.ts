import { Controller, Get, Post, Put, Delete, Body, Query, Param, HttpException, HttpStatus } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FindProductsDto } from './dto/find-products.dto';

@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Post()
    async create(@Body() createProductDto: CreateProductDto) {
        try {
            return await this.productService.create(createProductDto);
        } catch (error) {
            return this.handleException(error);
        }
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
        try {
            return await this.productService.update(id, updateProductDto);
        } catch (error) {
            return this.handleException(error);
        }
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        try {
            await this.productService.delete(id);
            return { message: 'Product deleted' };
        } catch (error) {
            return this.handleException(error);
        }
    }

    @Get()
    async findAll(@Query() query: FindProductsDto) {
        try {
            return await this.productService.findAll(query);
        } catch (error) {
            return this.handleException(error);
        }
    }

    @Get('low-stock')
    async findLowStock() {
        try {
            return await this.productService.findLowStock();
        } catch (error) {
            return this.handleException(error);
        }
    }

    @Get('popular')
    async findPopularItems() {
        try {
            return await this.productService.findPopularItems();
        } catch (error) {
            return this.handleException(error);
        }
    }

    private handleException(error: any) {
        if (error.response) {
            // If the error is an instance of HttpException
            return {
                statusCode: error.getStatus(),
                message: error.response,
            };
        } else {
            // Generic error handling
            return {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: error.message || 'Internal server error',
            };
        }
    }
}
