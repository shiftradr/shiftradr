select * from
posts where
user_id = $1
order by post_id desc;