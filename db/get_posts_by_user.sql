select * from
posts where
user_id = $1 and archive = false
or user_id = $1 and archive is null
order by post_id desc;