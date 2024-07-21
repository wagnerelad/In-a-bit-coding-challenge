import { IsOptional, IsString, IsNumber, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum SortOrder {
    ASC = 'ASC',
    DESC = 'DESC',
}

export enum SortableFields {
    ID = 'id',
    NAME = 'name',
    DESCRIPTION = 'description',
    PRICE = 'price',
    QUANTITY = 'quantity',
    SOLD = 'sold',
    PENDING_ORDERS = 'pending_orders',
    CREATED_AT = 'created_at',
    UPDATED_AT = 'updated_at',
}

export class FindProductsDto {
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsNumber()
    page?: number;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    limit?: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsNumber()
    pageSize?: number;

    @ApiProperty({ enum: SortableFields, default: SortableFields.CREATED_AT })
    @IsOptional()
    @IsEnum(SortableFields)
    sortBy?: SortableFields;

    @ApiProperty({ enum: SortOrder, default: SortOrder.ASC })
    @IsOptional()
    @IsEnum(SortOrder)
    sortOrder?: SortOrder;
}
