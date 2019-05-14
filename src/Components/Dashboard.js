import React, {useEffect, useState} from "react"
import styled from "styled-components"
import Header from "./Header"
import swal from "@sweetalert/with-react"
import axios from 'axios'

const Dashboard = () => {

const [post, setPost] = useState([])

useEffect( () => {
    const getData = async () => {
        axios.get('/auth/user-data').then(res => console.log(res.data))
        let res = await axios.get('/api/posts')
        console.log(9999, res.data[0])
        setPost(res.data)
        console.log(res)
    }
    getData()
}, [])

console.log(1111, post)

let map = post.map((item, i) => {
    return (
        <div key={i}>
            <h1>{item.memo}</h1>
        </div>
    )
})
    return (
        <>
            <Header />
            <Dash>
                <PostView>
                    {map}
                    <button onClick={() => swal(post[0].memo)}>hi</button>
                </PostView>
            </Dash>
        </>
    )
}

export default Dashboard

const Dash = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 8vh;
    height: 92vh;
    width: 100vw;
    background: #10171e;
`
const PostView = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60%;
    height: 100%;
    background: #15202b;
`


