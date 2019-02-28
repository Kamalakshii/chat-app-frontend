
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import '../App.css';
class dashBoard extends Component {

    render() {
        return (
            <div>
                <div className="Input-Field">
                    <h1>Welcome to ChatApp</h1>
                    <div>
                        <div className="dashboard">
                        <div class="mui-dropdown">
                            <button class="mui-btn mui-btn--primary" data-mui-toggle="Users">
                                USERS
    <span class="mui-caret"></span>
                            </button>
                            <ul class="mui-dropdown__menu">
                                <li><a href="#">User 1</a></li>
                                <li><a href="#">User 2</a></li>
                                <li><a href="#">User 3</a></li>
                                <li><a href="#">User 4</a></li>
                            </ul>
                </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}
export { dashBoard };
export default dashBoard;