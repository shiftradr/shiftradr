import React, { useState, useRef } from "react"
import DateFnsUtils from "@date-io/moment"
import {
    DatePicker,
    TimePicker,
    MuiPickersUtilsProvider,
} from "@material-ui/pickers"
import "./Login.css"
import styled from "styled-components"
import axios from "axios"
import moment from "moment"

function Picker(props) {
    const [selectedDate, handleDateChange] = useState(moment())
    const [startTime, setOutChange] = useState()
    const [endTime, setInChange] = useState()
    const memoRef = useRef()
    const incentiveRef = useRef()

    const handlePost = async () => {
        let start = moment(startTime).format("hh:mm")
        let end = moment(endTime).format("hh:mm")

        let bob = moment(end).get("hour, min")
        let bib = moment(start).get("hour, min")

        // console.log(endTime, startTime, bob, bib)
        await axios
            .post("/api/posts", {
                shiftDate: selectedDate,
                startTime: bib._i,
                endTime: bob._i,
                memo: memoRef.current.value,
                incentive: incentiveRef.current.value,
            })
            .catch((err) => console.log(66, err))
        props.getData()
        props.handleModal()
    }

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <h1 className="registerTitle">Please enter shift date</h1>
            <Divv>
                Date:
                <DatePicker
                    showTodayButton={true}
                    disablePast={true}
                    autoOk={true}
                    value={selectedDate}
                    onChange={handleDateChange}
                />
            </Divv>
            <Divv>
                Clock Out: <TimePicker value={startTime} onChange={setOutChange} />
            </Divv>
            <Divv>
                Clock In: <TimePicker value={endTime} onChange={setInChange} />
            </Divv>
            <Divv>
                Description: <Input placeholder="Description" ref={memoRef} />
            </Divv>
            <Divv>
                Incentive: <Input placeholder="Incentive" ref={incentiveRef} />
            </Divv>
            <ButtonDiv>
                <Button onClick={() => props.handleModal()}>Cancel</Button>
                <Button2 onClick={() => handlePost()}>Post</Button2>
            </ButtonDiv>
        </MuiPickersUtilsProvider>
    )
}

export default Picker

const Divv = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    width: 100%;
    margin-bottom: 10px;
    height: 40px;
`
const Input = styled.input`
    width: 195px;
    height: 40px;
    border: none;
    border-bottom: 1px solid #afafaf;
    margin: 10px 0px;
    background: white;
    outline: none;
    font-size: 1rem;

    &:focus {
        outline: none;
    }
    &:hover {
        border-bottom: 1.8px solid #212121;
    }
`

const Button = styled.button`
    background-color: #fff;
    color: #519e8a;
    border: 2px solid #519e8a;
    width: 100%;
    margin-top: 1em;
    padding: 8px 0px;
    font-size: 1em;
    font-weight: lighter;
    letter-spacing: 1px;
    margin-bottom: 0.25em;
    width: 120px;

    &:hover {
        color: #fff;
        background-color: #519e8a;
    }
`
const Button2 = styled.button`
    background-color: #519e8a;
    color: #fff;
    border: 2px solid #519e8a;
    width: 100%;
    margin-top: 1em;
    padding: 8px 0px;
    font-size: 1em;
    font-weight: lighter;
    letter-spacing: 1px;
    margin-bottom: 0.25em;
    width: 120px;

    &:hover {
        color: #519e8a;
        background-color: #fff;
        border: 2px solid #519e8a;
    }
`
const ButtonDiv = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    width: 100%;
`
