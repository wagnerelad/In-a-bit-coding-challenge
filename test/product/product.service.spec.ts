import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from '../../src/modules/product/product.service';
import { createProductDto, updateProductDto, lowStockProductDto, lessPopularProductDto } from './__mocks__/product.service.mock';

describe('ProductService', () => {
    let service: ProductService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ProductService],
        }).compile();

        service = module.get<ProductService>(ProductService);
    });

    it('should create a product', () => {
        const product = service.create(createProductDto);

        expect(product).toHaveProperty('id');
        expect(product.name).toBe(createProductDto.name);
        expect(product.description).toBe(createProductDto.description);
        expect(product.price).toBe(createProductDto.price);
        expect(product.quantity).toBe(createProductDto.quantity);
        expect(product.sold).toBe(0);
        expect(product.pending_orders).toBe(0);
        expect(product.created_at).toBeDefined();
        expect(product.updated_at).toBeDefined();
    });

    it('should update a product', () => {
        const createdProduct = service.create(createProductDto);

        const updatedProduct = service.update(createdProduct.id, updateProductDto);

        expect(updatedProduct.name).toBe(updateProductDto.name);
        expect(updatedProduct.description).toBe(updateProductDto.description);
        expect(updatedProduct.price).toBe(updateProductDto.price);
        expect(updatedProduct.quantity).toBe(updateProductDto.quantity);
    });

    it('should delete a product', () => {
        const createdProduct = service.create(createProductDto);

        service.delete(createdProduct.id);

        const products = service.findAll({});
        expect(products).not.toContainEqual(createdProduct);
    });

    it('should find all products', () => {
        service.create(createProductDto);

        const products = service.findAll({});

        expect(products.length).toBeGreaterThan(0);
        expect(products.some(product => product.name === createProductDto.name)).toBe(true);
    });

    it('should find low stock products', () => {
        service.create(lowStockProductDto);

        const lowStockProducts = service.findLowStock();
        expect(lowStockProducts.length).toBeGreaterThan(0);
        expect(lowStockProducts.some(product => product.name === lowStockProductDto.name)).toBe(true);
    });

    it('should find popular items', () => {
        const product1 = service.create(createProductDto);
        service.update(product1.id, { sold: 100 });
        service.create(lessPopularProductDto);
        const popularItems = service.findPopularItems();
        expect(popularItems[0].name).toBe(createProductDto.name);
    });
});
