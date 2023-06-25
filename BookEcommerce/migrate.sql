insert into permissionrole
select permissionid, 1 from permissions
--mysql
-- create trigger on insert to permission then insert into permissionrole give permission to admin

create trigger
on permission
after insert
as
begin
declare adminId int
select adminId = id from roles where value like '%admin%'
insert into permissionrole
select id, @adminId from permissions
end



-- authors	 	Browse Browse	Structure Structure	Search Search	Insert Insert	Empty Empty	Drop Drop	8,528	InnoDB	utf8mb4_0900_ai_ci	528.0 KiB	-
-- 	bookattributes	 	Browse Browse	Structure Structure	Search Search	Insert Insert	Empty Empty	Drop Drop	~58,311	InnoDB	utf8mb4_0900_ai_ci	3.5 MiB	-
-- 	bookimages	 	Browse Browse	Structure Structure	Search Search	Insert Insert	Empty Empty	Drop Drop	~104,357	InnoDB	utf8mb4_0900_ai_ci	20.0 MiB	-
-- 	books	 	Browse Browse	Structure Structure	Search Search	Insert Insert	Empty Empty	Drop Drop	16,342	InnoDB	utf8mb4_0900_ai_ci	46.2 MiB	-
-- 	categories	 	Browse Browse	Structure Structure	Search Search	Insert Insert	Empty Empty	Drop Drop	112	InnoDB	utf8mb4_0900_ai_ci	16.0 KiB	-
-- 	permissionrole	 	Browse Browse	Structure Structure	Search Search	Insert Insert	Empty Empty	Drop Drop	0	InnoDB	utf8mb4_0900_ai_ci	32.0 KiB	-
-- 	permissions	 	Browse Browse	Structure Structure	Search Search	Insert Insert	Empty Empty	Drop Drop	0	InnoDB	utf8mb4_0900_ai_ci	16.0 KiB	-
-- 	permissionuser	 	Browse Browse	Structure Structure	Search Search	Insert Insert	Empty Empty	Drop Drop	0	InnoDB	utf8mb4_0900_ai_ci	32.0 KiB	-
-- 	providers	 	Browse Browse	Structure Structure	Search Search	Insert Insert	Empty Empty	Drop Drop	136	InnoDB	utf8mb4_0900_ai_ci	16.0 KiB	-
-- 	publishers	 	Browse Browse	Structure Structure	Search Search	Insert Insert	Empty Empty	Drop Drop	275	InnoDB	utf8mb4_0900_ai_ci	48.0 KiB	-
-- 	roles	 	Browse Browse	Structure Structure	Search Search	Insert Insert	Empty Empty	Drop Drop	0	InnoDB	utf8mb4_0900_ai_ci	16.0 KiB	-
-- 	roleuser	 	Browse Browse	Structure Structure	Search Search	Insert Insert	Empty Empty	Drop Drop	0	InnoDB	utf8mb4_0900_ai_ci	32.0 KiB	-
-- 	series	 	Browse Browse	Structure Structure	Search Search	Insert Insert	Empty Empty	Drop Drop	1,020	InnoDB	utf8mb4_0900_ai_ci	176.0 KiB	-
-- 	users