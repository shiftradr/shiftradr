const socket = require('socket.io')

module.exports = {
    getChat:  async (req, res) => {
        const db = req.app.get('db')
        let {acc_user_id} = req.body
        acc_user_id = +acc_user_id
        let big
        let small 
        if(acc_user_id > req.session.user_id){
            big = acc_user_id;
            small = req.session.user_id
        } else {
            small = acc_user_id;
            big = req.session.user_id
        }
        const room = big + ':' + small
        let chat = await db.get_chats({room})

        res.status(200).send(chat)
        // console.log(1111, room)
        // console.log(chat)
    }
    // getChat2:  async (req, res) => {
    //     const db = req.app.get('db')
    //     let {user_id} = req.body
    //     user_id = +user_id
    //     let big
    //     let small 
    //     if(user_id > req.session.user_id){
    //         big = user_id;
    //         small = req.session.user_id
    //     } else {
    //         small = user_id;
    //         big = req.session.user_id
    //     }
    //     const room = big + ':' + small
    //     let chat = await db.get_chats({room})
    //     console.log(1111, room)

    //     res.status(200).send(chat)
    //     console.log(chat)
    // }

}
