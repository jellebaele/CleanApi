# Clean API example

## Introduction
Based on https://khalilstemmler.com/articles/typescript-domain-driven-design/ddd-vs-crud-design/

## Problem
Imagine we have a ```ProductController``` class to create a certain ```Product```, to later display it in e.g. a webshop: 

```typescript
class ProductController {
  schemaValidator: SchemaValidator;
  productService: ProductService;

  constructor() {
    this.schemaValidator = new SchemaValidator();
    this.productService = new ProductService();
  }

  public async createProductHandler(req: Request,res: Response): Promise<Response> {
    await this.schemaValidator.validate(createProductSchema, req.body);
    const body: IProductDto = TextUtils.sanitizeObject<IProductDto>(req.body);

    const found = await this.productService.getProduct({ name: body.name });
    if (found) throw new BadRequestError('Product already exists.');

    const user = req.session.userId;
    if (!user) throw new UnauthorizedError();

    const newProduct = await this.productService.createProduct({
      ...body,
      user,
    });

    return res.status(201).json(newProduct);
  }
}
```

Here we first validate and sanitize the incoming ```Request``` object. Next we check if the product already exists in the database and a ```userId``` is present to finally create the product using a ```ProductService``` class:

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

If we now want to add the functionality to categorize products, we can add a ```Category``` object. The ```Category``` model also keeps track of the user who created it.
We can easily implement this using the following code:
```typescript
...
public async createProductHandler(
    req: Request,
    res: Response
  ): Promise<Response> {
    await this.schemaValidator.validate(createProductSchema, req.body);
    const body: IProductDto = TextUtils.sanitizeObject<IProductDto>(req.body);

    // Make sure the property 'userId' is not empty
    const user = req.session.userId;
    if (!user) throw new UnauthorizedError();

    const category = await this.categoryService.getCategory({name: body.category});
    if (!category) await this.categoryService.createCategory({name: body.category, userId: user});

    const found = await this.productService.getProduct({ name: body.name });
    if (found) throw new BadRequestError('Product already exists.');

    const newProduct = await this.productService.createProduct({
      ...body,
      user,
    });

    return res.json(newProduct);
  }
}
...
```

Let's say we now want to make sure a user can only add three categories:
```typescript
...
public async createProductHandler(
    req: Request,
    res: Response
  ): Promise<Response> {
    await this.schemaValidator.validate(createProductSchema, req.body);
    const body: IProductDto = TextUtils.sanitizeObject<IProductDto>(req.body);

    // Make sure the property 'userId' is not empty
    const user = req.session.userId;
    if (!user) throw new UnauthorizedError();

    const category = await this.categoryService.getCategory({name: body.category});
    if (!category) {
        const categoriesForUser = await this.categoryService.getCategoryByUserId(user);

        if (categoriesForUser.length >= 3)
            throw new UnauthorizedError("You cannot create more than three categories");

        await this.categoryService.createCategory({name: body.category, userId: user});
    }

    const found = await this.productService.getProduct({ name: body.name });
    if (found) throw new BadRequestError('Product already exists.');

    const newProduct = await this.productService.createProduct({
      ...body,
      user,
    });

    return res.json(newProduct);
  }
}
...
```

This works, but a few problems can arise:
- When adding some more features and this piece of code can get hard to read, debug, test,... Also when looking at this code, it is not immediately clear what exactly is happening.
- There is a lack of encapsulation. The logic lives in a place where shouldn't be. This can lead to bugs when adding some more features elsewhere, as this business logic might be circumvented. Moving this code to the services is possible, but this will not solve the problem as you can still add this logic straight-away in the controller.
- If we would choose to make our application available not only via HTTP-requests, but via e.g. a desktop application, a lot of refactoring is needed as the business logic is located in the controller.

## Solution

## Get started
