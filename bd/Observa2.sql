-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 13-11-2018 a las 03:32:36
-- Versión del servidor: 10.1.35-MariaDB
-- Versión de PHP: 7.2.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `basedatos`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `procedimiento1` ()  BEGIN
    SELECT codPostal, count(codPostal) 
    FROM afiliados a  INNER JOIN gruposfamiliares gf ON a.grupoFamiliar=gf.idGrupoFamiliar 
    WHERE estadoAfiliado(a.idAfiliado)=1 
    GROUP BY codPostal;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `prPolitica` (IN `accion` VARCHAR(200), IN `pgd_codi` INT(11), IN `pgd_nomb` VARCHAR(200), IN `pgd_desc` VARCHAR(200))  BEGIN
	INSERT INTO obs_pgdi (pgd_desc,pgd_nomb) VALUES (pgd_desc,pgd_nomb);
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `obs_acge`
--

CREATE TABLE `obs_acge` (
  `ACG_CODI` int(11) NOT NULL,
  `ACG_DESC` longtext NOT NULL,
  `ACG_CRCA` mediumtext
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Actividades de gestión';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `obs_arbol`
--

CREATE TABLE `obs_arbol` (
  `id` varchar(10) NOT NULL,
  `parentid` varchar(10) NOT NULL,
  `text` varchar(1000) NOT NULL,
  `value` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `obs_arbol`
--

INSERT INTO `obs_arbol` (`id`, `parentid`, `text`, `value`) VALUES
('71', '-1', 'POLITICA UNO', NULL),
('a13', '71', 'COMPONENTE UNO', NULL),
('b7', 'a13', 'CATEGORIA UNA', NULL),
('7', 'b7', 'Actividad UNA', '5'),
('9', 'b7', 'ACTIVIIDAD DOS', '6'),
('b9', 'a13', 'CAT1', NULL),
('10', 'b9', 'ACTIVIIDAD DOS', '6'),
('a14', '71', 'COMPONENTE DOS', NULL),
('b8', 'a14', 'CATEGORIA UNA', NULL),
('8', 'b8', 'Actividad tres', '7');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `obs_arbol2`
--

CREATE TABLE `obs_arbol2` (
  `id` varchar(10) NOT NULL,
  `parentid` varchar(10) NOT NULL,
  `text` varchar(1000) NOT NULL,
  `value` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `obs_arbol2`
--

INSERT INTO `obs_arbol2` (`id`, `parentid`, `text`, `value`) VALUES
('71', '-1', 'POLITICA UNO', '73.25'),
('a13', '71', 'COMPONENTE UNO', '70'),
('b7', 'a13', 'CATEGORIA UNA', '73'),
('7', 'b7', 'Actividad UNA', '90'),
('9', 'b7', 'ACTIVIIDAD DOS', '56'),
('b9', 'a13', 'CAT1', '67'),
('10', 'b9', 'ACTIVIIDAD DOS', '67'),
('a14', '71', 'COMPONENTE DOS', '80'),
('b8', 'a14', 'CATEGORIA UNA', '80'),
('8', 'b8', 'Actividad tres', '80');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `obs_cate`
--

CREATE TABLE `obs_cate` (
  `CAT_CODI` int(11) NOT NULL,
  `CAT_DESC` mediumtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `obs_comp`
--

CREATE TABLE `obs_comp` (
  `COM_CODI` int(11) NOT NULL,
  `COM_DESC` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `obs_dime`
--

CREATE TABLE `obs_dime` (
  `DIM_CODI` int(11) NOT NULL COMMENT 'Código de la dimensión',
  `DIM_NOMB` varchar(45) NOT NULL COMMENT 'Nombre de la Dimensión',
  `DIM_DESC` varchar(45) DEFAULT NULL COMMENT 'Descripción de la dimensión'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Dimensiones:\n\nI. Talento Humano : Núcleo IMPG y se relaciona con las siguientes PGDI: \n    a. Gestión Estratégica del Talento        Humano.\n    b. Integridad.\nII. Direccionamiento estratégico y planeación: Planear y se relaciona con las siguientes PGDI:\n    a. Planeación Institucional.\n    b. Gestión presupuestal y eficiencia     del gasto público.\nIII. Gestión con valores para el resultado:  Hacer y se relaciona con las siguientes PGDI:\nDe la ventanilla hacia adentro:\n     a. Fortalecimiento organizacional y               simplificación de procesos\n     b. Gestión Presupuestal y eficiencia             del Gasto público\n     c. Gobierno Digital, antes Gobierno          en Línea: TIC para la gestión y          Seguridad de la información\n     a. Seguridad Digital\n     b. Defensa jurídica\nRelación Estado Ciudadano:\n     a. Servicio al Ciudadano\n     b. Racionalización de Trámites\n     c. Participación ciudadana en la         gestión pública\n     d. Gobierno Digital, antes Gobierno en  Línea: TIC para el servicio y TIC         para Gobierno Abierto \nIV. Evaluación para el resultado: Verificar y Actuar y se relaciona con las siguientes PGDI:\n    a. Seguimiento y evaluación del     desempeño institucional \nV. Control Interno: Verificar y Actuar y se relaciona con las siguientes PGDI:\n    a. Control interno\nVI. Información y Comunicación: Dimensión Transversal y se relaciona con las siguientes PGDI:\n    a. Gestión Documental\n    b. Transparencia, acceso a la                   información pública y lucha contra           la corrupción\n\n7. Gestión del conocimiento y la innovación: Dimensión Transversal y se relaciona con las siguientes PGDI:\n    a. Gestión del conocimiento y la         innovación.';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `obs_dime_pgdi`
--

CREATE TABLE `obs_dime_pgdi` (
  `DPG_DIME_CODI` int(11) NOT NULL COMMENT 'Código de la Dimensión',
  `DPG_PGDI_CODI` int(11) NOT NULL COMMENT 'Código de la política de gestión y desempeño institucional',
  `DPG_VERM_CODI` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `obs_enpc`
--

CREATE TABLE `obs_enpc` (
  `EPC_CODI` int(11) NOT NULL,
  `EPC_ENPG_CODI` int(11) NOT NULL,
  `EPC_COMP_CODI` int(11) NOT NULL,
  `EPC_CALI` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `obs_enpg`
--

CREATE TABLE `obs_enpg` (
  `EPG_CODI` int(11) NOT NULL,
  `EPG_ENTI_CODI` int(11) NOT NULL,
  `EPG_PGDI_CODI` int(11) NOT NULL,
  `EPG_FINI` date NOT NULL,
  `EPG_FFIN` date NOT NULL,
  `EPG_PUNT` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `obs_enti`
--

CREATE TABLE `obs_enti` (
  `ENT_CODI` int(11) NOT NULL,
  `ENT_NOMB` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `obs_epcc`
--

CREATE TABLE `obs_epcc` (
  `ECC_CODI` int(11) NOT NULL,
  `ECC_ENPC_CODI` int(11) NOT NULL,
  `ECC_CATE_CODI` int(11) NOT NULL,
  `ECC_CALI` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `obs_epcc_acge`
--

CREATE TABLE `obs_epcc_acge` (
  `CCA_CODI` int(11) NOT NULL,
  `CCA_EPCC_CODI` int(11) NOT NULL,
  `CCA_ACGE_CODI` int(11) NOT NULL,
  `CCA_PUNT` float NOT NULL,
  `CCA_VALO_CONS` int(11) DEFAULT NULL,
  `CCA_EVID` mediumblob
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `obs_pgdi`
--

CREATE TABLE `obs_pgdi` (
  `PGD_CODI` int(11) NOT NULL COMMENT 'Código de las Políticas de Gestión y desempeño institucional',
  `PGD_NOMB` varchar(200) NOT NULL COMMENT 'Nombre de las Políticas de Gestión y desempeño institucional',
  `PGD_DESC` longtext COMMENT 'Descripción de las Políticas de Gestión y desempeño institucional'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Políticas de Gestión y desempeño institucional (Decreto 1499 de 2017 :\n\n1. Planeación Institucional\n2. Gestión presupuestal y eficiencia del gasto público\n3. Talento humano\n4. Integridad\n5. Transparencia, acceso a la información pública y lucha contra la corrupción\n6. Fortalecimiento organizacional y simplificación de procesos\n7. Servicio al ciudadano\n8. Participación ciudadana en la gestión pública\n9. Racionalización de trámites\n10. Gestión documental\n11. Gobierno Digital, antes Gobierno en Línea\n12. Seguridad Digital\n13. Defensa jurídica\n14. Gestión del conocimiento y la innovación\n15. Control interno\n16. Seguimiento y evaluación del desempeño institucional';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `obs_valo`
--

CREATE TABLE `obs_valo` (
  `VAL_CONS` int(11) NOT NULL,
  `VAL_ACGE_CODI` int(11) NOT NULL,
  `VAL_INFE` float NOT NULL,
  `VAL_SUPE` float NOT NULL,
  `VAL_DESC` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Valoración';

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `obs_acge`
--
ALTER TABLE `obs_acge`
  ADD PRIMARY KEY (`ACG_CODI`);

--
-- Indices de la tabla `obs_cate`
--
ALTER TABLE `obs_cate`
  ADD PRIMARY KEY (`CAT_CODI`);

--
-- Indices de la tabla `obs_comp`
--
ALTER TABLE `obs_comp`
  ADD PRIMARY KEY (`COM_CODI`);

--
-- Indices de la tabla `obs_dime`
--
ALTER TABLE `obs_dime`
  ADD PRIMARY KEY (`DIM_CODI`);

--
-- Indices de la tabla `obs_dime_pgdi`
--
ALTER TABLE `obs_dime_pgdi`
  ADD PRIMARY KEY (`DPG_DIME_CODI`,`DPG_PGDI_CODI`),
  ADD KEY `fk_OBS_DIME_has_OBS_PGDI_OBS_PGDI1` (`DPG_PGDI_CODI`);

--
-- Indices de la tabla `obs_enpc`
--
ALTER TABLE `obs_enpc`
  ADD PRIMARY KEY (`EPC_CODI`),
  ADD KEY `fk_OBS_ENTI_PGDI_has_OBS_COMP_OBS_ENTI_PGDI1` (`EPC_ENPG_CODI`),
  ADD KEY `fk_OBS_ENTI_PGDI_has_OBS_COMP_OBS_COMP1` (`EPC_COMP_CODI`);

--
-- Indices de la tabla `obs_enpg`
--
ALTER TABLE `obs_enpg`
  ADD PRIMARY KEY (`EPG_CODI`),
  ADD KEY `fk_OBS_ENTI_has_OBS_PGDI_OBS_ENTI1` (`EPG_ENTI_CODI`),
  ADD KEY `fk_OBS_ENTI_has_OBS_PGDI_OBS_PGDI1` (`EPG_PGDI_CODI`);

--
-- Indices de la tabla `obs_enti`
--
ALTER TABLE `obs_enti`
  ADD PRIMARY KEY (`ENT_CODI`);

--
-- Indices de la tabla `obs_epcc`
--
ALTER TABLE `obs_epcc`
  ADD PRIMARY KEY (`ECC_CODI`),
  ADD KEY `fk_OBS_ENTI_PGDI_COMP_has_OBS_CATE_OBS_ENTI_PGDI_COMP1` (`ECC_ENPC_CODI`),
  ADD KEY `fk_OBS_ENTI_PGDI_COMP_has_OBS_CATE_OBS_CATE1` (`ECC_CATE_CODI`);

--
-- Indices de la tabla `obs_epcc_acge`
--
ALTER TABLE `obs_epcc_acge`
  ADD PRIMARY KEY (`CCA_CODI`),
  ADD KEY `fk_OBS_ENTI_PGDI_COMP_CATE_has_OBS_ACGE_OBS_ENTI_PGDI_COMP_CA1` (`CCA_EPCC_CODI`),
  ADD KEY `fk_OBS_ENTI_PGDI_COMP_CATE_has_OBS_ACGE_OBS_ACGE1` (`CCA_ACGE_CODI`),
  ADD KEY `fk_OBS_EPCC_ACGE_OBS_VALO1` (`CCA_VALO_CONS`);

--
-- Indices de la tabla `obs_pgdi`
--
ALTER TABLE `obs_pgdi`
  ADD PRIMARY KEY (`PGD_CODI`);

--
-- Indices de la tabla `obs_valo`
--
ALTER TABLE `obs_valo`
  ADD PRIMARY KEY (`VAL_CONS`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `obs_acge`
--
ALTER TABLE `obs_acge`
  MODIFY `ACG_CODI` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `obs_cate`
--
ALTER TABLE `obs_cate`
  MODIFY `CAT_CODI` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `obs_comp`
--
ALTER TABLE `obs_comp`
  MODIFY `COM_CODI` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `obs_dime`
--
ALTER TABLE `obs_dime`
  MODIFY `DIM_CODI` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Código de la dimensión';

--
-- AUTO_INCREMENT de la tabla `obs_enpc`
--
ALTER TABLE `obs_enpc`
  MODIFY `EPC_CODI` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `obs_enpg`
--
ALTER TABLE `obs_enpg`
  MODIFY `EPG_CODI` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `obs_enti`
--
ALTER TABLE `obs_enti`
  MODIFY `ENT_CODI` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `obs_epcc`
--
ALTER TABLE `obs_epcc`
  MODIFY `ECC_CODI` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `obs_epcc_acge`
--
ALTER TABLE `obs_epcc_acge`
  MODIFY `CCA_CODI` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `obs_pgdi`
--
ALTER TABLE `obs_pgdi`
  MODIFY `PGD_CODI` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Código de las Políticas de Gestión y desempeño institucional', AUTO_INCREMENT=72;

--
-- AUTO_INCREMENT de la tabla `obs_valo`
--
ALTER TABLE `obs_valo`
  MODIFY `VAL_CONS` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `obs_dime_pgdi`
--
ALTER TABLE `obs_dime_pgdi`
  ADD CONSTRAINT `fk_OBS_DIME_has_OBS_PGDI_OBS_DIME1` FOREIGN KEY (`DPG_DIME_CODI`) REFERENCES `obs_dime` (`DIM_CODI`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_OBS_DIME_has_OBS_PGDI_OBS_PGDI1` FOREIGN KEY (`DPG_PGDI_CODI`) REFERENCES `obs_pgdi` (`PGD_CODI`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `obs_enpc`
--
ALTER TABLE `obs_enpc`
  ADD CONSTRAINT `fk_OBS_ENTI_PGDI_has_OBS_COMP_OBS_COMP1` FOREIGN KEY (`EPC_COMP_CODI`) REFERENCES `obs_comp` (`COM_CODI`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_OBS_ENTI_PGDI_has_OBS_COMP_OBS_ENTI_PGDI1` FOREIGN KEY (`EPC_ENPG_CODI`) REFERENCES `obs_enpg` (`EPG_CODI`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `obs_enpg`
--
ALTER TABLE `obs_enpg`
  ADD CONSTRAINT `fk_OBS_ENTI_has_OBS_PGDI_OBS_ENTI1` FOREIGN KEY (`EPG_ENTI_CODI`) REFERENCES `obs_enti` (`ENT_CODI`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_OBS_ENTI_has_OBS_PGDI_OBS_PGDI1` FOREIGN KEY (`EPG_PGDI_CODI`) REFERENCES `obs_pgdi` (`PGD_CODI`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `obs_epcc`
--
ALTER TABLE `obs_epcc`
  ADD CONSTRAINT `fk_OBS_ENTI_PGDI_COMP_has_OBS_CATE_OBS_CATE1` FOREIGN KEY (`ECC_CATE_CODI`) REFERENCES `obs_cate` (`CAT_CODI`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_OBS_ENTI_PGDI_COMP_has_OBS_CATE_OBS_ENTI_PGDI_COMP1` FOREIGN KEY (`ECC_ENPC_CODI`) REFERENCES `obs_enpc` (`EPC_CODI`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `obs_epcc_acge`
--
ALTER TABLE `obs_epcc_acge`
  ADD CONSTRAINT `fk_OBS_ENTI_PGDI_COMP_CATE_has_OBS_ACGE_OBS_ACGE1` FOREIGN KEY (`CCA_ACGE_CODI`) REFERENCES `obs_acge` (`ACG_CODI`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_OBS_ENTI_PGDI_COMP_CATE_has_OBS_ACGE_OBS_ENTI_PGDI_COMP_CA1` FOREIGN KEY (`CCA_EPCC_CODI`) REFERENCES `obs_epcc` (`ECC_CODI`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_OBS_EPCC_ACGE_OBS_VALO1` FOREIGN KEY (`CCA_VALO_CONS`) REFERENCES `obs_valo` (`VAL_CONS`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
