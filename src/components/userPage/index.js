import React from "react"
import Header from "../header"
import Info from "../../container/info"
import {Route,Switch,Redirect} from "react-router-dom"
import Statistics from '../../container/stats'
import adminPanel from "../../container/adminPanel"
import PrivateRouteForAdmin from "../../components/PrivateRouteForAdmin"
import SettingsPage from "../../container/SettingsPanel"
class UserPage extends React.Component {
    render(){
        return(
            <div className="container">
                <Header/>
                <Switch>
                    <Route exact path ="/user/:name" component = {Info}/>
                    <Route path ="/user/stats/:name" component = {Statistics}/>
                    <Route path ="/user/settings/:name" component = {SettingsPage}/>
                    <PrivateRouteForAdmin path ="/user/admin/:name" component = {adminPanel}/>   
                    <Redirect to = "/"/>
                </Switch>
            </div>
        )
    }
}

export default UserPage