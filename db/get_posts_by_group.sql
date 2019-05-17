select * 
from posts
where group_id = $1 and taken = false
order by post_id desc;