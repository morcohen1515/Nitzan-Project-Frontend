import React, { Component } from 'react';
import axios from 'axios';
import NavbarStart from '../components/navbarstart';
import unautorizedErrorCodesArray from './unautorizedErrorCodesArray';
import logo from './../image/logo.png';

 
export default class Login extends Component {

    constructor(props){
        super(props);

        document.body.style = 'background: #f2EAEA';
        
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.myRef = React.createRef();

        this.state = {
            id: '',
            password: '',
            error: false,
        }   
    }

    onChangeUsername(e) {
        this.setState({
            id: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const user = {
            id: this.state.id,
            password: this.state.password,
        }

        axios.defaults.withCredentials = true;

        axios.post('http://localhost:5000/user/login', user)
        .then(res => {

            //save the token in the local storage.
            localStorage.setItem("x-api-key", JSON.stringify(res.data.token));

            //condition if Manager/Guide/Nanny/Psycho
            switch (res.data.usertype) {
                case "מנהל":
                    window.location = '/menumanager';
                    break;
                case "פסיכולוגית":
                    window.location = '/menupsycho';
                    break;
                case "אם/ב בית":
                    window.location = '/menunanny';
                    break;
                case "מדריך לילה":
                    window.location = '/menuguide';
                    break;
                }
            
        }).catch(err => {
            this.setState({
                error: err.response.status
            })
        })    
    }

    render() {
        return (
            <div>
                <NavbarStart/>
                <br/>
                <br/>
                <h6 style={{textAlign:"center", color:'#2e4355'}}>כניסה</h6>
                <br/>
                <div style={{ display: "flex", justifyContent: "center"}}>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <input
                            placeholder="תעודת זהות"
                            style={{border: "3px solid #555", borderRadius:'1em'}}
                            type="text"
                            required
                            className="form-control"
                            value={this.state.id}
                            onChange={this.onChangeUsername}
                            />
                        </div>
                        <br/>
                        <div className="form-group">
                            <input
                            placeholder="סיסמה"
                            style={{border: "3px solid #555", borderRadius:'1em'}}
                            type="password"
                            required
                            className="form-control"
                            value={this.state.password}
                            onChange={this.onChangePassword}
                            />
                        </div>
                        <br/> 
                        <div>
                           {unautorizedErrorCodesArray.includes(this.state.error) && <Error/>}
                        </div>             
                        <div className="form-group" >
                            <input type="submit" value="כניסה" className=" btn btn-success" style={{borderRadius:'1em'}}/>
                        </div>
                    </form>
                </div>  
                <br/>
                <br/>
                <Logo/>             
            </div>
        )
    }
}

const Error = () => {
    return <div>
        <h6 style={{color:'rgba(255, 99, 132, 1)'}}>The username or password is incorrect</h6>
        <br/>
    </div>
}

const Logo = () => {
    return <div>
        <img src={logo} alt="logo" style={{height:'105px', width:'160px'}}/>
    </div>
}
