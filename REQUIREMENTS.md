# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.


## API Endpoints
#### Products
- Index: `'product/' [GET]`
- Show: `'product/:id' [GET]`
- Create (args: Product)[token required]: `'product/' [POST] (token)`
- [OPTIONAL] Top 5 most popular products
- [OPTIONAL] Products by category: `'products/cat/:category' [GET]`
- [ADDED] Delete: `'product/:id  [DELETE]`

#### Users
- Index [token required]: `'/user/index' [GET] (token)`
- Show [token required]: `'/user/show/:id' [GET] (token)`
- Create (args: User)[token required]: `'/user/create' [POST] (token)`
- [ADDED] Delete [token required]: `'/user/delete/:id' [DELETE] (token)`
-auth user `'/user/auth' [post] crate jwt`

#### Orders
- Index [token required]: `/order/index' [GET] (token)`
- Current Order by user [token required]: `'/oreder/user/:id' [GET] (token)`
- [OPTIONAL] Completed Orders by user [token required]: `'orders/completed/:user_id' [GET] (token)`
- [ADDED] Active Orders by user [token required]: `'orders/active/:user_id' [GET] (token)`
- [ADDED] Update order's status [token required]: `'/order/update/:id [PUT] (token)`
- [ADDED] Delete [token required]: `'/order/delete/:id [DELETE] (token)`
## Data Shapes

#### Product
- ID  [PRIMARY KEY]
- ProductName [VARCHAR] 
- Price [integer] 
- Counts [integer]

#### User

- id [PRIMARY KEY]
- UserName [VARCHAR]
- Password [VARCHAR]
- FirstName [VARCHAR]
- LastName [VARCHAR]
- GroupID [integer] 
- Email [VARCHAR]

#### Orders
 - id  [PRIMARY KEY],
  -  user_id [FOREIGN KEY]
   - status [boolen 'active' or 'completa'] 
### order_product
   - quantity integer,
   - order_id  REFERENCES orders(id),
   - product_id  REFERENCES product(id)