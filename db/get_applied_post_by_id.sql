select 
    post_id,
    user_id,
    shift_date,
    start_time,
    end_time,
    memo,
    incentive,
    post_date,
    post_emp_id,
    first_name,
    last_name,
    post_type
from posts
where post_id = $1;