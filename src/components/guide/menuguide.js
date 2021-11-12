import React, { Component } from 'react';
import axios from 'axios';
import ReactLoading from 'react-loading';
import NavbarUser from '../navbaruser';
import logo from './../../image/logo.png';
import { Link } from 'react-router-dom';


export default class MenuGuide extends Component {

    constructor(props){

        document.body.style = 'background: #f2EAEA';

        super(props);   
        
        this.state = {
            user: {},
            loading: true,
        }
    }

    async componentDidMount() {

        let token = JSON.parse(localStorage.getItem("x-api-key"));

        if(token) {
            axios.defaults.headers = {
                Authorization: token
            }
        } else {
            delete axios.defaults.headers.Authorization;
        }

        await axios.get("http://localhost:5000/user/getuser")
        .then(res => {
            this.setState({
                user: res.data,
                loading: false
            })           
        })
        .catch(err => {
            this.setState({});
        })
    }

    render() {
        return (
            <div>
               <NavbarUser/>
               {this.state.loading 
               ?
               <Loading/>
               :
                <div className="container">   
                    <div>
                        <HelloUser user={this.state.user}/>
                    </div>
                    <div>
                        <Menu/>
                    </div>
                    <br/>
                    <div>
                        <Logo/> 
                    </div>
                </div>
               }
            </div>
        )
    }
}

const Loading = () => {
    return <div>
                <div style={{ display: "flex", justifyContent: "center"}}>
                    <ReactLoading type={"bubbles"} color={"#ffffff"} height={'10%'} width={'10%'} />
                </div>
            </div>
}

const HelloUser = ({user}) => {        
    return <div>
                <br/>
                <div>
                    <div className="col">
                    <div style={{textAlign: "center"}}><h6>שלום {user.name}</h6></div>
                    </div>
                </div>
                <br/>
            </div>
}

const Menu = () => {    
    return <div>
                <br/>
                <div>
                    <div>
                        <Link to="#">
                            <button type="button" style={{backgroundColor:'#EFE4E4', borderColor:'#E26F6F', borderRadius:'2em', width:'304px', color:'#AC354D'}}>משמרות</button>
                        </Link>
                    </div>
                    <br/>
                    <div>
                        <Link to="/apartments">
                            <button type="button" style={{backgroundColor:'#EFE4E4', borderColor:'#E26F6F', borderRadius:'2em', width:'304px',color:'#AC354D'}}>דירות</button>
                        </Link>
                    </div>
                    <br/>
                    <div>
                        <Link to="#">
                        <button type="button" style={{backgroundColor:'#EFE4E4', borderColor:'#E26F6F', borderRadius:'2em', width:'304px', color:'#AC354D'}}>דוח דוכחות</button>  
                        </Link>
                    </div>
                </div>
                <br/>
            </div>
}

const Logo = () => {
    return <div>
        <img src={logo} alt="logo" style={{height:'105px', width:'160px'}}/>
    </div>
}