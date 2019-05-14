drop table if exists posts;
drop table if exists users;
drop table if exists groups;

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

create table posts 
(   
        post_id serial primary key,
        user_id int references users(user_id),
        shift_date date,
        start_time time,
        end_time time,
        memo text,
        incentive text,
        trade boolean,
        give boolean,
        group_id int references groups(group_id),
        taken boolean,
        post_date timestamp
);

insert into posts
(
        user_id,
        shift_date,
        start_time,
        end_time,
        memo,
        incentive,
        trade,
        give,
        group_id,
        taken,
        post_date
)
values
(
        1,
        '2019-05-13',
        '09:00:00',
        '11:00:00',
        'Please take my shift so I dont have to code',
        'Jazz tickets',
        false,
        false,
        1,
        false,
        '2019-05-12 19:10:25-07'
);