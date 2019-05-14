insert into posts(
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
) values (
    $1,
    $2,
    $3,
    $4,
    $5,
    $6,
    false,
    false,
    1,
    false,
    now()
);
select *
from posts
where group_id = $7;
