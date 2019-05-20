insert into chats (message, user_id, room_id)
values (${message}, ${user_id}, ${room});

select message, chat_id, chats.user_id, user_first, user_last
from chats
join users on users.user_id = chats.user_id
where room_id = ${room};