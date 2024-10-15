-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: productsapplication
-- ------------------------------------------------------
-- Server version	8.4.2

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
-- Table structure for table `related_products`
--

DROP TABLE IF EXISTS `related_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `related_products` (
  `product_id` varchar(36) NOT NULL,
  `related_product_id` varchar(36) NOT NULL,
  PRIMARY KEY (`product_id`,`related_product_id`),
  KEY `product_id_2` (`related_product_id`),
  CONSTRAINT `related_products_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`),
  CONSTRAINT `related_products_ibfk_2` FOREIGN KEY (`related_product_id`) REFERENCES `products` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `related_products`
--

LOCK TABLES `related_products` WRITE;
/*!40000 ALTER TABLE `related_products` DISABLE KEYS */;
INSERT INTO `related_products` VALUES ('6f1a6b96-6cd2-439c-a648-88b9f287f7d2','34e1a2a7-d0a9-4c7a-99f6-c2d5b5afaa06'),('88a3f826-9c3d-4f7c-a56e-156d7c3f3b28','34e1a2a7-d0a9-4c7a-99f6-c2d5b5afaa06'),('9b4d4a1a-5224-4ad4-b4e3-053dcbfa0f3c','34e1a2a7-d0a9-4c7a-99f6-c2d5b5afaa06'),('88a3f826-9c3d-4f7c-a56e-156d7c3f3b28','4f4b4f16-77cb-4c24-bcae-238cde406fb3'),('5c5f94eb-7e38-45e1-b7c9-57dfb7a2b93c','6f1a6b96-6cd2-439c-a648-88b9f287f7d2'),('e144947e-3af7-4d3c-8327-ecf39255617d','6f1a6b96-6cd2-439c-a648-88b9f287f7d2'),('34e1a2a7-d0a9-4c7a-99f6-c2d5b5afaa06','9b4d4a1a-5224-4ad4-b4e3-053dcbfa0f3c');
/*!40000 ALTER TABLE `related_products` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-14 22:05:16
