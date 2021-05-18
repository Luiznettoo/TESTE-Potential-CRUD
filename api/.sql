CREATE TABLE `test-db`.`developers` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `sexo` VARCHAR(2) NOT NULL,
  `idade` INT(10) NOT NULL,
  `hobby` VARCHAR(45) NOT NULL,
  `datanascimento` DATE NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

