-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: athlete_performance_tracking
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
-- Table structure for table `athlete_program`
--

DROP TABLE IF EXISTS `athlete_program`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `athlete_program` (
  `id` int NOT NULL AUTO_INCREMENT,
  `athlete_id` int NOT NULL,
  `program_id` int NOT NULL,
  `status` enum('active','inactive','completed') NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `athlete_id` (`athlete_id`),
  KEY `program_id` (`program_id`),
  CONSTRAINT `athlete_program_ibfk_1` FOREIGN KEY (`athlete_id`) REFERENCES `users` (`id`),
  CONSTRAINT `athlete_program_ibfk_11` FOREIGN KEY (`athlete_id`) REFERENCES `users` (`id`),
  CONSTRAINT `athlete_program_ibfk_13` FOREIGN KEY (`athlete_id`) REFERENCES `users` (`id`),
  CONSTRAINT `athlete_program_ibfk_15` FOREIGN KEY (`athlete_id`) REFERENCES `users` (`id`),
  CONSTRAINT `athlete_program_ibfk_17` FOREIGN KEY (`athlete_id`) REFERENCES `users` (`id`),
  CONSTRAINT `athlete_program_ibfk_18` FOREIGN KEY (`program_id`) REFERENCES `training_program` (`id`),
  CONSTRAINT `athlete_program_ibfk_3` FOREIGN KEY (`athlete_id`) REFERENCES `users` (`id`),
  CONSTRAINT `athlete_program_ibfk_5` FOREIGN KEY (`athlete_id`) REFERENCES `users` (`id`),
  CONSTRAINT `athlete_program_ibfk_7` FOREIGN KEY (`athlete_id`) REFERENCES `users` (`id`),
  CONSTRAINT `athlete_program_ibfk_9` FOREIGN KEY (`athlete_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `athlete_program`
--

LOCK TABLES `athlete_program` WRITE;
/*!40000 ALTER TABLE `athlete_program` DISABLE KEYS */;
INSERT INTO `athlete_program` VALUES (1,2,1,'completed','2025-03-29 09:44:11','2025-03-29 09:54:21');
/*!40000 ALTER TABLE `athlete_program` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedbacks`
--

DROP TABLE IF EXISTS `feedbacks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedbacks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `athlete_id` int NOT NULL,
  `program_id` int NOT NULL,
  `message` text NOT NULL,
  `response_message` varchar(255) DEFAULT NULL,
  `response_date` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `athlete_id` (`athlete_id`),
  KEY `program_id` (`program_id`),
  CONSTRAINT `feedbacks_ibfk_1` FOREIGN KEY (`athlete_id`) REFERENCES `users` (`id`),
  CONSTRAINT `feedbacks_ibfk_11` FOREIGN KEY (`athlete_id`) REFERENCES `users` (`id`),
  CONSTRAINT `feedbacks_ibfk_13` FOREIGN KEY (`athlete_id`) REFERENCES `users` (`id`),
  CONSTRAINT `feedbacks_ibfk_15` FOREIGN KEY (`athlete_id`) REFERENCES `users` (`id`),
  CONSTRAINT `feedbacks_ibfk_17` FOREIGN KEY (`athlete_id`) REFERENCES `users` (`id`),
  CONSTRAINT `feedbacks_ibfk_18` FOREIGN KEY (`program_id`) REFERENCES `training_program` (`id`),
  CONSTRAINT `feedbacks_ibfk_3` FOREIGN KEY (`athlete_id`) REFERENCES `users` (`id`),
  CONSTRAINT `feedbacks_ibfk_5` FOREIGN KEY (`athlete_id`) REFERENCES `users` (`id`),
  CONSTRAINT `feedbacks_ibfk_7` FOREIGN KEY (`athlete_id`) REFERENCES `users` (`id`),
  CONSTRAINT `feedbacks_ibfk_9` FOREIGN KEY (`athlete_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedbacks`
--

LOCK TABLES `feedbacks` WRITE;
/*!40000 ALTER TABLE `feedbacks` DISABLE KEYS */;
INSERT INTO `feedbacks` VALUES (1,2,1,'Harika bir programdı, çok faydalı oldu!','Geri bildiriminiz için teşekkür ederim. Başarılar dilerim.','2025-03-29 09:45:31','2025-03-29 09:45:00','2025-03-29 09:45:31');
/*!40000 ALTER TABLE `feedbacks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `training_program`
--

DROP TABLE IF EXISTS `training_program`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `training_program` (
  `id` int NOT NULL AUTO_INCREMENT,
  `coach_id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `coach_id` (`coach_id`),
  CONSTRAINT `training_program_ibfk_1` FOREIGN KEY (`coach_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `training_program`
--

LOCK TABLES `training_program` WRITE;
/*!40000 ALTER TABLE `training_program` DISABLE KEYS */;
INSERT INTO `training_program` VALUES (1,3,'Yeni Program Başlığı','Yeni açıklama','2025-01-01 00:00:00','2025-12-31 23:59:59','2025-03-29 09:42:15','2025-03-29 09:43:55');
/*!40000 ALTER TABLE `training_program` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('coach','athlete','admin') NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `email_2` (`email`),
  UNIQUE KEY `email_3` (`email`),
  UNIQUE KEY `email_4` (`email`),
  UNIQUE KEY `email_5` (`email`),
  UNIQUE KEY `email_6` (`email`),
  UNIQUE KEY `email_7` (`email`),
  UNIQUE KEY `email_8` (`email`),
  UNIQUE KEY `email_9` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','admin@example.com','$2b$10$viUKtdOkJtR4WynBIYFYxuJWhOmklHNIDQFtF27zCvbVGreM8lAv2','admin','2025-03-29 09:38:48','2025-03-29 10:03:53'),(2,'Ela Başaran','ela@example.com','$2b$10$iMMNwjCGuM6b3LnUWzJRDe.oH1qdyRAl2QLTrgE.KFHl4xhuLkhGS','athlete','2025-03-29 09:40:54','2025-03-29 09:40:54'),(3,'Seda Başaran','seda@example.com','$2b$10$N1ikKTUAnt4h.GMgY5AaueCYbg78AdHVxCoLtWUlIWIMoHF3GRY6K','coach','2025-03-29 09:41:29','2025-03-29 09:58:34');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `workouts`
--

DROP TABLE IF EXISTS `workouts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `workouts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `program_id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `duration` int NOT NULL,
  `calories_burned` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `program_id` (`program_id`),
  CONSTRAINT `workouts_ibfk_1` FOREIGN KEY (`program_id`) REFERENCES `training_program` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `workouts`
--

LOCK TABLES `workouts` WRITE;
/*!40000 ALTER TABLE `workouts` DISABLE KEYS */;
INSERT INTO `workouts` VALUES (1,1,'Beach Press',30,200,'2025-03-29 09:42:15','2025-03-29 09:42:15'),(2,1,'Squat',40,250,'2025-03-29 09:42:15','2025-03-29 09:42:15');
/*!40000 ALTER TABLE `workouts` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-29 13:15:37
