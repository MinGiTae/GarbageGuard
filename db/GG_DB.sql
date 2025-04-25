-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: garbageguard
-- ------------------------------------------------------
-- Server version	8.0.41

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
-- Table structure for table `companies`
--

DROP TABLE IF EXISTS `companies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `companies` (
  `company_id` int NOT NULL AUTO_INCREMENT,
  `company_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ceo_name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `contact` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`company_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `companies`
--

LOCK TABLES `companies` WRITE;
/*!40000 ALTER TABLE `companies` DISABLE KEYS */;
INSERT INTO `companies` VALUES (1,'테스트건설',NULL,NULL,NULL),(3,'몰루컴퍼니','대전둔산동','몰?루','01012341234'),(4,'집가고싶다','우리집','집집','01011111111'),(5,'송기윤코털','대전둔산동','송기윤','01011112222'),(6,'계룡건설','대전','이님','010123123');
/*!40000 ALTER TABLE `companies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company_emissions`
--

DROP TABLE IF EXISTS `company_emissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `company_emissions` (
  `emission_id` int NOT NULL AUTO_INCREMENT,
  `company_id` int NOT NULL,
  `total_carbon_emission` decimal(10,2) DEFAULT NULL,
  `recorded_month` varchar(7) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`emission_id`),
  KEY `company_id` (`company_id`),
  CONSTRAINT `company_emissions_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `companies` (`company_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company_emissions`
--

LOCK TABLES `company_emissions` WRITE;
/*!40000 ALTER TABLE `company_emissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `company_emissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `construction_sites`
--

DROP TABLE IF EXISTS `construction_sites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `construction_sites` (
  `site_id` int NOT NULL AUTO_INCREMENT,
  `site_name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `manager_name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `company_id` int DEFAULT NULL,
  `latitude` double DEFAULT NULL,
  `longitude` double DEFAULT NULL,
  PRIMARY KEY (`site_id`),
  KEY `company_id` (`company_id`),
  CONSTRAINT `construction_sites_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `companies` (`company_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `construction_sites`
--

LOCK TABLES `construction_sites` WRITE;
/*!40000 ALTER TABLE `construction_sites` DISABLE KEYS */;
INSERT INTO `construction_sites` VALUES (1,'테스트현장','서울시 강남구','홍길동',1,NULL,NULL),(2,'몰루','서울시 어딘가','홍길동',NULL,NULL,NULL),(8,'건설현장1','대전 서구 괴정동 12-2','이님',6,36.34079208385371,127.38150924194457);
/*!40000 ALTER TABLE `construction_sites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `materials`
--

DROP TABLE IF EXISTS `materials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `materials` (
  `material_id` int NOT NULL AUTO_INCREMENT,
  `material_name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `unit` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`material_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `materials`
--

LOCK TABLES `materials` WRITE;
/*!40000 ALTER TABLE `materials` DISABLE KEYS */;
/*!40000 ALTER TABLE `materials` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `monthly_waste_report`
--

DROP TABLE IF EXISTS `monthly_waste_report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `monthly_waste_report` (
  `report_id` int NOT NULL AUTO_INCREMENT,
  `report_month` varchar(7) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `waste_type` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `total_amount` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`report_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `monthly_waste_report`
--

LOCK TABLES `monthly_waste_report` WRITE;
/*!40000 ALTER TABLE `monthly_waste_report` DISABLE KEYS */;
/*!40000 ALTER TABLE `monthly_waste_report` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `site_materials_usage`
--

DROP TABLE IF EXISTS `site_materials_usage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `site_materials_usage` (
  `usage_id` int NOT NULL AUTO_INCREMENT,
  `site_id` int DEFAULT NULL,
  `material_id` int DEFAULT NULL,
  `used_quantity` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`usage_id`),
  KEY `site_id` (`site_id`),
  KEY `material_id` (`material_id`),
  CONSTRAINT `site_materials_usage_ibfk_1` FOREIGN KEY (`site_id`) REFERENCES `construction_sites` (`site_id`),
  CONSTRAINT `site_materials_usage_ibfk_2` FOREIGN KEY (`material_id`) REFERENCES `materials` (`material_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `site_materials_usage`
--

LOCK TABLES `site_materials_usage` WRITE;
/*!40000 ALTER TABLE `site_materials_usage` DISABLE KEYS */;
/*!40000 ALTER TABLE `site_materials_usage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `site_waste_summary`
--

DROP TABLE IF EXISTS `site_waste_summary`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `site_waste_summary` (
  `summary_id` int NOT NULL AUTO_INCREMENT,
  `site_id` int DEFAULT NULL,
  `waste_type` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `total_amount` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`summary_id`),
  KEY `site_id` (`site_id`),
  CONSTRAINT `site_waste_summary_ibfk_1` FOREIGN KEY (`site_id`) REFERENCES `construction_sites` (`site_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `site_waste_summary`
--

LOCK TABLES `site_waste_summary` WRITE;
/*!40000 ALTER TABLE `site_waste_summary` DISABLE KEYS */;
/*!40000 ALTER TABLE `site_waste_summary` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `waste_management`
--

DROP TABLE IF EXISTS `waste_management`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `waste_management` (
  `waste_id` int NOT NULL AUTO_INCREMENT,
  `site_id` int DEFAULT NULL,
  `waste_type` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `waste_amount` decimal(10,2) DEFAULT NULL,
  `carbon_emission` decimal(10,2) DEFAULT NULL,
  `recycled` tinyint(1) DEFAULT NULL,
  `disposal_date` date DEFAULT NULL,
  PRIMARY KEY (`waste_id`),
  KEY `site_id` (`site_id`),
  CONSTRAINT `waste_management_ibfk_1` FOREIGN KEY (`site_id`) REFERENCES `construction_sites` (`site_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `waste_management`
--

LOCK TABLES `waste_management` WRITE;
/*!40000 ALTER TABLE `waste_management` DISABLE KEYS */;
INSERT INTO `waste_management` VALUES (1,2,'pipes',10.00,5.00,NULL,'2025-03-27'),(2,2,'plastic',15.00,7.50,NULL,'2025-03-25'),(3,2,'brick',10.00,5.00,NULL,'2025-02-12'),(4,2,'general_w',31.00,15.50,NULL,'2025-04-24'),(5,8,'general_w',31.00,15.50,NULL,'2025-04-25'),(6,8,'brick',10.00,5.00,NULL,'2025-05-20');
/*!40000 ALTER TABLE `waste_management` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `waste_objects`
--

DROP TABLE IF EXISTS `waste_objects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `waste_objects` (
  `object_id` int NOT NULL AUTO_INCREMENT,
  `object_name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`object_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `waste_objects`
--

LOCK TABLES `waste_objects` WRITE;
/*!40000 ALTER TABLE `waste_objects` DISABLE KEYS */;
INSERT INTO `waste_objects` VALUES (1,'폐콘크리트'),(2,'플라스틱'),(3,'general_w'),(4,'brick'),(5,'pipes'),(6,'plastic');
/*!40000 ALTER TABLE `waste_objects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `waste_photo_objects`
--

DROP TABLE IF EXISTS `waste_photo_objects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `waste_photo_objects` (
  `id` int NOT NULL AUTO_INCREMENT,
  `photo_id` int DEFAULT NULL,
  `object_id` int DEFAULT NULL,
  `count` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `photo_id` (`photo_id`),
  KEY `object_id` (`object_id`),
  CONSTRAINT `waste_photo_objects_ibfk_1` FOREIGN KEY (`photo_id`) REFERENCES `waste_photos` (`photo_id`),
  CONSTRAINT `waste_photo_objects_ibfk_2` FOREIGN KEY (`object_id`) REFERENCES `waste_objects` (`object_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `waste_photo_objects`
--

LOCK TABLES `waste_photo_objects` WRITE;
/*!40000 ALTER TABLE `waste_photo_objects` DISABLE KEYS */;
/*!40000 ALTER TABLE `waste_photo_objects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `waste_photos`
--

DROP TABLE IF EXISTS `waste_photos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `waste_photos` (
  `photo_id` int NOT NULL AUTO_INCREMENT,
  `site_id` int DEFAULT NULL,
  `object_id` int DEFAULT NULL,
  `uploaded_at` datetime DEFAULT NULL,
  `image_filename` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `detection_summary` text COLLATE utf8mb4_unicode_ci,
  `is_analyzed` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`photo_id`),
  KEY `site_id` (`site_id`),
  KEY `object_id` (`object_id`),
  KEY `idx_uploaded_at` (`uploaded_at`),
  CONSTRAINT `waste_photos_ibfk_1` FOREIGN KEY (`site_id`) REFERENCES `construction_sites` (`site_id`),
  CONSTRAINT `waste_photos_ibfk_2` FOREIGN KEY (`object_id`) REFERENCES `waste_objects` (`object_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `waste_photos`
--

LOCK TABLES `waste_photos` WRITE;
/*!40000 ALTER TABLE `waste_photos` DISABLE KEYS */;
INSERT INTO `waste_photos` VALUES (1,1,1,'2025-04-23 10:00:00','test1.png','폐콘크리트 2개, 플라스틱 1개',1),(2,1,1,'2025-04-21 10:00:00','test1.png','폐콘크리트 1개',1),(3,1,1,'2025-04-22 11:00:00','test2.png','폐콘크리트 2개',1),(4,1,1,'2025-04-23 12:00:00','test3.png','폐콘크리트 3개',1),(5,1,1,'2025-04-24 14:00:00','test4.png','폐콘크리트 4개',1),(6,2,4,'2025-04-23 15:40:07','2025-04-23.jpg','brick 10개, tile 1개, wood 2개',1),(7,2,4,'2025-04-23 16:45:48','2025-03-22.jpg','brick 10개, tile 1개, wood 2개',1),(8,2,5,'2025-04-23 17:42:11','2025-03-27.jpg','brick 1개, concrete 3개, general_w 1개, gypsum_board 1개, pipes 10개, plastic 6개',1),(9,2,6,'2025-03-25 00:00:00','2025-03-25.jpg','pipes 3개, plastic 15개',1),(10,2,4,'2025-02-12 00:00:00','2025-02-12.jpg','brick 10개, tile 1개, wood 2개',1),(11,2,3,'2025-04-24 00:00:00','uploaded_image.jpg','brick 16개, concrete 1개, foam 1개, general_w 31개, pipes 2개, plastic 5개, tile 2개',1),(12,8,3,'2025-04-25 00:00:00','2025-04-25.jpg','brick 16개, concrete 1개, foam 1개, general_w 31개, pipes 2개, plastic 5개, tile 2개',1),(13,8,4,'2025-05-20 00:00:00','2025-05-20.jpg','brick 10개, tile 1개, wood 2개',1);
/*!40000 ALTER TABLE `waste_photos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-25 17:41:29
