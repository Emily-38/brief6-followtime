-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : lun. 27 mai 2024 à 14:34
-- Version du serveur : 8.2.0
-- Version de PHP : 8.2.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `followtime`
--

-- --------------------------------------------------------

--
-- Structure de la table `confidentialité`
--

DROP TABLE IF EXISTS `confidentialité`;
CREATE TABLE IF NOT EXISTS `confidentialité` (
  `id` int NOT NULL AUTO_INCREMENT,
  `status` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `confidentialité`
--

INSERT INTO `confidentialité` (`id`, `status`) VALUES
(3, 'privé'),
(4, 'public');

-- --------------------------------------------------------

--
-- Structure de la table `followers`
--

DROP TABLE IF EXISTS `followers`;
CREATE TABLE IF NOT EXISTS `followers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `source_id` int NOT NULL COMMENT 'de qui',
  `cible_id` int NOT NULL COMMENT 'a qui ',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `cible_id` (`cible_id`),
  KEY `source_id` (`source_id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `followers`
--

INSERT INTO `followers` (`id`, `source_id`, `cible_id`, `created_at`) VALUES
(3, 56, 57, '2024-05-17 11:19:52'),
(9, 60, 60, '2024-05-18 11:28:50'),
(10, 61, 61, '2024-05-18 14:05:20'),
(11, 61, 56, '2024-05-18 17:52:41'),
(12, 56, 56, '2024-05-19 07:56:57'),
(23, 56, 62, '2024-05-22 14:26:25'),
(24, 62, 62, '2024-05-22 16:25:00'),
(25, 62, 56, '2024-05-22 16:27:26');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `pseudo` varchar(255) NOT NULL,
  `image` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `banniere` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT 'banniere-1715679976552.jpg',
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL DEFAULT 'user',
  `confidentialité_id` int NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `confidentialité_id` (`confidentialité_id`)
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `email`, `pseudo`, `image`, `banniere`, `password`, `role`, `confidentialité_id`, `token`, `created_at`, `isActive`) VALUES
(56, 'oki@oki.oki', 'oki', 'image-1715680717803.jpg', 'banniere-1715679976552.jpg', '$2b$10$gdEAi/ZnEnd77FEU19N8PuqNd.o32xy/FIdjB2xAr9abdWeLias/C', 'user', 4, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im9raUBva2kub2tpIiwiaWF0IjoxNzE2Mzc0NDE5LCJleHAiOjE3MTYzNzgwMTl9.uye2tGtVChdQIHqlc82y_gVb_G7D-bNc8Y0Pn-k5bWo', '2024-05-14 11:58:37', 1),
(57, 'wesh@wesh.weshl', 'weshl', 'image-1715679188055.jpg', 'banniere-1715679976552.jpg 	', '$2b$10$YvxcK.YYAKT57JjWLhdcG.Ti.7XiH.poMYuXFljAv.dBqImcf.cva', 'user', 4, '$2b$10$50jHNNe3viq4W1ofG.ryQuYGqWWcWAXdzzNddVa3pJc6kdo.C9pGO', '2024-05-14 16:17:12', 1),
(60, 'ok@ok.ok', 'ok', 'image-1715603633373.jpg', 'banniere-1715679976552.jpg 	', '$2b$10$eX.88kjjvKPmnP.grYggg.nwZuYm6XRC3moxLUAzv/wXygbw6h6Tm', 'user', 4, '$2b$10$CMTK1Igwx9A9wqtzpmOKAup.x1dX4XWDkD5A.Dpm2OT.f8f8H0thi', '2024-05-18 11:28:50', 0),
(61, 'mus@mus.mus', 'Mus', 'image-1716283134635.jpg', 'image-1716283516765.jpg', '$2b$10$e3FxGZS4cMAAZ.S5O0v87u/udKcwg/0TbY45yjAKIrivOHQmrw6Z.', 'user', 4, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjEsImVtYWlsIjoibXVzQG11cy5tdXMiLCJpYXQiOjE3MTYyOTM1MTUsImV4cCI6MTcxNjI5NzExNX0.AvcW0p4FrBbJDQ0h4zA17yMdNW5s9qPj9yfxltda8wQ', '2024-05-18 14:05:20', 1),
(62, 'admin@admin.admin', 'admin', 'image-1716098645354.jpg', 'banniere-1715679976552.jpg', '$2b$10$OjkmpxgDKl/rWl5OzOE1A.VII2PwcJ/6RRpYZ4r6aumKXdIo.W0Za', 'admin', 3, '$2b$10$ik12NSHlqCwVC6XcNGLjOfroch7n8mRmt0cb/HcKLRJspUhse7e6', '2024-05-19 08:04:05', 1);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`cible_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`source_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Contraintes pour la table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`confidentialité_id`) REFERENCES `confidentialité` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
