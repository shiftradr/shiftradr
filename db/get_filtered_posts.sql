select * from posts
WHERE group_id = ${group_id} and
(${shift_date1} is null or shift_date >= ${shift_date1}) and
(${shift_date2} is null or shift_date <= ${shift_date2}) and
(${post_type} is null or post_type = ${post_type});