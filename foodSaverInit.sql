-- MySQL dump 10.13  Distrib 8.0.31, for macos12 (x86_64)
--
-- Host: localhost    Database: foodsaver
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `ADDRESS`
--

DROP TABLE IF EXISTS `ADDRESS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ADDRESS` (
  `UserID` int NOT NULL,
  `Street` varchar(300) DEFAULT NULL,
  `City` varchar(100) DEFAULT NULL,
  `State` varchar(100) DEFAULT NULL,
  `PostalCode` int DEFAULT NULL,
  `Country` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`UserID`),
  CONSTRAINT `address_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `CUSTOMERS` (`ID`),
  CONSTRAINT `address_ibfk_2` FOREIGN KEY (`UserID`) REFERENCES `SUPPLIER_ADMIN` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ADDRESS`
--

LOCK TABLES `ADDRESS` WRITE;
/*!40000 ALTER TABLE `ADDRESS` DISABLE KEYS */;
/*!40000 ALTER TABLE `ADDRESS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CART_ITEM`
--

DROP TABLE IF EXISTS `CART_ITEM`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CART_ITEM` (
  `ProductID` int DEFAULT NULL,
  `SessionID` int DEFAULT NULL,
  KEY `ProductID` (`ProductID`),
  KEY `SessionID` (`SessionID`),
  CONSTRAINT `cart_item_ibfk_1` FOREIGN KEY (`ProductID`) REFERENCES `PRODUCTS` (`ID`),
  CONSTRAINT `cart_item_ibfk_2` FOREIGN KEY (`SessionID`) REFERENCES `SHOPPING_SESSION` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CART_ITEM`
--

LOCK TABLES `CART_ITEM` WRITE;
/*!40000 ALTER TABLE `CART_ITEM` DISABLE KEYS */;
/*!40000 ALTER TABLE `CART_ITEM` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CUSTOMERS`
--

DROP TABLE IF EXISTS `CUSTOMERS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CUSTOMERS` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Username` varchar(50) DEFAULT NULL,
  `Password` varchar(50) DEFAULT NULL,
  `Email` varchar(70) DEFAULT NULL,
  `Phone` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CUSTOMERS`
--

LOCK TABLES `CUSTOMERS` WRITE;
/*!40000 ALTER TABLE `CUSTOMERS` DISABLE KEYS */;
/*!40000 ALTER TABLE `CUSTOMERS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `FAVORITES`
--

DROP TABLE IF EXISTS `FAVORITES`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `FAVORITES` (
  `ProductName` varchar(100) NOT NULL,
  `CtmID` int DEFAULT NULL,
  PRIMARY KEY (`ProductName`),
  KEY `CtmID` (`CtmID`),
  CONSTRAINT `favorites_ibfk_2` FOREIGN KEY (`CtmID`) REFERENCES `CUSTOMERS` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `FAVORITES`
--

LOCK TABLES `FAVORITES` WRITE;
/*!40000 ALTER TABLE `FAVORITES` DISABLE KEYS */;
/*!40000 ALTER TABLE `FAVORITES` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ORDERED`
--

DROP TABLE IF EXISTS `ORDERED`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ORDERED` (
  `ProductID` int NOT NULL,
  `OrderID` int DEFAULT NULL,
  KEY `fk_prod_id` (`ProductID`),
  KEY `fk_order_id` (`OrderID`),
  CONSTRAINT `fk_order_id` FOREIGN KEY (`OrderID`) REFERENCES `ORDERS` (`ID`),
  CONSTRAINT `fk_prod_id` FOREIGN KEY (`ProductID`) REFERENCES `PRODUCTS` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ORDERED`
--

LOCK TABLES `ORDERED` WRITE;
/*!40000 ALTER TABLE `ORDERED` DISABLE KEYS */;
/*!40000 ALTER TABLE `ORDERED` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ORDERS`
--

DROP TABLE IF EXISTS `ORDERS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ORDERS` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `NumberOfItems` int DEFAULT NULL,
  `OrderPrice` decimal(7,2) DEFAULT NULL,
  `OrderStatus` varchar(20) DEFAULT NULL,
  `DeliveryDate` date DEFAULT NULL,
  `StoreID` int DEFAULT NULL,
  `CtmID` int DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `StoreID` (`StoreID`),
  KEY `orders_ibfk_2` (`CtmID`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`StoreID`) REFERENCES `STORES` (`ID`),
  CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`CtmID`) REFERENCES `CUSTOMERS` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ORDERS`
--

LOCK TABLES `ORDERS` WRITE;
/*!40000 ALTER TABLE `ORDERS` DISABLE KEYS */;
/*!40000 ALTER TABLE `ORDERS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PRODUCTS`
--

DROP TABLE IF EXISTS `PRODUCTS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
  KEY `StoreID` (`StoreID`),
  KEY `products_ibfk_2` (`Name`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`StoreID`) REFERENCES `STORES` (`ID`),
  CONSTRAINT `products_ibfk_2` FOREIGN KEY (`Name`) REFERENCES `FAVORITES` (`ProductName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PRODUCTS`
--

LOCK TABLES `PRODUCTS` WRITE;
/*!40000 ALTER TABLE `PRODUCTS` DISABLE KEYS */;
/*!40000 ALTER TABLE `PRODUCTS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `REPORTS`
--

DROP TABLE IF EXISTS `REPORTS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `REPORTS` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `ReportTitle` varchar(200) DEFAULT NULL,
  `ReportDesc` varchar(1000) DEFAULT NULL,
  `ReportCreated` date DEFAULT NULL,
  `CtmID` int DEFAULT NULL,
  `StoreID` int DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `CtmID` (`CtmID`),
  KEY `StoreID` (`StoreID`),
  CONSTRAINT `reports_ibfk_1` FOREIGN KEY (`CtmID`) REFERENCES `CUSTOMERS` (`ID`),
  CONSTRAINT `reports_ibfk_2` FOREIGN KEY (`StoreID`) REFERENCES `STORES` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `REPORTS`
--

LOCK TABLES `REPORTS` WRITE;
/*!40000 ALTER TABLE `REPORTS` DISABLE KEYS */;
/*!40000 ALTER TABLE `REPORTS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SHOPPING_SESSION`
--

DROP TABLE IF EXISTS `SHOPPING_SESSION`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SHOPPING_SESSION` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `CtmID` int DEFAULT NULL,
  `Total` decimal(7,2) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `shopping_session_ibfk_1` (`CtmID`),
  CONSTRAINT `shopping_session_ibfk_1` FOREIGN KEY (`CtmID`) REFERENCES `CUSTOMERS` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SHOPPING_SESSION`
--

LOCK TABLES `SHOPPING_SESSION` WRITE;
/*!40000 ALTER TABLE `SHOPPING_SESSION` DISABLE KEYS */;
/*!40000 ALTER TABLE `SHOPPING_SESSION` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `STORES`
--

DROP TABLE IF EXISTS `STORES`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `STORES` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(30) DEFAULT NULL,
  `AddressID` int DEFAULT NULL,
  `StoreLogo` varchar(400) DEFAULT NULL,
  `SupplierAdmin` int DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `fk_supp_admin` (`SupplierAdmin`),
  CONSTRAINT `fk_supp_admin` FOREIGN KEY (`SupplierAdmin`) REFERENCES `SUPPLIER_ADMIN` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `STORES`
--

LOCK TABLES `STORES` WRITE;
/*!40000 ALTER TABLE `STORES` DISABLE KEYS */;
/*!40000 ALTER TABLE `STORES` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SUPPLIER_ADMIN`
--

DROP TABLE IF EXISTS `SUPPLIER_ADMIN`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SUPPLIER_ADMIN` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Username` varchar(30) NOT NULL,
  `Password` varchar(50) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SUPPLIER_ADMIN`
--

LOCK TABLES `SUPPLIER_ADMIN` WRITE;
/*!40000 ALTER TABLE `SUPPLIER_ADMIN` DISABLE KEYS */;
/*!40000 ALTER TABLE `SUPPLIER_ADMIN` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-04  3:14:26
