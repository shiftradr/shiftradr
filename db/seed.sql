drop table if exists users;
drop table if exists groups;
-- drop table if exists post

create table groups
(
    group_id serial primary key,
    group_name varchar(64)
);

insert into groups
    (
    group_name
    )
values
    (
        'MCCM'
),
(
        'Crew'
),
(
        'True Blue'
),
(
        'Vacations'
);

create table users
(
    user_id serial primary key,
    user_first varchar(64),
    user_last varchar(64),
    user_email varchar(64),
    user_hash text,
    user_employee_id int,
    group_id int REFERENCES groups
);



insert into users
    (
    user_first,
    user_last,
    user_email,
    user_hash,
    user_employee_id,
    group_id
    )
values
    (
        'Ryan',
        'Hall',
        '1',
        $1, --password 1
        '1234',
        1
),
(
        'Thomas',
        'Yohannes',
        '2',
        $2, --password 2
        '2345',
        2
),
(
        'Alex',
        'Langford',
        '3',
        $3, --password 3
        '3456',
        3
),
(
        'Jeremy',
        'Bezzant',
        '4',
        $4, --password 4
        '4567',
        4
);


-- create table post
-- (
--     post_id serial primary key,
--     post_date date not null,
--     post_start_time time not null,
--     post_end_time time not null,
    
-- );

-- "post_id" serial NOT NULL,
-- 	"date" DATE NOT NULL,
-- 	"start_time" TIME NOT NULL,
-- 	"end_time" TIME NOT NULL,
-- 	"memo" TEXT NOT NULL,
-- 	"incentive" TEXT NOT NULL,
-- 	"trade" BOOLEAN NOT NULL,
-- 	"give" BOOLEAN NOT NULL,
-- 	"group" TEXT NOT NULL,
-- 	"taken" BOOLEAN NOT NULL,
-- 	"user_id" integer NOT NULL,