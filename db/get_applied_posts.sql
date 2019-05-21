select p.post_id, p.user_id, p.shift_date, p.start_time, p.end_time, p.memo, p.incentive, p.group_id, p.taken, p.post_date, p.post_emp_id, p.first_name, p.last_name, p.post_type, p.archive, a.acc_id, a.acc_user_id, a.acc_first_name, a.acc_last_name, a.acc_emp_id, a.acc_user_email
from acc a
join posts p on a.post_id = p.post_id 
where a.acc_user_id = $1
order by p.post_id desc;