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
import swal from '@sweetalert/with-react'

function Picker(props) {
    const [selectedDate, handleDateChange] = useState(moment())
    const [startTime, setOutChange] = useState(moment())
    const [endTime, setInChange] = useState(moment())
    const memoRef = useRef()
    const incentiveRef = useRef()
    const typeRef = useRef()
    

    const handlePost = async () => {
        let start = moment(startTime).format("HH:mm")
        let end = moment(endTime).format("HH:mm")

        let bob = moment(end).get("hour, min")
        let bib = moment(start).get("hour, min")
        let date = moment(selectedDate).format("YYYY-MM-DD")

        console.warn(selectedDate)
        console.log(bob)
        console.log(bib)
        if (typeRef.current.value == "defaultValue") {
            swal("Please Select Deparment", "error")
            return
        } else if (incentiveRef.current.value.length <= 30)
        {

            
        
            await axios
                .post("/api/posts", {
                    shiftDate: date,
                    startTime: bib._i,
                    endTime: bob._i,
                    memo: memoRef.current.value,
                    incentive: incentiveRef.current.value,
                    post_type: typeRef.current.value
                })
                .catch((err) => console.log(66, err))
            props.getData()
            props.handleModal()
        } else {
            swal("Incentive must be less than 30 characters")

        }
    }

    // function validate() {
    //     let select = document.getElementById('selection').value
    //     if (select == "Department") {
    //         alert("Please Select Department")
    //         return false
    // }else {
    //         return true
    //     }
    // }

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
                Clock In:{" "}
                <TimePicker
                    ampm={false}
                    value={startTime}
                    onChange={setOutChange}
                />
            </Divv>
            <Divv>
                Clock Out:{" "}
                <TimePicker
                    ampm={false}
                    value={endTime}
                    onChange={setInChange}
                />
            </Divv>
            <Divv>
                Description: <Input placeholder="Description" ref={memoRef} />
            </Divv>
            <Divv>
                Incentive: <Input placeholder="Incentive" ref={incentiveRef} />
            </Divv>
            <select id="selectPost" name="Post type" ref={typeRef}  >
                <option value="defaultValue"  >Post Type</option>
                <option value="1">Trade</option>
                <option value="2">NSA</option>
                <option value="3">Permanent</option>
            </select>
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
    color: #FF715B;
    border: 2px solid #FF715B;
    width: 100%;
    margin-top: 1em;
    padding: 8px 0px;
    font-size: 1em;
    font-weight: lighter;
    letter-spacing: 1px;
    margin-bottom: 0.25em;
    width: 120px;
    border-radius: 15px;

    &:hover {
        color: #fff;
        background-color: #FF715B;
    }
`
const Button2 = styled.button`
    background-color: #FF715B;
    color: #fff;
    border: 2px solid #FF715B;
    width: 100%;
    margin-top: 1em;
    padding: 8px 0px;
    font-size: 1em;
    font-weight: lighter;
    letter-spacing: 1px;
    margin-bottom: 0.25em;
    width: 120px;
    border-radius: 15px;

    &:hover {
        color: #FF715B;
        background-color: #fff;
    }
`
const ButtonDiv = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    width: 100%;
`