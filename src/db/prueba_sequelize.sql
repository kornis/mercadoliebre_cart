
CREATE TABLE `cart` (
  `id` int(20) UNSIGNED NOT NULL,
  `id_user` int(20) UNSIGNED NOT NULL,
  `status` int(3) UNSIGNED NOT NULL
) ;

CREATE TABLE `images` (
  `id` int(20) NOT NULL,
  `path` text(250) NOT NULL,
  `id_product` int(20) UNSIGNED NOT NULL
) ;

CREATE TABLE `users` (
  `id` int(20) UNSIGNED NOT NULL,
  `email` text(100) NOT NULL,
  `password` text(250) NOT NULL,
  `avatar` text(250) NOT NULL,
  `id_imagen` int(20) DEFAULT NULL
) ;

CREATE TABLE `cart_product` (
  `id` int(20) UNSIGNED NOT NULL,
  `id_product` int(20) UNSIGNED NOT NULL,
  `id_cart` int(10) UNSIGNED NOT NULL,
  `cant` int(10) UNSIGNED NOT NULL
) ;


CREATE TABLE `cart_product` (
  `id` int(20) UNSIGNED NOT NULL,
  `id_product` int(20) UNSIGNED NOT NULL,
  `id_cart` int(10) UNSIGNED NOT NULL,
  `cant` int(10) UNSIGNED NOT NULL
) ;


CREATE TABLE `products` (
  `id` int(20) UNSIGNED NOT NULL,
  `title` text(150) NOT NULL,
  `description` text NOT NULL,
  `price` decimal(10,0) NOT NULL
) ;



INSERT INTO `users` (`id`, `email`, `password`, `avatar`, `id_imagen`) VALUES
(17, 'fede@fede.com', '123456', 'avatar - 1615503954122.jpg', 37);





INSERT INTO `images` (`id`, `path`, `id_product`) VALUES
(44, 'images - 1615509685428.jpg', 21),
(46, 'images - 1615512648103.jpg', 21),
(47, 'images - 1615512648110.jpg', 21),
(48, 'images - 1615673836701.jpg', 22),
(49, 'images - 1615673897473.jpg', 23);


INSERT INTO `products` (`id`, `title`, `description`, `price`) VALUES
(21, 'telefono celular 2', 'celular samsung 2', '15000'),
(22, 'parlante nuevo', 'asdasdasda', '1000'),
(23, 'cafetera', 'asdasdasda', '1000');





INSERT INTO `cart` (`id`, `id_user`, `status`) VALUES
(1, 17, 0),
(2, 17, 1);

INSERT INTO `cart_product` (`id`, `id_product`, `id_cart`, `cant`) VALUES
(8, 21, 2, 11),
(9, 22, 2, 9),
(10, 23, 2, 3);


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
  MODIFY `id` int(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

ALTER TABLE `cart_product`
  MODIFY `id` int(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

ALTER TABLE `images`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

ALTER TABLE `products`
  MODIFY `id` int(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

ALTER TABLE `users`
  MODIFY `id` int(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;


ALTER TABLE `users`
  ADD CONSTRAINT `RELACION1` FOREIGN KEY (`id_imagen`) REFERENCES `images` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
