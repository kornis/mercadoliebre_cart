SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

CREATE DATABASE IF NOT EXISTS 'prueba_sequelize';
use 'prueba_sequelize';

CREATE TABLE `cart` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `id_user` bigint(20) UNSIGNED NOT NULL,
  `status` tinyint(3) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `cart` (`id`, `id_user`, `status`) VALUES
(1, 17, 0),
(2, 17, 1);

CREATE TABLE `cart_product` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `id_product` bigint(20) UNSIGNED NOT NULL,
  `id_cart` int(10) UNSIGNED NOT NULL,
  `cant` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `cart_product` (`id`, `id_product`, `id_cart`, `cant`) VALUES
(8, 21, 2, 11),
(9, 22, 2, 9),
(10, 23, 2, 3);

CREATE TABLE `images` (
  `id` bigint(20) NOT NULL,
  `path` varchar(250) NOT NULL,
  `id_product` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `images` (`id`, `path`, `id_product`) VALUES
(37, 'avatar - 1615503954122.jpg', 0),
(42, 'images - 1615509559443.jpg', 0),
(43, 'images - 1615509559448.jpg', 0),
(44, 'images - 1615509685428.jpg', 21),
(46, 'images - 1615512648103.jpg', 21),
(47, 'images - 1615512648110.jpg', 21),
(48, 'images - 1615673836701.jpg', 22),
(49, 'images - 1615673897473.jpg', 23);

CREATE TABLE `products` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(150) NOT NULL,
  `description` text NOT NULL,
  `price` decimal(10,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `products` (`id`, `title`, `description`, `price`) VALUES
(21, 'telefono celular 2', 'celular samsung 2', '15000'),
(22, 'parlante nuevo', 'asdasdasda', '1000'),
(23, 'cafetera', 'asdasdasda', '1000');

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(250) NOT NULL,
  `avatar` varchar(250) NOT NULL,
  `id_imagen` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `users` (`id`, `email`, `password`, `avatar`, `id_imagen`) VALUES
(17, 'fede@fede.com', '123456', 'avatar - 1615503954122.jpg', 37);


ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `cart_product`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `images`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `RELACION1` (`id_imagen`);


ALTER TABLE `cart`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

ALTER TABLE `cart_product`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

ALTER TABLE `images`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

ALTER TABLE `products`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;


ALTER TABLE `users`
  ADD CONSTRAINT `RELACION1` FOREIGN KEY (`id_imagen`) REFERENCES `images` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
