import React, { Component } from 'react';
//import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import '../App.css';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Snackbar from '@material-ui/core/Snackbar';
import { forgotPassword } from '../services/userServices'
class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            open: false,
        }
    }
    handlesubmit = event => {
        event.preventDefault();
        console.log("this.state.email ");
        console.log(this.state.email);
        var Emailverify = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(this.state.email);

        if (this.state.email === '' || !Emailverify) {

            this.setState({ open: true });
        }
        else {
            var data = {
                email: this.state.email,
            }
            forgotPassword(data);  
        }

    }
    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ open: false });
    };
    handleChange = name => event => {

        this.setState({ [name]: event.target.value });
    }
    render() {
        return (
            <div>
                <form align="center">
                <div className ="Input-Field">
                <h1>Forgot Password!!!</h1>
                    <div >
                        < TextField label="email"
                            onChange={this.handleChange('email')}
                        />
                    </div>
                    <div className ="button">
                    <div>
                        <Button id="forgetsubmit" variant="contained" color="primary" onClick={this.handlesubmit} >submit</Button>
                    </div>
                    </div>
                    </div>
                </form>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    open={this.state.open}
                    autoHideDuration={6000}


                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">
                        Plz Enter valid Email</span>}
                    action={[
                        <Button key="undo" color="secondary" size="small" onClick={this.handleClose}>
                            UNDO
    </Button>,
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            //  className={classes.close}
                            onClick={this.handleClose}
                        >
                            <CloseIcon />
                        </IconButton>,
                    ]}
                />
            </div>

        )

    }
}
export default ForgotPassword;
