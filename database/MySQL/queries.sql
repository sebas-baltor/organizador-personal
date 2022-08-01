-----------------------------------------------------------------------
-----                                                             -----
--                        SENTENCIAS BASICAS                                 
-----                                                             -----
-----------------------------------------------------------------------

--
-- Seleccionar datos de una tabla
--
SELECT * FROM "table_name";

--
-- Insertar datos en una tabla
--
INSERT INTO "table_name" ("column_name", "column_name", ...) VALUES ("value", "value", ...);



-----------------------------------------------------------------------
-----                                                             -----
--                       JOINS BASICOS                                 
-----                                                             -----
-----------------------------------------------------------------------

--
-- unir la tabla de tareas (tasks) con la tabla de usuarios (users)
--
SELECT * FROM tasks as T INNER JOIN users as U On T.user_id = U.user_id; 

--
-- unir la table de tareas (tasks) con la tabla de estados (states)
--
SELECT * FROM tasks as T INNER JOIN states as S On T.state_id = S.state_id; 

--
-- unir la tabla de tareas (tasks) con la tabla de categorias (categories)
--
SELECT * FROM tasks as T INNER JOIN categories as C On T.category_id = C.category_id; 

--
-- unir la tbla de tareas (tasks) con la table de tipos (type)
--
SELECT * FROM tasks as Ta INNER JOIN Types as Ti On Ta.type_id = Ti.type_id; 

-----------------------------------------------------------------------
-----                                                             -----
--                        JOINS COMPLEJOS                                 
-----                                                             -----
-----------------------------------------------------------------------

--
-- uniendo todas las tablas
--
SELECT * FROM tasks as Ta INNER JOIN users as U ON Ta.user_id = U.user_id INNER JOIN states as S ON Ta.state_id = S.state_id INNER JOIN types AS Ty ON Ta.type_id = Ty.type_id INNER JOIN categories as C ON Ta.category_id = C.category_id INNER JOIN dates AS D ON D.task_id = Ta.Task_id ; 

--
-- Seleccionar lo campos de tareas (task) que no sean numeros por ejemplo:
-- (descripcion y el id como excepcion) dependiendo del usuario
--
SELECT T.task_id,T.task_description FROM tasks as T INNER JOIN users as U ON T.user_id = U.user_id Where U.user_name = 'Aron Johnson DVM'; 

--
-- Seleccionar todos los campo de tareas (task) de la tabla ya unida con 
-- todas las demas tablas dependiendo del usuario
--
SELECT Ta.task_id,Ta.task_description,S.state_type,Ty.type_task,C.category_type,D.date_start,D.date_end,D.date_reminder FROM tasks as Ta INNER JOIN users as U ON Ta.user_id = U.user_id INNER JOIN states as S ON Ta.state_id = S.state_id INNER JOIN types AS Ty ON Ta.type_id = Ty.type_id INNER JOIN categories as C ON Ta.category_id = C.category_id INNER JOIN dates AS D ON D.task_id = Ta.Task_id Where U.user_name = 'Dr. Kole Bradtke III'; 

--
-- seleccionar la informacion de la tabla de categorias (categories) de acuerdo al usuario
-- lo mismo ocurriria si cambiamos la tabla de categoria por las demas tablas (states,types) 
-- siempre y cuando tengan una relacion con la tabla de tareas (tasks)
--
select C.category_type, C.category_id from categories as C inner join tasks as Ta on Ta.category_id = C.category_id inner join users as U on Ta.user_id = U.user_id where U.user_name = 'Evie Altenwerth';

--
-- seleccionar la informacion importante de la tabla (state,type,categories)
-- de acuerdo al usuario tenga o no tareas asignadas
--
select C.category_id, C.category_type from categories C inner join users U on U.user_id = C.user_id where U.user_name ="Sebastián"; 
--
-- selecionamos las tareas por ususario que tengan ralacion con un estado - tipo - categoria
-- para validar si podemos eliminar dicha categoria
--
select * from tasks Ta inner join users U on Ta.user_id = U.user_id inner join states S on S.user_id = U.user_id where S.state_id = Ta.state_id AND U.user_name = "Hector" AND S.state_id = 8;