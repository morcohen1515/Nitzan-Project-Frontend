import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class NavbarUser extends Component {

    constructor(props){

        super(props);

        this.logout = this.logout.bind(this);       
    }

    logout() {
        localStorage.removeItem("x-api-key");
    }

    render() {
        return (            
            <div>
                <nav className="navbar navbar-expand-sm navbar-dark"  style={{background:'#930404'}}>  
                    <div className="container" style={{justifyContent: "right"}}>
                        <ul className="navbar-nav">  
                            <li className="nav-item active">  
                                <Link style={{color:'white'}} onClick={this.logout} to="/" className="nav-link">התנתקות</Link> 
                            </li> 
                        </ul>  
                    </div>
                </nav>
            </div>
        )
    }
}