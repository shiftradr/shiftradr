select message, chat_id, chats.user_id, user_first, user_last
from chats
join users on users.user_id = chats.user_id
where room_id = ${room};