-- MySQL dump 10.13  Distrib 5.7.42, for Linux (x86_64)
--
-- Host: localhost    Database: SPL
-- ------------------------------------------------------
-- Server version	5.7.42-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `tel` varchar(15) DEFAULT NULL,
  `bio` text,
  `sports` json DEFAULT NULL,
  `availability` tinyint(1) DEFAULT NULL,
  `reset_token` varchar(255) DEFAULT NULL,
  `city` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (10,'siso','$2b$12$CtHoTj3cuAjwWIcshTedmeyJ6ZyBZ3OhWJ2A2UfIwFyRA9nA2L492','siso@example.com','1234567890','I love sports!','[\"BOX\", \"basketball\"]',1,'-4P1wyfZBdijMA6nq_JLIQ','kenitra'),(13,'tio','$2b$12$JU6VN8NZqcT0HDe/YLseZ.IfxDPry7F0aqny3PDn7yodmSute/cR6','tio@example.com','1234567890','I love sports!','[\"BOX\", \"basketball\"]',1,NULL,'CASA'),(14,'simoowolf','$2b$12$o8U9NEB6LSa4o/OvpXWduusgTmyEXWKwaRETnBLs3VUs51LktsAeS','simoowolf@example.com','1234567890','I love sports!','[\"BOX\", \"basketball\"]',1,NULL,'Agadir'),(15,'lozo','$2b$12$RRqZ2KnOxNxKfCyJmHgP5OyKbVAr/gP0fXiCQypI0udlu8RjczuHi','lozo@example.com',NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-29  3:53:23
