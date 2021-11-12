import React from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import './../../css/custom.css';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import NavbarStart from '../navbarstart';
import axios from 'axios';
import { useState } from "react";

const schema = yup.object().shape({
    id: yup.string().required("חובה תעודת זהות").matches(/[0-9]/, 'תעודת הזהות יכולה להכיל רק ספרות').min(9, 'חובה 9 ספרות').max(9, 'חובה 9 ספרות בלבד'),
    name: yup.string().required("חובה שם"),
    password: yup.string().required('חובה למלא סיסמה').min(6, 'הסיסמה קצרה מידי - צריך להיות 6 תוים מינימום.').matches(/[a-zA-Z1-9]/, 'הסיסמה יכולה להכיל רק אותיות לטיניות ומספרים'),
    bday: yup.string().required("חובה למלא תאריך לידה"),
    city: yup.string().required("חובה למלא מקום מגורים"),
    phonenumber: yup.string().required("חובה למלא מספר טלפון").matches(/[0-9]/, 'מספר הטלפון מכיל רק ספרות').min(10, 'חובה 10 ספרות').max(10, 'חובה 10 ספרות'),
    emergencyphonenumber: yup.string().required("חובה למלא מספר טלפון למקרה חירום").matches(/[0-9]/, 'מספר הטלפון מכיל רק ספרות').min(10, 'חובה 10 ספרות').max(10, 'חובה 10 ספרות'),
    email: yup.string().required("חובה למלא אימייל").email()
});

export default function NewEmployeeForm() {

    document.body.style = 'background: #f2EAEA';

    const { register, formState: { errors }, handleSubmit } = useForm({
        resolver: yupResolver(schema),
    });

    const [arrusertype] = useState(["מנהל", "אם/ב בית", "מדריך לילה", "פסיכולוגית"]);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
  
    const onSubmit = data => {
        console.log(data);

        console.log("usertype: " + data.usertype);
        console.log("id: " + data.id);
        console.log("name: " + data.name);
        console.log("password: " + data.password);
        console.log("bday: " + data.bday);
        console.log("city: " + data.city);
        console.log("phone number: " + data.phonenumber);
        console.log("emergency phone number: " + data.emergencyphonenumber);
        console.log("email: " + data.email);

        const newuser = {
            usertype: data.usertype,
            id: data.id,
            name: data.name,
            password: data.password,
            bday: data.bday,
            city: data.city,
            phone: data.phonenumber,
            emergencyphonenumber: data.emergencyphonenumber,
            email: data.email
        }

        console.log(newuser);

        axios.post('http://localhost:5000/user/register', newuser)
        .then(res => {
            console.log(res.data);
            setSuccess(true);
        })
        .catch(err => {
            console.log(err);
            setError(true);
        })
    }

    return (
        <div>
            <NavbarStart/>
            <br/>
            <h6 style={{textAlign:"center",color:'rgba(255, 99, 132, 1)'}}>הוסף עובד חדש</h6>
            <br/>
            <div style={{ display: "flex", justifyContent: "center"}}>
            <form onSubmit={handleSubmit(onSubmit)}style={{width:"300px"}}>  
                <select
                style={{border: "3px solid #555", textAlign: "center", borderRadius:'2em'}}
                required
                className="form-control"
                {...register("usertype")}
                >
                {
                    arrusertype.map(function(usertype) {
                        return <option key={usertype} value={usertype}>{usertype}</option>
                    })
                }
                </select>
                <input
                style={{border: "3px solid #555", textAlign: "center", borderRadius:'2em', marginTop:"1em"}}
                placeholder="תעודת זהות"
                className="form-control"
                type="text"
                {...register("id")}
                />
                <ErrorMessage errors={errors} name="id"/>
                <input
                style={{border: "3px solid #555", textAlign: "center", borderRadius:'2em', marginTop:"1em"}}
                placeholder="שם"
                className="form-control"
                type="text"
                {...register('name')} 
                />
                <ErrorMessage errors={errors} name="name"/>
                <input
                style={{border: "3px solid #555", textAlign: "center", borderRadius:'2em', marginTop:"1em"}}
                placeholder="סיסמה"
                className="form-control"
                type="text"
                {...register('password')} 
                />
                <ErrorMessage errors={errors} name="password"/>
                <input
                style={{border: "3px solid #555", textAlign: "center", borderRadius:'2em', marginTop:"1em"}}
                placeholder="יום הולדת"
                className="form-control"
                type="text"
                {...register('bday')} 
                />
                <ErrorMessage errors={errors} name="bday"/>                
                <input
                style={{border: "3px solid #555", textAlign: "center", borderRadius:'2em', marginTop:"1em"}}
                placeholder="מגורים"
                className="form-control"
                type="text"
                {...register('city')} 
                />
                <ErrorMessage errors={errors} name="city"/>
                <input
                style={{border: "3px solid #555", textAlign: "center", borderRadius:'2em', marginTop:"1em"}}
                placeholder="טלפון"
                className="form-control"
                type="text"
                {...register('phonenumber')} 
                />
                <ErrorMessage errors={errors} name="phonenumber"/>
                <input
                style={{border: "3px solid #555", textAlign: "center", borderRadius:'2em', marginTop:"1em"}}
                placeholder="טלפון למקרה חירום"
                className="form-control"
                type="text"
                {...register('emergencyphonenumber')} 
                />
                <ErrorMessage errors={errors} name="emergencyphonenumber"/>
                <input
                style={{border: "3px solid #555", textAlign: "center", borderRadius:'2em', marginTop:"1em"}}
                placeholder="אימייל"
                className="form-control"
                type="text"
                {...register('email')} 
                />
                <ErrorMessage errors={errors} name="email"/>
                <div>
                    {success && <AddUserSuccess/>}
                    {error && <Error/>}
                </div>
                <div className="form-group" >
                    <input style={{borderRadius:'2em', marginTop:"1em", marginBottom:"1em"}} type="submit" value="עובד חדש" className=" btn btn-success"/>
                </div>
            </form>
            </div>
        </div>
    );
}


const AddUserSuccess = () => {
    return <div>
        <h6 style={{color:'green'}}>Success</h6>
    </div>
}

const Error = () => {
    return <div>
        <h6 style={{color:'red'}}>Error</h6>       
    </div>
}
