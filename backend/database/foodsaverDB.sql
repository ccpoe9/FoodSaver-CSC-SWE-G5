ALTER USER 'root'@'localhost' IDENTIFIED BY 'T:niuchaYL!2395'; 
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'T:niuchaYL!2395';
DROP DATABASE IF EXISTS foodsaver;
CREATE DATABASE foodsaver;

USE foodsaver;
--
-- Table structure for table `CUSTOMERS`
--
-- DROP TABLE IF EXISTS `CUSTOMERS`;
CREATE TABLE `CUSTOMERS` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Username` varchar(50) NOT NULL UNIQUE,
  `Password` varchar(50) NOT NULL,
  `Email` varchar(70) DEFAULT NULL,
  `Phone` varchar(20) DEFAULT NULL,
  
  `Address` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`)
);

--
-- Table structure for table `SUPPLIER_ADMIN`
--
-- DROP TABLE IF EXISTS `SUPPLIER_ADMIN`;
CREATE TABLE `SUPPLIER_ADMIN` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Username` varchar(30) NOT NULL UNIQUE,
  `Password` varchar(50) NOT NULL,
  PRIMARY KEY (`ID`)
);

--
-- Table structure for table `STORES`
--
-- DROP TABLE IF EXISTS `STORES`;
CREATE TABLE `STORES` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(30) DEFAULT NULL UNIQUE,
  `Address` varchar(100) DEFAULT NULL UNIQUE,
  `StoreLogo` varchar(400) DEFAULT NULL,
  `SupplierAdmin` int DEFAULT NULL,
  PRIMARY KEY (`ID`),
  CONSTRAINT `fk_supp_admin` FOREIGN KEY (`SupplierAdmin`) REFERENCES `SUPPLIER_ADMIN` (`ID`)
);

--
-- Table structure for table `SHOPPING_SESSION`
--
-- DROP TABLE IF EXISTS `SHOPPING_SESSION`;
CREATE TABLE `SHOPPING_SESSION` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `CtmID` int NOT NULL,
  `StoreID` int NOT NULL,
  `CartCount` int DEFAULT 0,
  `Total` DECIMAL(7,2) DEFAULT 0,
  PRIMARY KEY (`ID`),
  CONSTRAINT `shopping_session_ibfk_1` FOREIGN KEY (`CtmID`) REFERENCES `CUSTOMERS` (`ID`),
  CONSTRAINT `shopping_session_ibfk_2` FOREIGN KEY (`StoreID`) REFERENCES `STORES` (`ID`)
);

--
-- Table structure for table `PRODUCTS`
--
-- DROP TABLE IF EXISTS `PRODUCTS`;
CREATE TABLE `PRODUCTS` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(80) DEFAULT NULL,
  `Price` decimal(7,2) DEFAULT NULL,
  `ExpireDate` date DEFAULT NULL,
  `Type` varchar(30) DEFAULT NULL,
  `Description` varchar(300) DEFAULT NULL,
  `Image` varchar(400) DEFAULT NULL,
  `Quantity` INT DEFAULT 0,
  `StoreID` int DEFAULT NULL,
  PRIMARY KEY (`ID`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`StoreID`) REFERENCES `STORES` (`ID`)
);
--
-- Table structure for table `FAVORITES`
--
-- DROP TABLE IF EXISTS `FAVORITES`;
CREATE TABLE `FAVORITES` (
  `ProductID` int NOT NULL,
  `CtmID` int NOT NULL,
  PRIMARY KEY (`ProductID`, `CtmID`),
  CONSTRAINT `favorites_ibfk_1` FOREIGN KEY (`ProductID`) REFERENCES `PRODUCTS` (`ID`),
  CONSTRAINT `favorites_ibfk_2` FOREIGN KEY (`CtmID`) REFERENCES `CUSTOMERS` (`ID`)
);

--
-- Table structure for table `ORDERS`
--
-- DROP TABLE IF EXISTS `ORDERS`;
CREATE TABLE `ORDERS` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `NumberOfItems` int DEFAULT NULL,
  `OrderPrice` decimal(7,2) DEFAULT NULL,
  `OrderStatus` varchar(20) DEFAULT NULL,
  `DeliveryDate` date DEFAULT NULL,
  `StoreID` int DEFAULT NULL,
  `CtmID` int DEFAULT NULL,
  `SessionID` int DEFAULT NULL,
  PRIMARY KEY (`ID`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`StoreID`) REFERENCES `STORES` (`ID`),
  CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`CtmID`) REFERENCES `CUSTOMERS` (`ID`)
);

--
-- Table structure for table `ORDERED`
--
-- DROP TABLE IF EXISTS `ORDERED`;
CREATE TABLE `ORDERED` (
  `ProductID` int NOT NULL,
  `OrderID` int DEFAULT NULL,
  CONSTRAINT `fk_order_id` FOREIGN KEY (`OrderID`) REFERENCES `ORDERS` (`ID`),
  CONSTRAINT `fk_prod_id` FOREIGN KEY (`ProductID`) REFERENCES `PRODUCTS` (`ID`)
);

--
-- Table structure for table `CART_ITEM`
--
-- DROP TABLE IF EXISTS `CART_ITEM`;
CREATE TABLE `CART_ITEM` (
  `ProductID` int DEFAULT NULL,
  `SessionID` int DEFAULT NULL,
  `CtmID` int DEFAULT NULL,
  `Count` int DEFAULT 1,
  CONSTRAINT `cart_item_ibfk_1` FOREIGN KEY (`ProductID`) REFERENCES `PRODUCTS` (`ID`),
  CONSTRAINT `cart_item_ibfk_2` FOREIGN KEY (`SessionID`) REFERENCES `SHOPPING_SESSION` (`ID`) ON DELETE CASCADE,
  CONSTRAINT `cart_item_ibfk_3` FOREIGN KEY (`CtmID`) REFERENCES `CUSTOMERS` (`ID`)
);

--
-- Table structure for table `REPORTS`
--
-- DROP TABLE IF EXISTS `REPORTS`;
CREATE TABLE `REPORTS` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `ReportTitle` varchar(200) DEFAULT NULL,
  `ReportDesc` varchar(1000) DEFAULT NULL,
  `ReportCreated` date DEFAULT NULL,
  `CtmID` int DEFAULT NULL,
  `StoreID` int DEFAULT NULL,
  PRIMARY KEY (`ID`),
  CONSTRAINT `reports_ibfk_1` FOREIGN KEY (`CtmID`) REFERENCES `CUSTOMERS` (`ID`),
  CONSTRAINT `reports_ibfk_2` FOREIGN KEY (`StoreID`) REFERENCES `STORES` (`ID`)
);

#<-----------------------STORED PROCEDURES ------------------------->

DROP PROCEDURE IF EXISTS SupplierAdminSignUp;

DELIMITER //
CREATE PROCEDURE SupplierAdminSignUp(
    IN in_username VARCHAR(50),
    IN in_password VARCHAR(50)
)
BEGIN
	INSERT INTO `SUPPLIER_ADMIN`(`Username`, `Password`)
	VALUES (in_username,in_password);
    SELECT `ID` FROM SUPPLIER_ADMIN WHERE `Username` = in_username AND `Password` = in_password;
END; //

DELIMITER ;

DROP PROCEDURE IF EXISTS SupplierAdminSignIn;

DELIMITER //
CREATE PROCEDURE SupplierAdminSignIn(
    IN in_username VARCHAR(50),
    IN in_password VARCHAR(50)
)
BEGIN
	SELECT * FROM SUPPLIER_ADMIN WHERE `Username` = in_username AND `Password` = in_password;
END; //

DELIMITER ;

DROP PROCEDURE IF EXISTS CustomerSignUp;

DELIMITER //
CREATE PROCEDURE CustomerSignUp(
    IN in_username VARCHAR(50),
    IN in_password VARCHAR(50)
)
BEGIN
	INSERT INTO `CUSTOMERS`(`Username`, `Password`)
	VALUES (in_username,in_password);
    SELECT * FROM `CUSTOMERS` WHERE `Username` = in_username AND PASSWORD = in_password;
END; //

DELIMITER ;

DROP PROCEDURE IF EXISTS CustomerSignIn;

DELIMITER //
CREATE PROCEDURE CustomerSignIn(
    IN in_username VARCHAR(50),
    IN in_password VARCHAR(50)
)
BEGIN
	SELECT * FROM CUSTOMERS WHERE `Username` = in_username AND `Password` = in_password;
END; //

DELIMITER ;




DROP PROCEDURE IF EXISTS GetProductsByPage;

DELIMITER //
CREATE PROCEDURE GetProductsByPage(
	IN currentPage INT,
    IN Store INT,
    IN customerID INT,
    OUT totalPages INT,
    OUT totalRecords INT
)
BEGIN
	DECLARE offsetval INT DEFAULT 0;
	SET offsetval = (currentpage - 1) * 6;
    
    SELECT * FROM PRODUCTS p LEFT JOIN CART_ITEM c ON p.ID = c.ProductID AND c.`CtmID` = customerID
    WHERE StoreID = Store
    LIMIT 6 OFFSET offsetval;
    
    SELECT COUNT(*) INTO totalRecords FROM(
    SELECT * FROM PRODUCTS WHERE StoreID = Store
    ) AS rescount;
    SET totalPages = CEIL(totalRecords/6);
    
END; //

DELIMITER ;

DROP PROCEDURE IF EXISTS GetProductsByTypeStore;

DELIMITER //
CREATE PROCEDURE GetProductsByTypeStore(
	IN currentPage INT,
    IN in_storeID INT,
    IN in_Type VARCHAR(30),
    IN customerID INT,
    OUT totalPages INT,
    OUT totalRecords INT
)
BEGIN
	DECLARE offsetval INT DEFAULT 0;
	SET offsetval = (currentpage - 1) * 6;
    
    SELECT * FROM PRODUCTS p LEFT JOIN CART_ITEM c ON p.ID = c.ProductID AND c.`CtmID` = customerID
    WHERE `Type`= in_Type AND StoreID = in_storeID
    LIMIT 6 OFFSET offsetval;
    
    SELECT COUNT(*) INTO totalRecords FROM(
    SELECT * FROM PRODUCTS WHERE `Type`= in_Type AND StoreID = in_storeID
    ) AS rescount;
    SET totalPages = CEIL(totalRecords/6);
END; //

DELIMITER ;

DROP PROCEDURE IF EXISTS GetProductsByType;

DELIMITER //
CREATE PROCEDURE GetProductsByType(
    IN in_type VARCHAR(30),
    IN customerID INT
)
BEGIN
	SELECT p.ID, p.`Name`,p.Price, p.ExpireDate, p.`Type`, p.Image, p.Quantity ,c.`Count`, s.`Name` AS storeName, s.StoreLogo, s.`ID` AS storeID FROM PRODUCTS p
    JOIN STORES s ON p.StoreID = s.ID
    LEFT JOIN CART_ITEM c ON p.ID = c.ProductID AND c.`CtmID` = customerID
    WHERE p.`Type` = in_type;
END; //

DELIMITER ;

DROP PROCEDURE IF EXISTS GetProductsBySearch;

DELIMITER //
CREATE PROCEDURE GetProductsBySearch(
    IN in_search VARCHAR(30),
    IN customerID INT
)
BEGIN
	SELECT p.ID, p.`Name`,p.Price, p.ExpireDate, p.`Type`, p.Image, p.StoreID, p.Quantity ,c.`Count`, s.`Name` AS storeName, s.StoreLogo FROM PRODUCTS p
    JOIN STORES s ON p.StoreID = s.ID
    LEFT JOIN CART_ITEM c ON p.ID = c.ProductID AND c.`CtmID` = customerID
    WHERE p.`Name` LIKE CONCAT('%', in_search, '%');
END; //

DELIMITER ;

DROP PROCEDURE IF EXISTS CreateProduct;

DELIMITER //
CREATE PROCEDURE CreateProduct(
    IN in_Name VARCHAR(80),
    IN in_Price decimal(7,2),
    IN in_ExpireDate date,
	IN in_Type varchar(30),
	IN in_Description varchar(300),
	IN in_Image varchar(400),
	IN in_Quantity INT,
	IN in_StoreID INT
)
BEGIN
	 INSERT INTO `PRODUCTS`(`Name`,`Price`,`ExpireDate`,`Type`, `Description`,`Image`,`Quantity`,`StoreID`)
	 VALUES (in_Name, in_Price, in_ExpireDate, in_Type, in_Description, in_Image, in_Quantity, in_StoreID);
END; //

DELIMITER ;

DROP PROCEDURE IF EXISTS DeleteProduct;

DELIMITER //
CREATE PROCEDURE DeleteProduct(
    IN ProductID INT
)
BEGIN
	DELETE FROM `PRODUCTS` WHERE ID = ProductID;
END; //

DELIMITER ;

DROP PROCEDURE IF EXISTS GetAllProducts;

DELIMITER //
CREATE PROCEDURE GetAllProducts(
    IN in_storeID INT
)
BEGIN
	SELECT * FROM `PRODUCTS` WHERE StoreID = in_storeID;
END; //

DELIMITER ;


DROP PROCEDURE IF EXISTS GetStoresByPage;

DELIMITER //
CREATE PROCEDURE GetStoresByPage(
	IN currentPage INT,
    OUT totalPages INT,
    OUT totalRecords INT
)
BEGIN
	DECLARE offsetval INT DEFAULT 0;
	SET offsetval = (currentpage - 1) * 5;
	SELECT * FROM STORES
    LIMIT 5 OFFSET offsetval;
    
    SELECT COUNT(*) INTO totalRecords FROM(
    SELECT * FROM STORES
    ) AS rescount;
    SET totalPages = CEIL(totalRecords/5);
END; //

DELIMITER ;

DROP PROCEDURE IF EXISTS AddFavorites;

DELIMITER //
CREATE PROCEDURE AddFavorites(
	IN customerID INT,
    IN in_ProductID INT
)
BEGIN
	INSERT INTO FAVORITES VALUES (in_ProductID, customerID);
END; //

DELIMITER ;

DROP PROCEDURE IF EXISTS RemoveFavorites;

DELIMITER //
CREATE PROCEDURE RemoveFavorites(
	IN customerID INT,
    IN in_ProductID INT
)
BEGIN
	DELETE FROM FAVORITES WHERE ProductID = in_ProductID AND CtmID = customerID;
END; //

DELIMITER ;

DROP PROCEDURE IF EXISTS GetFavorites;

DELIMITER //
CREATE PROCEDURE GetFavorites(
	IN customerID INT
)
BEGIN
	SELECT f.ProductID, f.CtmID, p.`Name`, p.Image, p.`Description`, p.Quantity , s.ID AS StoreID ,s.StoreLogo, s.`Name` AS storeName FROM FAVORITES f 
    JOIN PRODUCTS p ON f.ProductID = p.ID
    JOIN STORES s ON p.StoreID = s.ID
    WHERE f.`CtmID` = customerID;
END; //

DELIMITER ;

DROP PROCEDURE IF EXISTS GetReports;

DELIMITER //
CREATE PROCEDURE GetReports(
	IN customerID INT
)
BEGIN
	SELECT * FROM REPORTS r 
    JOIN STORES s ON r.StoreID = s.ID
    WHERE `CtmID` = customerID;
END; //

DELIMITER ;

DROP PROCEDURE IF EXISTS CreateReports;

DELIMITER //
CREATE PROCEDURE CreateReports(
	IN in_title VARCHAR(200),
    IN in_Desc VARCHAR(1000),
	IN in_storeName VARCHAR(30),
    IN in_customerID INT
)
BEGIN
	SET @storeID = (SELECT ID FROM STORES WHERE `Name` = in_storeName);
    INSERT INTO `REPORTS` (`ReportTitle`,`ReportDesc`,`ReportCreated`,`CtmID`,`StoreID`)
	VALUES(in_title, in_Desc, CURDATE() , in_customerID, @storeID);
END; //

DELIMITER ;

DROP PROCEDURE IF EXISTS GetAdminStores;

DELIMITER //
CREATE PROCEDURE GetAdminStores(
	IN supplierID INT
)
BEGIN
	SELECT * FROM STORES
    WHERE `SupplierAdmin` = supplierID;
END; //

DELIMITER ;


DROP PROCEDURE IF EXISTS GetAdminReports;

DELIMITER //
CREATE PROCEDURE GetAdminReports(
	IN supplierID INT
)
BEGIN
	SELECT * FROM REPORTS r 
    JOIN STORES s ON r.StoreID = s.ID
    JOIN CUSTOMERS c ON r.CtmID = c.ID
    WHERE `SupplierAdmin` = supplierID;
END; //

DELIMITER ;

DROP PROCEDURE IF EXISTS EditUserInfo;

DELIMITER //
CREATE PROCEDURE EditUserInfo(
	IN customerID INT,
	IN in_Username varchar(50),
    IN in_Email varchar(70),
	IN in_Phone varchar(20),
	IN in_Address varchar(100)
)
BEGIN
	UPDATE CUSTOMERS
    SET Username = in_Username, Email = in_Email, Phone = in_Phone, Address = in_Address
    WHERE ID = customerID;
END; //

DELIMITER ;


DROP PROCEDURE IF EXISTS AddtoCart;

DELIMITER //
CREATE PROCEDURE AddtoCart(
	IN customerID INT,
	IN in_ProductID INT,
    IN in_StoreID INT
)
BEGIN
	SET @SessionCount = (SELECT COUNT(*) FROM SHOPPING_SESSION WHERE `CtmID` = customerID AND `StoreID` = in_StoreID);
    SET @SessionID = (SELECT `ID` FROM SHOPPING_SESSION WHERE `CtmID` = customerID AND `StoreID` = in_StoreID);
    IF (@SessionCount = 1) THEN
		SET @ItemCount = (SELECT COUNT(*) FROM CART_ITEM WHERE `ProductID` = in_ProductID AND `CtmID` = customerID);
        IF @ItemCount > 0 THEN
			UPDATE CART_ITEM SET `Count` = `Count` + 1 WHERE `ProductID` = in_ProductID AND `CtmID` = customerID;
            UPDATE PRODUCTS SET `Quantity` = `Quantity` - 1 WHERE `ID` = in_ProductID;
            SET @Price = (SELECT `Price` FROM PRODUCTS WHERE `ID` = in_ProductID);
            UPDATE SHOPPING_SESSION SET Total = Total + @Price WHERE `ID` = @SessionID;
            UPDATE SHOPPING_SESSION SET `CartCount` = `CartCount` + 1 WHERE `ID` = @SessionID;
		ELSE
			INSERT INTO CART_ITEM VALUES(in_ProductID,@SessionID,customerID,1);
            UPDATE PRODUCTS SET `Quantity` = `Quantity` - 1 WHERE `ID` = in_ProductID;
            SET @Price = (SELECT `Price` FROM PRODUCTS WHERE `ID` = in_ProductID);
            UPDATE SHOPPING_SESSION SET Total = Total + @Price WHERE `ID` = @SessionID;
            UPDATE SHOPPING_SESSION SET `CartCount` = `CartCount` + 1 WHERE `ID` = @SessionID;
		END IF;
	ELSE
		INSERT INTO SHOPPING_SESSION (`CtmID`, `StoreID`) VALUES (customerID, in_StoreID);
		SET @SessionID = (SELECT `ID` FROM SHOPPING_SESSION WHERE `CtmID` = customerID AND `StoreID` = in_StoreID);
		INSERT INTO CART_ITEM VALUES(in_ProductID, @SessionID,customerID,1);
        UPDATE PRODUCTS SET `Quantity` = `Quantity` - 1 WHERE `ID` = in_ProductID;
        SET @Price = (SELECT `Price` FROM PRODUCTS WHERE `ID` = in_ProductID);
		UPDATE SHOPPING_SESSION SET Total = Total + @Price WHERE `ID` = @SessionID;
        UPDATE SHOPPING_SESSION SET `CartCount` = `CartCount` + 1 WHERE `ID` = @SessionID;
	END IF;
END; //

DELIMITER ;


DROP PROCEDURE IF EXISTS GetShoppingSessions;

DELIMITER //
CREATE PROCEDURE GetShoppingSessions(
	IN customerID INT
)
BEGIN
	SELECT ss.ID, ss.CtmID, ss.StoreID, ss.CartCount, ss.Total, s.`Name`, s.Address, s.StoreLogo, s.SupplierAdmin  FROM SHOPPING_SESSION ss
    JOIN STORES s ON ss.StoreID = s.ID
    WHERE `CtmID` = customerID;
END; //

DELIMITER ;


DROP PROCEDURE IF EXISTS RemoveShoppingSession;

DELIMITER //
CREATE PROCEDURE RemoveShoppingSession(
	IN sessionID INT
)
BEGIN
	DELETE FROM SHOPPING_SESSION WHERE ID = sessionID;
END; //

DELIMITER ;

DROP PROCEDURE IF EXISTS RemoveFromCart;

DELIMITER //
CREATE PROCEDURE RemoveFromCart(
	IN customerID INT,
	IN in_ProductID INT,
    IN in_StoreID INT
)
BEGIN
	SET @SessionID = (SELECT `ID` FROM SHOPPING_SESSION WHERE `CtmID` = customerID AND `StoreID` = in_StoreID);
    UPDATE CART_ITEM SET `Count` = `Count` - 1 WHERE `ProductID` = in_ProductID AND `CtmID` = customerID;
    UPDATE PRODUCTS SET `Quantity` = `Quantity` + 1 WHERE `ID` = in_ProductID;
    SET @CartCount = (SELECT `Count` FROM CART_ITEM WHERE `ProductID` = in_ProductID AND `CtmID` = customerID);
    SET @Price = (SELECT `Price` FROM PRODUCTS WHERE `ID` = in_ProductID);
    UPDATE SHOPPING_SESSION SET Total = Total - @Price WHERE `ID` = @SessionID;
    UPDATE SHOPPING_SESSION SET `CartCount` = `CartCount` - 1 WHERE `ID` = @SessionID;
END; //

DELIMITER ;

DROP PROCEDURE IF EXISTS CreateOrder;

DELIMITER //
CREATE PROCEDURE CreateOrder(
	IN itemCount INT,
	IN Price DECIMAL(7,2),
    IN storeID INT,
    IN in_customerID INT,
    IN in_sessionID INT
)
BEGIN
	SELECT storeID;
	INSERT INTO ORDERS (`NumberOfItems`,`OrderPrice`,`OrderStatus`,`DeliveryDate`,`StoreID`,`CtmID`,`SessionID`)
    VALUES(itemCount, Price, 'IN PROGRESS', DATE_ADD(CURDATE(), INTERVAL 2 DAY), storeID, in_customerID, in_sessionID);
    INSERT INTO ORDERED(`ProductID`, `OrderID`)
	SELECT c.ProductID , o.ID FROM CART_ITEM c JOIN ORDERS o ON c.SessionID = o.SessionID WHERE c.SessionID = in_sessionID;
END; //

DELIMITER ;


DROP PROCEDURE IF EXISTS GetOrders;

DELIMITER //
CREATE PROCEDURE GetOrders(
    IN in_customerID INT
)
BEGIN
	SELECT * FROM ORDERS WHERE CtmID = in_customerID
    ORDER BY ID DESC;
END; //

DELIMITER ;

DROP PROCEDURE IF EXISTS GetAdminOrders;

DELIMITER //
CREATE PROCEDURE GetAdminOrders(
    IN in_storeID INT
)
BEGIN
	SELECT * FROM ORDERS WHERE StoreID = in_storeID
    ORDER BY ID DESC;
END; //

DELIMITER ;


DROP PROCEDURE IF EXISTS GetOrderDetails;

DELIMITER //
CREATE PROCEDURE GetOrderDetails(
    IN orderID INT
)
BEGIN
	SELECT o.ProductID, o.OrderID, p.`Name` AS productName, p.Image, s.`Name` AS storeName, s.`StoreLogo` FROM ORDERED o 
    JOIN PRODUCTS p ON o.ProductID = p.ID
    JOIN STORES s ON p.StoreID = s.ID
    WHERE o.OrderID = orderID;
END; //

DELIMITER ;


DROP PROCEDURE IF EXISTS EditOrders;

DELIMITER //
CREATE PROCEDURE EditOrders(
    IN orderID INT,
    IN in_orderStatus VARCHAR(20),
    IN in_deliveryDate DATE
)
BEGIN
	UPDATE ORDERS
    SET OrderStatus = in_orderStatus, DeliveryDate = in_deliveryDate
    WHERE ID = orderID;
END; //

DELIMITER ;

/*
CALL CreateOrder(1, 1, 11.47,1,1);


CALL RemoveShoppingSession(1);

/*CALL AddtoCart(2,1,1);*/
/*CALL GetProductsByPage(1,1, @totalPages, @totalRecords);
CALL AddtoCart(1,1,1);
SELECT * FROM SHOPPING_SESSION;
SELECT * FROM STORES;
SELECT * FROM CART_ITEM;
SELECT * FROM ORDERED;
*/
CALL GetOrderDetails(1);

/*
INSERT INTO SHOPPING_SESSION(`CtmID`, `StoreID`) VALUES(1,1);
INSERT INTO CART_ITEM (`ProductID`, `SessionID`)  VALUES(1,1);*/
/*
CALL CustomerSignUp('1','1');
CALL CreateShoppingSession(1, 1);
CALL CreateCartItem(1,1,1);
CALL CreateCartItem(3,1,1);
CALL RemoveCartItem(1,1,1);
CALL GetShoppingSession(1);
SELECT * FROM CART_ITEM;*/

CALL GetShoppingSessions(1);

