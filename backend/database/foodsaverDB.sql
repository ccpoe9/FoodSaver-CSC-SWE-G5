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
  `Name` varchar(30) DEFAULT NULL,
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
  `CtmID` int DEFAULT NULL,
  `Total` decimal(7,2) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  CONSTRAINT `shopping_session_ibfk_1` FOREIGN KEY (`CtmID`) REFERENCES `CUSTOMERS` (`ID`)
);

--
-- Table structure for table `FAVORITES`
--
-- DROP TABLE IF EXISTS `FAVORITES`;
CREATE TABLE `FAVORITES` (
  `ProductName` varchar(100) NOT NULL,
  `CtmID` int DEFAULT NULL,
  PRIMARY KEY (`ProductName`),
  CONSTRAINT `favorites_ibfk_2` FOREIGN KEY (`CtmID`) REFERENCES `CUSTOMERS` (`ID`)
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


DROP PROCEDURE IF EXISTS GetProductsByPage;

DELIMITER //
CREATE PROCEDURE GetProductsByPage(
	IN currentPage INT,
    IN Store INT
)
BEGIN
	DECLARE offsetval INT DEFAULT 0;
	SET offsetval = (currentpage - 1) * 5;
	SELECT * FROM PRODUCTS WHERE StoreID = Store
    LIMIT 5 OFFSET offsetval;
END; //

DELIMITER ;

DROP PROCEDURE IF EXISTS GetStoresByPage;

DELIMITER //
CREATE PROCEDURE GetStoresByPage(
	IN currentPage INT
)
BEGIN
	DECLARE offsetval INT DEFAULT 0;
	SET offsetval = (currentpage - 1) * 5;
	SELECT * FROM STORES
    LIMIT 5 OFFSET offsetval;
END; //

DELIMITER ;
