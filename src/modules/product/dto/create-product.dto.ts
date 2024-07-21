import { IsNotEmpty, IsString, IsNumber, IsOptional, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string = '';

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    description?: string = '';

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    price: number = 0;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    @IsPositive()
    stock: number = 1;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    @IsPositive()
    quantity: number = 1;
}
