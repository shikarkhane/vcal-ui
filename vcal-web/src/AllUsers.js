import { conf } from './Config';
import React, { Component } from 'react';
import {getUserInfo} from './Utility';

class AllUserDropDown extends Component {
    constructor(props) {
        super(props);

        this.overrideUser = this.overrideUser.bind(this);
    }

    overrideUser(userId){
        if ( userId === localStorage.getItem("localAdminUserId")){
            localStorage.setItem("adminOverrideInProgress", false);
        }
        else{
            localStorage.setItem("adminOverrideInProgress", true);
        }

        localStorage.setItem("localAdminUserId", userId);
        localStorage.setItem("userId", userId);
    }

    render(){
        var  allUsers = JSON.parse(localStorage.getItem("usersObj"));
        const userList = allUsers.map((x) =>
            <button key={x.id} className="dropdown-item" type="button"
                    onClick={() =>this.overrideUser(x.id)}> {x.name}</button>);
        return (<div>
            <h1 className="display-4">Acting as:{(getUserInfo(localStorage.getItem("userId"))).name}</h1>

        <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Change to user!
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            {userList}
        </div>
        </div>

            </div>);
    }
}

export default AllUserDropDown;