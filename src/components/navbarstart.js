import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class NavbarStart extends Component {

    render() {
        return (            
            <div>
                <nav className="navbar navbar-expand-sm navbar-dark" style={{background:'#930404'}}>  
                    <div className="container">
                        <ul className="navbar-nav">  
                            <li className="nav-item active">  
                                <Link style={{color:'white'}} to="#" className="navbar-brand">Nitzan Note Digital</Link>  
                            </li>    
                        </ul>  
                    </div>
                </nav>
            </div>
        )
    }
}

