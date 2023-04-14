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
  CONSTRAINT `cart_item_ibfk_1` FOREIGN KEY (`ProductID`) REFERENCES `PRODUCTS` (`ID`),
  CONSTRAINT `cart_item_ibfk_2` FOREIGN KEY (`SessionID`) REFERENCES `SHOPPING_SESSION` (`ID`)
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
    SELECT `ID` FROM `CUSTOMERS` WHERE `Username` = in_username AND PASSWORD = in_password;
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
    OUT totalPages INT,
    OUT totalRecords INT
)
BEGIN
	DECLARE offsetval INT DEFAULT 0;
	SET offsetval = (currentpage - 1) * 6;
	SELECT * FROM PRODUCTS WHERE StoreID = Store
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
    OUT totalPages INT,
    OUT totalRecords INT
)
BEGIN
	DECLARE offsetval INT DEFAULT 0;
	SET offsetval = (currentpage - 1) * 6;
	SELECT * FROM PRODUCTS WHERE `Type`= in_Type AND StoreID = in_storeID
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
    IN in_type VARCHAR(30)
)
BEGIN
	SELECT p.ID, p.`Name`,p.Price, p.ExpireDate, p.`Type`, p.Image, s.`Name` AS storeName, s.StoreLogo FROM PRODUCTS p
    JOIN STORES s ON p.StoreID = s.ID
    WHERE p.`Type` = in_type;
END; //

DELIMITER ;

DROP PROCEDURE IF EXISTS GetProductsBySearch;

DELIMITER //
CREATE PROCEDURE GetProductsBySearch(
    IN in_search VARCHAR(30)
)
BEGIN
	SELECT p.ID, p.`Name`,p.Price, p.ExpireDate, p.`Type`, p.Image, s.`Name` AS storeName, s.StoreLogo FROM PRODUCTS p
    JOIN STORES s ON p.StoreID = s.ID
    WHERE p.`Name` LIKE CONCAT('%', in_search, '%');
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

DROP PROCEDURE IF EXISTS GetFavorites;

DELIMITER //
CREATE PROCEDURE GetFavorites(
	IN customerID INT
)
BEGIN
	SELECT * FROM FAVORITES f JOIN PRODUCTS p ON f.ProductID = p.ID
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



/*
CALL CustomerSignUp('1','1');
CALL CreateShoppingSession(1, 1);
CALL CreateCartItem(1,1,1);
CALL CreateCartItem(3,1,1);
CALL RemoveCartItem(1,1,1);
CALL GetShoppingSession(1);
SELECT * FROM CART_ITEM;*/



