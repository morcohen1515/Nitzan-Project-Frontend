import React, { Component } from 'react';
import axios from 'axios';
import NavbarUser from '../../components/navbaruser';
import ReactLoading from 'react-loading';
import Psychologis from './employeeInformation';
import { Link } from 'react-router-dom';

export default class ListOfPsychologists extends Component {

    constructor(props){

        super(props);   

        this.state = {
            psycholog: [],
            loading: true,
        } 
    }

    async componentDidMount() {

        document.body.style = 'background: #f2EAEA';

        let token = JSON.parse(localStorage.getItem("x-api-key"));

        if(token) {
            axios.defaults.headers = {
                Authorization: token
            }
        } else {
            delete axios.defaults.headers.Authorization;
        }

        const ut = {
            usertype: "פסיכולוגית"
        }

        await axios.post("http://localhost:5000/user/getlistofemployees", ut)
        .then(res => {
            console.log(res.data);
            this.setState({psycholog: res.data, loading: false})           
        })
        .catch(err => {
            this.setState({});
        })

    }

    render() {
        return (
            <div>
               <NavbarUser/>
                <div className="container">  
                    <div>                    
                    {
                        this.state.loading 
                        ?
                            <div>
                                <Loading/>
                            </div>
                        :
                            <div>

                                {
                                    this.state.psycholog.length === 0 && <Empty/>
                                }

                            </div>                      
                    }
                    <br/>
                    <PsychologistsList psychologis={this.state.psycholog}/>
                    </div>
                </div>
            </div>
        )
    }
}

const PsychologistsList = ({psychologis}) => {
    return  <div className="userinformation-list">  
                {psychologis.map((psycholog, i) => (
                    <div key={i}>
                        <Psychologis employee={psycholog}/>
                    </div>
                ))}
            </div>
}


const Empty = () => { 
    return <div>
        <br/>
        <div className="container mb-3">
            <Link to="/newemployee">
                <button type="button" style={{backgroundColor:'#EFE4E4', borderColor:'#E26F6F', borderRadius:'2em', width:'200px', color:'#AC354D'}}>הוסך עובד חדש</button>  
            </Link>
        </div>
        <br/>
       <h6 style={{color:'rgba(255, 99, 132, 1)', textAlign:"center=-"}}>אין אם/ב בית ברשימה</h6>
    </div>
}

const Loading = () => {
    return <div>
        <div style={{ display: "flex", justifyContent: "center"}}>
            <ReactLoading type={"bubbles"} color={"black"} height={'10%'} width={'10%'} />
        </div>
    </div>
}
