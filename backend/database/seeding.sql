
INSERT INTO `SUPPLIER_ADMIN`(`Username`, `Password`)
VALUES ('ccpoe9','12345');
INSERT INTO `STORES` (`Name`,`Address`,`StoreLogo`,`SupplierAdmin`)
VALUES ('Walmart', '123 Monroe St','https://logos-world.net/wp-content/uploads/2021/11/Walmart-Logo-700x394.png', 1);
INSERT INTO `PRODUCTS`(`Name`,`Price`,`ExpireDate`,`Type`, `Description`,`Image`,`StoreID`)
VALUES ('Jif Peanut Butter, Creamy',3.99,'2023-05-20','Snacks', 'Description', 'https://www.instacart.com/assets/domains/product-image/file/large_fd13505e-f3a0-4ec4-9753-e9458b05a169.jpg', 1);
