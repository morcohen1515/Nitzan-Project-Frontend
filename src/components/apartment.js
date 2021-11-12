import React, { Component } from 'react';
//import axios from 'axios';
import NavbarUser from '../components/navbaruser';
import note from './../image/note.jpg';
import logo from './../image/logo.png';
import logoProfile from './../image/logo_profile.png'
import "../css/custom.css";
import { Link } from 'react-router-dom';

export default class Apartment extends Component {

    constructor(props){

        document.body.style = 'background: #f2EAEA';

        super(props);   
        
        this.state = {
            apartment: "",
        }
    }

    async componentDidMount() {

        const apartmentName = this.props.location.pathname.split('/apartment/')[1];
        this.setState({apartment: apartmentName})

        // let token = JSON.parse(localStorage.getItem("x-api-key"));

        // if(token) {
        //     axios.defaults.headers = {
        //         Authorization: token
        //     }
        // } else {
        //     delete axios.defaults.headers.Authorization;
        // }
    }

    render() {
        return (
            <div>
                <NavbarUser/>
                <div className="container" style={{marginTop:"100px"}}>   
                    <br/>
                    <div>
                        <NoteBook apartment={this.state.apartment}/>
                    </div>
                    <div>
                        <Tenants apartment={this.state.apartment}/>
                    </div>
                    <br/>
                    <br/>
                    <div>
                        <Logo/> 
                    </div>
                </div>
         </div>
        )
    }
}

const NoteBook = ({apartment}) => {
    return <div style={{ textAlign:'-webkit-center'}}>

                <figure className="position-relative" style={{width:'150px', justifyContent: "center"}} >
                    <Link to={{pathname: `/notebook/${apartment}`}}>
                        <img src={note}  alt="notebook" className="img-fluid"/> 
                    </Link>
                </figure>
                <div>
                    <h6>יומן דירה</h6>
                </div>

                {/* {
                loading
                ?
                        <Loading/>
                :
                    async function getNoteBook() {

                        console.log("get mote book: " + apartment);
                        await axios.get("http://localhost:5000/users/getappartments", apartment)
                        .then(res => {
                            this.setState({
                                appartments: res.data,
                                loading: false
                            })           
                        })
                        .catch(err => {
                            this.setState({});
                        })
                    }
                }                 */}
            </div>
}

const Tenants = ({apartment}) => {
    return <div style={{ textAlign:'-webkit-center'}}>
                <figure className="position-relative" style={{width:'150px', justifyContent: "center"}} >
                    <Link to={{pathname: `/tenants/${apartment}`}}>
                        <img src={logoProfile}  alt="notebook" className="img-fluid"/> 
                    </Link>
                </figure>
                <div>
                    <h6>דיירים</h6>
                </div>
            </div>
}

const Logo = () => {
    return <div>
        <img src={logo} alt="logo" style={{height:'105px', width:'160px'}}/>
    </div>
}
