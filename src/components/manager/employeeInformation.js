import axios from 'axios';
import React, { useState } from "react";

const EmployeeInformation = ({employee}) => {

    const [deleteuser, setDeleteUser] = useState(false);
    const [errordelete, setErrorDelete] = useState(false);

    const handleSubmit = (e) => {

        e.preventDefault();

        let token = JSON.parse(localStorage.getItem("x-api-key"));

        if(token) {
            axios.defaults.headers = {
                Authorization: token
            }
        } else {
            delete axios.defaults.headers.Authorization;
        }

        const deleteuserbyid = {
            userid: employee._id
        }

        axios.post("http://localhost:5000/user/deleteuser", deleteuserbyid)
        .then(res => {
            console.log(res.data);
            setDeleteUser(true);        
        })
        .catch(err => {
            console.log(err);
            setErrorDelete(true);
        })
    }

    return (
        <div className="userinformation">
           <p>שם : {employee.name}</p>
           <p>תפקיד : {employee.usertype}</p>
           <p>יום הולדת : {employee.bday}</p>
           <p>מגורים : {employee.city}</p>
           <p>טלפון : {employee.phonenumber}</p>
           <p>טלפון למקרה חירום : {employee.emergencyphonenumber}</p>
           <p>{employee.email}</p>
           <br/>
           {deleteuser && <DeleteUser/>}
           {errordelete && <Error/>}
            <br/>
            <input onClick={handleSubmit} type="submit" value="מחק" style={{width:"80px"}} className="btn btn-danger" />
        </div>
    )
};

const DeleteUser = () => {
    return <div>
                <h6 style={{color:'green'}}>העובד נמחק</h6>       
           </div>
}

const Error = () => {
    return <div>
                <h6 style={{color:'red'}}>תקלה</h6>       
           </div>
}


export default EmployeeInformation;