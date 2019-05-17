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
        'Crew'
),
(
        'Customer'
),
(
        'MCCM'
),
(
        'Reservations'
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

CREATE TABLE posts (
    post_id SERIAL PRIMARY KEY,
    user_id integer REFERENCES users(user_id),
    shift_date date,
    start_time time without time zone,
    end_time time without time zone,
    memo text,
    incentive text,
    group_id integer REFERENCES groups(group_id),
    taken boolean,
    post_date timestamp with time zone,
    post_emp_id integer,
    first_name text,
    last_name text,
    post_type integer
);

CREATE TABLE acc (
    acc_id SERIAL PRIMARY KEY,
    post_id integer REFERENCES posts(post_id),
    acc_user_id integer,
    acc_first_name character varying(64),
    acc_last_name character varying(64),
    acc_emp_id integer,
    acc_user_email text,
    unique (post_id, acc_user_id)

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
