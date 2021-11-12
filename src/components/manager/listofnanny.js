import React, { Component } from 'react';
import axios from 'axios';
import NavbarUser from '../../components/navbaruser';
import ReactLoading from 'react-loading';
import Nannys from './employeeInformation';
import { Link } from 'react-router-dom';

export default class ListOfNanny extends Component {

    constructor(props){

        super(props);   

        this.state = {
            nanny: [],
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
            usertype: "אם/ב בית"
        }

        await axios.post("http://localhost:5000/user/getlistofemployees", ut)
        .then(res => {
            console.log("getlistofemployees" + res.data);
            this.setState({nanny: res.data, loading: false})           
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
                                    this.state.nanny.length === 0 && <Empty/>
                                }

                            </div>                      
                    }
                    {console.log("before notelist:" + this.state.nanny)}
                    <br/>
                    <NannysList nannys={this.state.nanny}/>
                    </div>
                </div>
            </div>
        )
    }
}

const NannysList = ({nannys}) => {
    return  <div className="userinformation-list">  
                {nannys.map((nanny, i) => (
                    <div key={i}>
                        <Nannys employee={nanny}/>
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
