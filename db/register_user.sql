insert into users (
    user_first, 
    user_last,
    user_email,
    user_hash,
    user_employee_id,
    group_id
) values (
    $1,
    $2,
    $3,
    $4,
    $5,
    $6
) returning *;
