# Clean API example

## Introduction

## Problem
Imagine we have a ```ProductController``` class to create a certain ```Product```, to later display it in e.g. a webshop: 

```typescript
class ProductController {
  schemaValidator: SchemaValidator;
  productService: ProductService;
  authService: AuthService;
  pagination: Pagination;

  constructor() {
    this.schemaValidator = new SchemaValidator();
    this.productService = new ProductService();
    this.authService = new AuthService();
    this.pagination = new Pagination();
  }

  public async createProductHandler(req: Request,res: Response): Promise<Response> {
    await this.schemaValidator.validate(createProductSchema, req.body);
    const body: IProductDto = TextUtils.sanitizeObject<IProductDto>(req.body);

    const found = await this.productService.getProduct({ name: body.name });
    if (found) throw new BadRequestError('Product already exists.');

    const user = req.session.userId;
    if (!user) throw new UnauthorizedError();

    const newProduct = await this.productService.createProduct({
      ...(body as IProductDto),
      user,
    });

    return res.status(201).json(newProduct);
  }
}
```

Here we first validate and sanitize the incoming ```Request``` object. Next we check if the product already exists in the database and a ```userId``` is present to finally create the product using a ProductService class.

```typescript
class ProductService {
  public async getProduct(filterQuery: FilterQuery<IProductDto>, options: QueryOptions = {}): Promise<IProductDocument | null> {
      return await ProductModel.findOne(filterQuery, {}, options);
  }

  public async createProduct(productDto: IProductDto): Promise<IProductDocument> {
    const newProduct = await new ProductModel({ ...productDto }).save();

    if (!newProduct) {
      throw new InternalServerError(
        'Something went wrong. Product is not created.'
      );
    }

    return newProduct;
  }
}
```


## Solution

## Get started
