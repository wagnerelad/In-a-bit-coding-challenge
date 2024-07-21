import { IsOptional, IsString, IsNumber, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto {
    @ApiProperty()
    @IsOptional()
    @IsString()
    name?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    @IsPositive()
    price?: number;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    @IsPositive()
    stock?: number;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    @IsPositive()
    quantity?: number;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    @IsPositive()
    sold?: number;
}
