/*create database veganByte;
use veganByte;

select * from Cliente;

select * from Talleres;

select * from Experiencias;


INSERT INTO Cliente (
    Nombre, Apellido, tipo_Documento, Numero_documento, Sexo, Correo, Contacto,
    fecha_Nacimiento, Direccion, Contrasena, is_verified, verification_token
)
VALUES (
    'Test', 'User', 'Cedula de ciudadania', '1234567892', 'Masculino', 'test.user@example.com', '3001234567',
    '1990-01-01', 'Test Address 123', '$2b$10$/wJVzhyNYqSvkW3vzPKKrujV5CtndKYd7gYzP9pRubtvNJAt1XRGK', TRUE, NULL
);*/

/*CREACIÓN DE TABLAS  PRIMARY/FOREIGN  KEYS*/

create table Cliente (
    Id_Cliente int not null auto_increment primary key,
    Nombre varchar(80) not null,
    Apellido varchar(80) not null,
    tipo_Documento enum("Cedula de ciudadania", "Pasaporte", "Cedula extranjero") not null,
    Numero_documento int not null,
    Sexo enum("Masculino", "Femenino", "Otro") not null,
    Correo varchar(80) not null,
    Contacto bigint check (Contacto >= 0 AND Contacto <= 99999999999) not null,
    fecha_Nacimiento date not null,
    Direccion varchar(80) not null,
    Contrasena varchar(80) not null,
    is_verified BOOLEAN DEFAULT FALSE,
    verification_token VARCHAR(255) NULL
);
create table Administradores (
    Id_Administradores int not null auto_increment primary key,
    Nombre varchar(80) not null,
    Apellido varchar(80) not null,
    Usuario varchar(80) unique not null,
    Contrasena varchar(255) not null,
    Correo varchar(80) not null,
    tipo_Documento enum("Cedula de ciudadania", "Pasaporte", "Cedula extranjero") not null,
    Numero_documento int not null,
    Sexo enum("Masculino", "Femenino", "Otro") not null,
    Contacto bigint check (Contacto >= 0 AND Contacto <= 99999999999) not null,
    Direccion varchar(80) not null,
    fecha_Nacimiento date not null,
    Ultimo_login datetime,
    Rol enum('Admin', 'SuperAdmin') default 'Admin'
);

create table Blog (
    Id_Blog int not null auto_increment primary key,
    Id_Administradores int not null,
    fecha_Publicacion date not null,
    imagen_Publicada varchar(80) not null,
    video_Publicado varchar(80) not null,
    Titulo_Publicacion varchar(80) not null,
    Comentarios_Publicacion varchar(80) not null,
    foreign key (Id_Administradores) references Administradores(Id_Administradores)
);

create table Reserva (
    Id_Reserva int not null auto_increment primary key,
    Id_Administradores int not null,
    Id_Cliente int not null,
    Valor_Total int,
    Fecha_Reserva date,
    hora_Salida time,
    hora_Ingreso time,
    Estado enum("Aprobado", "Cancelado", "En proceso"),
    foreign key (Id_Administradores) references Administradores(Id_Administradores),
    foreign key (Id_Cliente) references Cliente(Id_Cliente)
);

create table Talleres (
    Id_Taller int auto_increment primary key,
    Id_Reserva int null, -- Permitir NULL para eventos independientes
    nombre_Taller varchar(80),
    fecha date,
    Hora_Inicio time,
    Hora_Fin time,
    Valor int,
    cant_Personas int,
    Estado ENUM('Disponible', 'Cancelado', 'Completo') DEFAULT 'Disponible',
    foreign key (Id_Reserva) references Reserva(Id_Reserva)
);

create table Hospedaje (
    Id_Hospedaje int auto_increment primary key,
    Id_Reserva int not null,
    tipo_Hospedaje varchar(80),
    hora_Ingreso time,
    tipo_Habitacion varchar(80),
    alquiler_Camping enum("Si", "No"),
    Valor int,
    cant_Personas int,
    servicio_Comida enum("Si", "No"),
    foreign key (Id_Reserva) references Reserva(Id_Reserva)
);

create table Experiencias (
    Id_Experiencias int auto_increment primary key,
    Id_Reserva int null, -- Permitir NULL para eventos independientes
    Tipo varchar(80),
    Descripcion varchar(80),
    Categoria enum("1", "2", "3"),
    Valor int,
    cant_Personas int,
    Fecha DATE,
    Hora_Inicio TIME,
    Hora_Fin TIME,
    nivel_Running int,
    duracion_Desplazamiento time,
    duracion_Caminata time,
    servicios_Termales enum("Si", "No"),
    Ubicacion varchar(80),
    Estado ENUM('Disponible', 'Cancelado', 'Completo') DEFAULT 'Disponible',
    foreign key (Id_Reserva) references Reserva(Id_Reserva)
);

create table InscripcionesEventos (
    Id_Inscripcion int not null auto_increment primary key,
    Id_Cliente int not null,
    Id_Evento int not null,
    Tipo_Evento enum('taller', 'experiencia') not null,
    Fecha_Inscripcion datetime default current_timestamp,
    foreign key (Id_Cliente) references Cliente(Id_Cliente)
);


DELIMITER $$

CREATE PROCEDURE AgendarReserva(
    IN clienteID INT,
    IN numPersonas INT,
    IN talleresSolicitados JSON,
    IN experienciasSolicitadas JSON,
    IN alojamientoSolicitado JSON,
    IN fechaReserva DATE,
    IN horaIngreso TIME,
    IN horaSalida TIME,
    IN adminID INT
)
BEGIN
    DECLARE valorTotal INT DEFAULT 0;
    DECLARE reservaID INT;

    -- Insertar reserva en la tabla Reserva
    INSERT INTO Reserva (Id_Administradores, Id_Cliente, Valor_Total, Fecha_Reserva, hora_Ingreso, hora_Salida, Estado)
    VALUES (adminID, clienteID, 0, fechaReserva, horaIngreso, horaSalida, 'En proceso');

    -- Obtener el ID de la reserva recién insertada
    SET reservaID = LAST_INSERT_ID();

    -- Procesar los talleres solicitados
    IF JSON_LENGTH(talleresSolicitados) > 0 THEN
        INSERT INTO Talleres (Id_Reserva, nombre_Taller, fecha, hora_Inicio, hora_Fin, Valor)
        SELECT reservaID, JSON_UNQUOTE(JSON_EXTRACT(taller, '$.nombre')), 
                         JSON_UNQUOTE(JSON_EXTRACT(taller, '$.fecha')),
                         JSON_UNQUOTE(JSON_EXTRACT(taller, '$.horaInicio')),
                         JSON_UNQUOTE(JSON_EXTRACT(taller, '$.horaFin')),
                         JSON_UNQUOTE(JSON_EXTRACT(taller, '$.valor'))
        FROM JSON_TABLE(talleresSolicitados, '$[*]' COLUMNS (taller JSON PATH '$')) AS jt;

        -- Sumar el valor de los talleres al valor total
        SET valorTotal = valorTotal + (SELECT SUM(Valor) FROM Talleres WHERE Id_Reserva = reservaID);
    END IF;

    -- Procesar las experiencias solicitadas
    IF JSON_LENGTH(experienciasSolicitadas) > 0 THEN
        INSERT INTO Experiencias (Id_Reserva, Tipo, Descripcion, Categoria, Valor, cant_Personas, nivel_Running, duracion_Desplazamiento, duracion_Caminata, servicios_Termales, Ubicacion)
        SELECT reservaID, JSON_UNQUOTE(JSON_EXTRACT(experiencia, '$.tipo')), 
                         JSON_UNQUOTE(JSON_EXTRACT(experiencia, '$.descripcion')),
                         JSON_UNQUOTE(JSON_EXTRACT(experiencia, '$.categoria')),
                         JSON_UNQUOTE(JSON_EXTRACT(experiencia, '$.valor')),
                         JSON_UNQUOTE(JSON_EXTRACT(experiencia, '$.cantPersonas')),
                         JSON_UNQUOTE(JSON_EXTRACT(experiencia, '$.nivelRunning')),
                         JSON_UNQUOTE(JSON_EXTRACT(experiencia, '$.duracionDesplazamiento')),
                         JSON_UNQUOTE(JSON_EXTRACT(experiencia, '$.duracionCaminata')),
                         JSON_UNQUOTE(JSON_EXTRACT(experiencia, '$.serviciosTermales')),
                         JSON_UNQUOTE(JSON_EXTRACT(experiencia, '$.ubicacion'))
        FROM JSON_TABLE(experienciasSolicitadas, '$[*]' COLUMNS (experiencia JSON PATH '$')) AS jt;

        -- Sumar el valor de las experiencias al valor total
        SET valorTotal = valorTotal + (SELECT SUM(Valor) FROM Experiencias WHERE Id_Reserva = reservaID);
    END IF;

    -- Procesar el hospedaje solicitado
    IF JSON_LENGTH(alojamientoSolicitado) > 0 THEN
        INSERT INTO Hospedaje (Id_Reserva, tipo_Hospedaje, hora_Ingreso, tipo_Habitacion, alquiler_Camping, Valor, cant_Personas, servicio_Comida)
        VALUES (reservaID, 
                JSON_UNQUOTE(JSON_EXTRACT(alojamientoSolicitado, '$.tipoHospedaje')),
                horaIngreso,
                JSON_UNQUOTE(JSON_EXTRACT(alojamientoSolicitado, '$.tipoHabitacion')),
                JSON_UNQUOTE(JSON_EXTRACT(alojamientoSolicitado, '$.alquilerCamping')),
                JSON_UNQUOTE(JSON_EXTRACT(alojamientoSolicitado, '$.valor')),
                JSON_UNQUOTE(JSON_EXTRACT(alojamientoSolicitado, '$.cantPersonas')),
                JSON_UNQUOTE(JSON_EXTRACT(alojamientoSolicitado, '$.servicioComida')));

        -- Sumar el valor del hospedaje al valor total
        SET valorTotal = valorTotal + (SELECT Valor FROM Hospedaje WHERE Id_Reserva = reservaID);
    END IF;

    -- Actualizar el valor total de la reserva
    UPDATE Reserva
    SET Valor_Total = valorTotal
    WHERE Id_Reserva = reservaID;

END$$

DELIMITER ;

DELIMITER $$ 

CREATE PROCEDURE eliminarExperiencia(
	IN ReservaID int,
    IN nombreExperiencia varchar (80)
    )
    BEGIN
	delete from Experiencias
    where Id_Reserva = ReservaID and Descripcion = nombreExperiencia;
    
END$$
DELIMITER ;