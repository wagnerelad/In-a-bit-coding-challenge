## Store Inventory Management API

### overview
A store inventory management API that provides a set of RESTful endpoints for managing the inventory of a store. This API allows users to perform various operations on product data, including creating, updating, deleting, and retrieving product information. 

Key features of the API include:

- **Create a Product**: Add new products to the inventory with details such as name, description, price, and quantity.
- **Update a Product**: Modify the details of an existing product, including its name, description, price, and quantity.
- **Delete a Product**: Remove a product from the inventory by its unique ID.
- **List Products**: Retrieve a list of products with support for filtering, sorting, and pagination.
- **Low Stock Products**: Get a list of products that are running low on stock, based on a predefined threshold.
- **Popular Items**: Retrieve a list of popular products sorted by the number of items sold.

This API is designed to help store managers and inventory systems keep track of product details, manage stock levels, and analyze product popularity.

### Endpoints

#### Product Management

* **Create Product**
  * Endpoint: POST /products
  * Request Body:
    ```json
    {
      "name": "New Product",
      "description": "A brand new product",
      "price": 29.99,
      "quantity": 100
    }
    ```
  * Response:
    ```json
    {
      "id": "uuid",
      "name": "New Product",
      "description": "A brand new product",
      "price": 29.99,
      "quantity": 100,
      "sold": 0,
      "pending_orders": 0,
      "created_at": "ISO Date",
      "updated_at": "ISO Date"
    }
    ```
* **Update Product**
  * Endpoint: PUT /products/:id
  * Request Body:
    ```json
    {
      "name": "Updated Product",
      "description": "Updated description",
      "price": 39.99,
      "quantity": 80
    }
    ```
  * Response:
    ```json
    {
      "id": "uuid",
      "name": "Updated Product",
      "description": "Updated description",
      "price": 39.99,
      "quantity": 80,
      "sold": 0,
      "pending_orders": 0,
      "created_at": "ISO Date",
      "updated_at": "ISO Date"
    }
    ```
* **Delete Product**
  * Endpoint: DELETE /products/:id
  * Response:
    ```json
    {
      "message": "Product deleted"
    }
    ```
* **List Products**
  * Endpoint: GET /products
  * Query Parameters:
    * name: Filter products by name
    * description: Filter products by description
    * sortBy: Sort products by a specific field (e.g., created_at)
    * sortOrder: Sort order (ASC or DESC)
    * page: Pagination page number
    * limit: Number of products per page
  * Response:
    ```json
    [
      {
        "id": "uuid",
        "name": "Product Name",
        "description": "Product Description",
        "price": 19.99,
        "quantity": 100,
        "sold": 0,
        "pending_orders": 0,
        "created_at": "ISO Date",
        "updated_at": "ISO Date"
      }
    ]
    ```

#### Product Insights

* **Low Stock Products**
  * Endpoint: GET /products/low-stock
  * Response:
    ```json
    [
      {
        "id": "uuid",
        "name": "Low Stock Product",
        "description": "Description",
        "price": 9.99,
        "quantity": 2,
        "sold": 0,
        "pending_orders": 0,
        "created_at": "ISO Date",
        "updated_at": "ISO Date"
      }
    ]
    ```
* **Popular Items**
  * Endpoint: GET /products/popular
  * Response:
    ```json
    [
      {
        "id": "uuid",
        "name": "Popular Product",
        "description": "Description",
        "price": 49.99,
        "quantity": 100,
        "sold": 500,
        "pending_orders": 0,
        "created_at": "ISO Date",
        "updated_at": "ISO Date"
      }
    ]
    ```
