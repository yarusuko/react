import React from 'react';
import {Navbar, Nav, Dropdown, DropdownButton } from "react-bootstrap"
import { Link } from 'react-router-dom';
import history from "../../index"
class Header extends React.Component {
    render(){
        return(
            <Navbar expand="lg" variant="light" bg="light" className="justify-content-end">
                <Link className="nav-link" to="/"> Добавление фигур </Link> 
                <Link className="nav-link" to="/stats"> Статистика </Link>
                <Nav.Item>
                    <DropdownButton
                        title={"Привет " + localStorage.getItem("username") }
                    >
                        <Dropdown.Item onClick={()=>{
                                        localStorage.removeItem('user');
                                         history.push('/')
                                        }}> 
                                     Выход
                        </Dropdown.Item>
                    
                    </DropdownButton>
                </Nav.Item>
            </Navbar>
        )
    }
}
export default Header