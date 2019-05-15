delete from posts
where post_id = $1;
select * 
from posts
where user_id = $2;
