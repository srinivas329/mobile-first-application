import React from "react"
import { useState, useEffect } from "react";
import {Redirect} from 'react-router-dom'
import Homepage from "../Homepage";
import Tabitem from "../Tabitem";

import 'bootstrap/dist/css/bootstrap.min.css';


import './index.css'

const tabsList = [
    {tabId: 'PROGRAMMING', displayText: 'Programming'},
    {tabId: 'MISC', displayText: 'Misc'},
    {tabId: 'DARK', displayText: 'Dark'},
    {tabId: 'PUN', displayText: 'Pun'},
  ]


const Login = () => {

    const [values, setValues] = useState({
        name: "",
        password: ""
    })

    const [errors, setErrors] = useState({})

    const [jokes, setJokes] = useState([])

    const [status, setStatus] = useState(false)
    const [activeTab, setActiveTab] = useState(tabsList[0].tabId)


    useEffect(() =>  {
            async function fetchData(){
                if(Object.keys(errors).length === 0 && (values.name !== "" && values.password !== "")){
                    const response = await fetch("https://v2.jokeapi.dev/joke/any?format=json&blacklistFlags=nsfw,sexist&type=single&lang=EN&amount=10")
                    const data = await response.json()
                    setJokes(data.jokes)
                    setStatus(true)
                }
            }

            fetchData()
    }, [errors])

    const onChangeInputEle = (event) => {
        setValues({...values, [event.target.name]: event.target.value})
    }

    const validation = (values) => {

        let error = {}
    
        if(!values.name){
            error.name = "Username Required"
        }else if (values.name.length < 11){
            error.name = "Username must be more than 10 characters"
        }
    
    
        if(!values.password){
            error.password = "Password Required"
        }else if (values.password.length < 9){
            error.password = "Password must be more than 8 characters"
        }
    
        return error
    
    }

    const submitHandle = (event) => {
        event.preventDefault()
        setErrors(validation(values)) 
        
    }

    const onchangebutton = (event) => {
        console.log(event.target.value)
    }

    const loginPage = () => (
        <div className="bg-container">
             <form onSubmit={submitHandle}>
                <div className="card">
                <h1 className="text-center hedaing">Login Page</h1>
                    <label><b>Username</b></label>
                    <input className="input-elemnt" type="text" placeholder="Enter Username" value={values.name} onChange={onChangeInputEle} name="name"/>
                    {errors.name && <p style={{color:"red", fontSize:"13px"}}>{errors.name}</p>}
                    <label className="mt-3"><b>Password</b></label>
                    <input className="input-elemnt"   type="password" placeholder="Enter Password" value={values.password} onChange={onChangeInputEle} name="password"/>
                    {errors.password && <p style={{color:"red", fontSize:"13px"}}>{errors.password}</p>}
                    <button className="btn btn-primary mt-3" type="submit">Login</button>
                </div>
            </form>
        </div>
           
        )


        const clickTabitem = (id) => {
            setActiveTab(id)
        }

    
        

    const homePage = () => {

        const filteredData = jokes.filter(each => each.category.toLowerCase() === activeTab.toLowerCase())
        console.log(jokes)

        return(
            <div className=" ul-tab">
                <h1 className="text-center hedaing1"> ......Jokes...... </h1>
                <ul className="tabs-container">
                {tabsList.map(each => <Tabitem isActive={activeTab === each.tabId} clickTabitem={clickTabitem} details={each} key={each.tabId} />)}
                </ul>

                <ul className="ul-list text-center">  
                    {filteredData.length === 0 ? <p className="error-msg">No Jokes in this Category</p> : filteredData.map(each =><Homepage key={each.id} jokesData={each}/> )}
                </ul>
            </div>
        )
    } 
    

    return(
        <div className="">
            {status ? homePage() : loginPage() }
        </div>
        
    )
}

export default Login