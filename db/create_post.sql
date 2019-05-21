insert into posts
    (
    user_id,
    shift_date,
    start_time,
    end_time,
    memo,
    incentive,
    group_id,
    post_date,
    first_name,
    last_name,
    post_emp_id,
    post_type,
    taken,
    archive
    )
values
    (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6,
        $7,
        $8,
        $9,
        $10,
        $11,
        $12,
        false,
        false
);
select *
from posts
where group_id = $7;
