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
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `images` (
  `image_id` varchar(36) NOT NULL,
  `url` text NOT NULL,
  `product_id` varchar(36) NOT NULL,
  `main` tinyint(1) NOT NULL,
  PRIMARY KEY (`image_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `images_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
INSERT INTO `images` VALUES ('2010c194-e446-11ed-b5ea-0242ac120002','https://via.placeholder.com/150/9c184f','6f1a6b96-6cd2-439c-a648-88b9f287f7d2',1),('2010c73e-e446-11ed-b5ea-0242ac120002','https://via.placeholder.com/150/1fe46f','6f1a6b96-6cd2-439c-a648-88b9f287f7d2',0),('2010c964-e446-11ed-b5ea-0242ac120002','https://via.placeholder.com/150/56acb2','6f1a6b96-6cd2-439c-a648-88b9f287f7d2',0),('2010cc20-e446-11ed-b5ea-0242ac120002','https://via.placeholder.com/150/8985dc','6f1a6b96-6cd2-439c-a648-88b9f287f7d2',0),('4fa6dc81-0f79-4ffe-b189-32ead157d7c9','https://via.placeholder.com/150/24f355','4f4b4f16-77cb-4c24-bcae-238cde406fb3',1),('708886dc-e45b-11ed-b5ea-0242ac120002','https://via.placeholder.com/150/f66b97','a3d0fa3b-8e2c-4d19-bf2a-950b8c998a58',1),('708889f2-e45b-11ed-b5ea-0242ac120002','https://via.placeholder.com/150/56a8c2','a3d0fa3b-8e2c-4d19-bf2a-950b8c998a58',0),('70888b46-e45b-11ed-b5ea-0242ac120002','https://via.placeholder.com/150/b0f7cc','a3d0fa3b-8e2c-4d19-bf2a-950b8c998a58',0),('70888c90-e45b-11ed-b5ea-0242ac120002','https://via.placeholder.com/150/54176f','a3d0fa3b-8e2c-4d19-bf2a-950b8c998a58',0),('95dd4a1d-5bcb-4613-9f54-5dfc449e1b95','https://via.placeholder.com/150/56acb2','88a3f826-9c3d-4f7c-a56e-156d7c3f3b28',1),('a0f2a9a6-e45b-11ed-b5ea-0242ac120002','https://via.placeholder.com/150/51aa97','9b4d4a1a-5224-4ad4-b4e3-053dcbfa0f3c',1),('a0f2ae9c-e45b-11ed-b5ea-0242ac120002','https://via.placeholder.com/150/810b14','9b4d4a1a-5224-4ad4-b4e3-053dcbfa0f3c',0),('a0f2afd2-e45b-11ed-b5ea-0242ac120002','https://via.placeholder.com/150/1ee8a4','9b4d4a1a-5224-4ad4-b4e3-053dcbfa0f3c',0),('a0f2b0fe-e45b-11ed-b5ea-0242ac120002','https://via.placeholder.com/150/66b7d2','9b4d4a1a-5224-4ad4-b4e3-053dcbfa0f3c',0),('b12d5412-9f29-485b-bfb7-b529ddef4073','https://via.placeholder.com/150/d32776','34e1a2a7-d0a9-4c7a-99f6-c2d5b5afaa06',1),('c65bb9f8-e45b-11ed-b5ea-0242ac120002','https://via.placeholder.com/150/197d29','efd82d85-8dd6-4979-bf5c-96933d9c2f7d',1),('c65bc984-e45b-11ed-b5ea-0242ac120002','https://via.placeholder.com/150/61a65','efd82d85-8dd6-4979-bf5c-96933d9c2f7d',0),('c65bd136-e45b-11ed-b5ea-0242ac120002','https://via.placeholder.com/150/f9cee5','efd82d85-8dd6-4979-bf5c-96933d9c2f7d',0),('c65bd316-e45b-11ed-b5ea-0242ac120002','https://via.placeholder.com/150/fdf73e','efd82d85-8dd6-4979-bf5c-96933d9c2f7d',0),('ca84686e-e45b-11ed-b5ea-0242ac120002','https://via.placeholder.com/150/92c952','5c5f94eb-7e38-45e1-b7c9-57dfb7a2b93c',0),('ca846b8e-e45b-11ed-b5ea-0242ac120002','https://via.placeholder.com/150/771796','5c5f94eb-7e38-45e1-b7c9-57dfb7a2b93c',0),('ca846df0-e45b-11ed-b5ea-0242ac120002','https://via.placeholder.com/150/24f355','5c5f94eb-7e38-45e1-b7c9-57dfb7a2b93c',1),('ca846fb2-e45b-11ed-b5ea-0242ac120002','https://via.placeholder.com/150/d32776','5c5f94eb-7e38-45e1-b7c9-57dfb7a2b93c',0);
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
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
