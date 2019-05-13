import React from "react"
import styled from "styled-components"
import Header from "./Header"
import swal from "@sweetalert/with-react"

const Dashboard = () => {
    return (
        <>
            <Header />
            <Dash>
                <PostView>
                    <button
                        onClick={() =>
                            swal(
                                <Div>
                                    <h1>Please enter shift date</h1>
                                    <input type="date" />
                                    <br />
                                    <input type="time" />
                                    <br />
                                    <span>Add a description</span>
                                    <input
                                        type="text"
                                        placeholder="description"
                                    />
                                    <span>incentive</span>
                                    <input type="number" placeholder="amount" />
                                </Div>,
                                {
                                    buttons: {
                                        cancel: "Cancel",
                                        Post: true,
                                    },

                                },
                            )
                        }
                    >
                        click me
                    </button>
                    <button onClick={() => swal("hi")}>hi</button>
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

const Div = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`
