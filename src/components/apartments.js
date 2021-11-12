import React, { Component } from 'react';
import axios from 'axios';
import ReactLoading from 'react-loading';
import NavbarUser from '../components/navbaruser';
import logo from './../image/logo.png';
import house from './../image/house.png';
import "../css/custom.css";
import {Container} from "react-bootstrap";
import { Link } from 'react-router-dom';


export default class Note extends Component {

    constructor(props){

        document.body.style = 'background: #f2EAEA';

        super(props);   
        
        this.state = {
            appartments: ["דוכיפת", "מגדל המנורה", "יונה הנביא", "51", "39", "43"],
            loading: false
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

        // await axios.get("http://localhost:5000/users/getappartments")
        // .then(res => {
        //     this.setState({
        //         appartments: res.data,
        //         loading: false
        //     })           
        // })
        // .catch(err => {
        //     this.setState({});
        // })
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
                        <Appartments appartments={this.state.appartments}/>
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

const Appartments = ({appartments}) => {    
    return <div>       
                <Container className="row">
                    {appartments.map((appartmen, i) => (                  
                        <div key={i}>
                            <figure className="position-relative" style={{width:'100px'}}>
                                {console.log(appartmen)}
                                <Link to={{pathname: `/apartment/${appartmen}`}}>
                                    <img src={house}  alt="house" className="img-fluid"/> 
                                </Link>
                               
                                <figcaption style={{color:'#930404'}}>
                                    {appartmen}
                                </figcaption>
                            </figure>  
                        </div>                 
                    ))}
                </Container>
                <br/>
            </div>
}

const Logo = () => {
    return <div>
        <img src={logo} alt="logo" style={{height:'105px', width:'160px'}}/>
    </div>
}