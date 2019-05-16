const bcrypt = require("bcryptjs");
const moment = require("moment")
require("dotenv").config();

module.exports = {
  register: async (req, res) => {
    try {
      const {
        user_first,
        user_last,
        user_email,
        password,
        user_employee_id,
        group_id
      } = req.body;
      console.log(req.body);
      const db = req.app.get("db");
      const [foundUser] = await db.check_email([user_email]);
      console.log("found user", foundUser);
      if (foundUser) {
        console.log("after userfound");
        return res.status(200).send({ message: "Email already exists" });
      }
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      const [newUser] = await db.register_user([
        user_first,
        user_last,
        user_email,
        hash,
        user_employee_id,
        group_id
      ]);
      req.session.user = {
        user_id: newUser.user_id,
        user_first: newUser.user_first,
        user_last: newUser.user_last,
        user_email: newUser.user_email,
        user_employee_id: newUser.user_employee_id,
        group_id: newUser.group_id
      };
      res.status(200).send({
        message: "logged in",
        userData: req.session.user,
        loggedIn: true
      });
    } catch (error) {
      console.log({ error });
      res.status(500).send(error);
    }
  },

  login: async (req, res) => {
    try {
      const { email: user_email, password } = req.body;
      console.log(req.body)
      console.log(user_email, password);
      let db = req.app.get("db");
      const [foundUser] = await db.login_user([user_email]);
      console.log(foundUser);
      if (!foundUser) {
        return res.status(200).send("User not found");
      }
      const isAuth = await bcrypt.compareSync(password, foundUser.user_hash);
      console.log({ isAuth })
      if (isAuth) {
        req.session.user_id = foundUser.user_id;
        req.session.group_id = foundUser.group_id;
        req.session.user = {
          user_id: foundUser.user_id,
          user_first: foundUser.user_first,
          user_last: foundUser.user_last,
          user_email: foundUser.user_email,
          user_employee_id: foundUser.user_employee_id,
          group_id: foundUser.group_id
        }
        res
          .status(200)
          .send({
            message: "logged In",
            groupId: foundUser.group_id,
            loggedIn: true
          });
      } else {
        res.status(200).send("incorrect password");
      }
    } catch (error) {
      res.status(200).send({message: error});
    }
  },
  userData: (req, res) => {
    if(req.session.user) res.status(200).send(req.session.user)
  else res.status(401).send('please log in');
},
getPosts: async (req, res) => {
    const groupId = req.session.user.group_id
    const db = req.app.get('db')
    const posts = await db.get_posts_by_group([groupId])
    res.status(200).send(posts)
},
createPost: async (req, res) => {
  const {shiftDate, startTime, endTime, memo, incentive} = req.body
  const groupId = req.session.group_id
  const user_id = req.session.user_id
  const post_date = moment()
  const db = req.app.get('db')
  const shifts = await db.create_post([user_id, shiftDate, startTime, endTime, memo, incentive, groupId, post_date])
  res.status(200).send(shifts)
},
deletePost: async (req, res) => {
  const {id} = req.params
  const user_id = req.session.user_id
  const db = req.app.get('db')
  const posts = await db.delete_post([id, user_id])
  res.status(200).send(posts)
},
getPostsByUser: async (req, res) => {
  const user_id = req.session.user_id
  const db = req.app.get('db')
  const userPosts = await db.get_posts_by_user([user_id])
  res.status(200).send(userPosts)
},
markTaken: async (req, res) => {}

  
};
