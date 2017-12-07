--
-- Déclencheurs `business_product`
--
DELIMITER $$
CREATE TRIGGER `prj_product_in_business` BEFORE INSERT ON `business_product` FOR EACH ROW UPDATE product
SET quantity_real = quantity_real - NEW.quantity
WHERE id = NEW.product_id
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `prj_product_in_business_del` BEFORE DELETE ON `business_product` FOR EACH ROW UPDATE product
SET quantity_real = quantity_real + OLD.quantity
WHERE id = OLD.product_id
$$
DELIMITER ;
--
-- Déclencheurs `product_order`
--
DELIMITER $$
CREATE TRIGGER `prj_order` AFTER INSERT ON `product_order` FOR EACH ROW UPDATE product
SET quantity_real = quantity_real + NEW.quantity
WHERE id = NEW.product_id
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `prj_order_del` BEFORE DELETE ON `product_order` FOR EACH ROW UPDATE product
SET quantity_real = quantity_real - OLD.quantity
WHERE id = OLD.product_id
$$
DELIMITER ;