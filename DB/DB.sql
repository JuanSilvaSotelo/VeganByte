create database veganByte;
use veganByte;

select * from Cliente;

select * from Talleres;

select * from In;

INSERT INTO Cliente (
    Nombre, Apellido, tipo_Documento, Numero_documento, Sexo, Correo, Contacto,
    fecha_Nacimiento, Direccion, Contraseña, is_verified, verification_token
)
VALUES (
    'Test', 'User', 'Cedula de ciudadania', '1234567892', 'Masculino', 'test.user@example.com', '3001234567',
    '1990-01-01', 'Test Address 123', '$2b$10$/wJVzhyNYqSvkW3vzPKKrujV5CtndKYd7gYzP9pRubtvNJAt1XRGK', TRUE, NULL
);

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
    Contraseña varchar(80) not null,
    is_verified BOOLEAN DEFAULT FALSE,
    verification_token VARCHAR(255) NULL
);
create table Administradores (
    Id_Administradores int not null auto_increment primary key,
    Nombre varchar(80) not null,
    Apellido varchar(80) not null,
    Usuario varchar(80) unique not null,
    Contraseña varchar(255) not null,
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
    hora_Inicio time,
    hora_Fin time,
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

CREACIÓN DEL PROCEDIMIENTO AGENDAR
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
/*
INSERT INTO Cliente (tipo_Documento, Sexo, Nombre, Apellido, Correo, Contacto, fecha_Nacimiento, Direccion, Contraseña)
VALUES ("Cedula de ciudadania", "Masculino", "Juan", "Pérez", "juan.perez@example.com", 3121234567, '1990-05-12', "Calle 123 #45-67", "password123");
INSERT INTO Cliente (tipo_Documento, Sexo, Nombre, Apellido, Correo, Contacto, fecha_Nacimiento, Direccion, Contraseña)
VALUES 
("Cedula de ciudadania", "Masculino", "Carlos", "Martínez", "carlos.martinez@example.com", 3145678901, '1991-03-20', "Calle 90 #12-34", "passwordghi"),
("Pasaporte", "Femenino", "Ana", "García", "ana.garcia@example.com", 3123456789, '1993-11-05', "Avenida 23 #45-67", "passwordjkl"),
("Cedula extranjero", "Masculino", "Felipe", "Sánchez", "felipe.sanchez@example.com", 3167890123, '1996-01-15', "Carrera 34 #56-78", "passwordmno"),
("Cedula de ciudadania", "Femenino", "Isabella", "Romero", "isabella.romero@example.com", 3101234567, '1997-09-22', "Transversal 56 #78-90", "passwordpqr"),
("Pasaporte", "Otro", "Gabriel", "López", "gabriel.lopez@example.com", 3159012345, '2000-02-10', "Diagonal 12 #34-56", "passwordstu");

INSERT INTO Administradores (Nombre, Apellido, Correo, tipo_Documento, Sexo, Contacto, Direccion, fecha_Nacimiento)
VALUES ('NombreAdmin', 'ApellidoAdmin', 'correo@admin.com', 'Cedula de ciudadania', 'Masculino', 1234567890, 'DireccionAdmin', '1980-01-01');
INSERT INTO Administradores (Nombre, Apellido, Correo, tipo_Documento, Sexo, Contacto, Direccion, fecha_Nacimiento)
VALUES 
('Juan', 'García', 'juan.garcia@admin.com', 'Cedula de ciudadania', 'Masculino', 1234567890, 'Calle 12 #34-56', '1980-01-01'),
('María', 'Rodríguez', 'maria.rodriguez@admin.com', 'Pasaporte', 'Femenino', 9876543210, 'Avenida 23 #45-67', '1985-06-15'),
('Carlos', 'Martínez', 'carlos.martinez@admin.com', 'Cedula extranjero', 'Masculino', 5551234567, 'Carrera 34 #56-78', '1990-03-20'),
('Ana', 'López', 'ana.lopez@admin.com', 'Cedula de ciudadania', 'Femenino', 7890123456, 'Transversal 56 #78-90', '1992-09-10'),
('Felipe', 'Sánchez', 'felipe.sanchez@admin.com', 'Pasaporte', 'Otro', 3456789012, 'Diagonal 12 #34-56', '1995-05-01'),
('Isabella', 'Romero', 'isabella.romero@admin.com', 'Cedula extranjero', 'Femenino', 9012345678, 'Calle 90 #12-34', '1998-02-25'),
('Gabriel', 'González', 'gabriel.gonzalez@admin.com', 'Cedula de ciudadania', 'Masculino', 5678901234, 'Avenida 45 #67-89', '2000-08-15');

INSERT INTO Experiencias (Id_Reserva, Tipo, Descripcion, Categoria, Valor, cant_Personas, nivel_Running, duracion_Desplazamiento, duracion_Caminata, servicios_Termales, Ubicacion)
VALUES 
(2, 'Senderismo', 'Recorrido por la montaña', '2', 50000, 5, 3, '02:00:00', '04:00:00', 'Si', 'Parque Nacional'),
(2, 'Ciclismo', 'Paseo por la ciudad', '1', 20000, 3, 2, '01:30:00', '00:00:00', 'No', 'Centro Urbano'),
(2, 'Escalada', 'Ascenso a la cima', '3', 80000, 2, 4, '03:00:00', '06:00:00', 'Si', 'Montaña Alta');
CALL AgendarReserva(
    1, -- ID del Cliente 1
    5, -- Número de personas 2
    '[{
        "nombre": "Taller de cocina",
        "fecha": "2024-09-20",
        "horaInicio": "10:00",
        "horaFin": "12:00",
        "valor": 100
    }]', -- Talleres solicitados 3 
    '[]', -- Experiencias solicitadas 4 
    '[{
        "tipoHospedaje": "Glamping",
        "horaIngreso": "19:00",
        "tipoHabitacion": "Habitación doble",
        "alquilerCamping": "No",
        "valor": 500,
        "cantPersonas": 5,
        "servicioComida": "Si"
    }]', -- Hospedaje solicitado 5
    '2024-09-20', -- Fecha de la reserva 6
    '07:00', -- Hora de la reserva 7
    '10:00', -- Hora de la reserva 8
    1 -- ID del Administrador 9
);
CALL AgendarReserva(
    2,  -- clienteID
    2,  -- numPersonas
    '[{"nombre": "Taller de yoga",
    "fecha": "2023-03-15",
    "horaInicio": "09:00:00",
    "horaFin": "11:00:00", 
    "valor": 50}]',  -- talleresSolicitados
    '[{"tipo": "Senderismo", 
    "descripcion": 
    "Caminata por la montaña", 
    "categoria": "1", 
    "valor": 80,
    "cantPersonas": 2,
    "nivelRunning": 2,
    "duracionDesplazamiento": "01:00:00",
    "duracionCaminata": "03:00:00",
    "serviciosTermales": "Si", 
    "ubicacion": "Parque Nacional"}]',  -- experienciasSolicitadas
    '{"tipoHospedaje": "Hotel",
    "horaIngreso": "14:00:00", 
    "tipoHabitacion": "Doble",
    "alquilerCamping": "No",
    "valor": 150, "cantPersonas": 2,
    "servicioComida": "Si"}',  -- alojamientoSolicitado
    '2023-03-15',  -- fechaReserva
    '14:00:00',  -- horaIngreso
    '18:00:00',  -- horaSalida
    2  -- adminID
);
CALL AgendarReserva(
    3,  -- clienteID
    3,  -- numPersonas
    '[{"nombre": "Taller de cocina",
    "fecha": "2023-03-16",
    "horaInicio": "10:00:00",
    "horaFin": "12:00:00", 
    "valor": 60}]',  -- talleresSolicitados
    '[{"tipo": "Rafting",
    "descripcion": "Descenso por el río",
    "categoria": "2",
    "valor": 120,
    "cantPersonas": 3,
    "nivelRunning": 3,
    "duracionDesplazamiento": "02:00:00",
    "duracionCaminata": "04:00:00",
    "serviciosTermales": "No",
    "ubicacion": "Río Amazonas"}]',  -- experienciasSolicitadas
    '{"tipoHospedaje": "Cabaña",
    "horaIngreso": "15:00:00",
    "tipoHabitacion": "Triple",
    "alquilerCamping": "Si",
    "valor": 200, "cantPersonas": 3,
    "servicioComida": "No"}',  -- alojamientoSolicitado
    '2023-03-16',  -- fechaReserva
    '15:00:00',  -- horaIngreso
    '19:00:00',  -- horaSalida
    3  -- adminID
);
CALL AgendarReserva(
    4,  -- clienteID
    4,  -- numPersonas
    '[{"nombre": "Taller de meditación",
    "fecha": "2023-03-17",
    "horaInicio": "11:00:00",
    "horaFin": "13:00:00",
    "valor": 70}]',  -- talleresSolicitados
    '[{"tipo": "Ciclismo",
    "descripcion": "Paseo por la ciudad",
    "categoria": "3",
    "valor": 100,
    "cantPersonas": 4,
    "nivelRunning": 1,
    "duracionDesplazamiento": "01:30:00",
    "duracionCaminata": "02:30:00",
    "serviciosTermales": "Si",
    "ubicacion": "Parque Urbano"}]',  -- experienciasSolicitadas
    '{"tipoHospedaje": "Hostal",
    "horaIngreso": "16:00:00",
    "tipoHabitacion": "Cuádruple",
    "alquilerCamping": "No",
    "valor": 250,
    "cantPersonas": 4,
    "servicioComida": "Si"}',  -- alojamientoSolicitado
    '2023-03-17',  -- fechaReserva
    '16:00:00',  -- horaIngreso
    '20:00:00',  -- horaSalida
    4  -- adminID
);


SELECT * FROM Reserva;
SELECT * FROM Talleres;
SELECT * FROM Hospedaje;
 
/*PROCEDIMIENTO PARA ELIMINAR EXPERIENCIA*/
DELIMITER $$ 

-- drop procedure eliminarExperiencia;
CREATE PROCEDURE eliminarExperiencia(
	IN ReservaID int,
    IN nombreExperiencia varchar (80)
    )
    BEGIN
	delete from Experiencias
    where Id_Reserva = ReservaID and Descripcion = nombreExperiencia;
    
    -- Select Id_reserva
    -- From Reserva;
	
END$$
DELIMITER ;

call eliminarExperiencia(2,"Ascenso a la cima");

select C.Nombre , C.Apellido, E.Descripcion, E.Id_Reserva As NumeroReserva  from Cliente C inner join Reserva R on C.Id_Cliente = R.Id_Cliente inner join Experiencias E on R.Id_Reserva = E.Id_Reserva;
