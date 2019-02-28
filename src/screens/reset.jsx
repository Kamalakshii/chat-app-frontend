import React, { Component } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { resetPassword } from '../services/userServices';
class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            confirmpassword: '',
            open: false,
        }
    }
    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };
    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ open: false });
    };
    handleSubmit = event => {
        event.preventDefault();
        if (this.state.password === '' || this.state.password.length < 8) {
            this.setState({ open: true });
        }
        else if (this.state.confirmpassword === '' || this.state.confirmpassword.length < 8) {

            this.setState({ open: true });
        }
        else if (this.state.password !== this.state.confirmpassword) {
            this.setState({ open: true });
        }

        else {
            var data = {
                password: this.state.password,

            }
            console.log(data.password);

            let currenturl = window.location.pathname;

            let token = currenturl.substr(15);
            console.log("Current url", currenturl);
            console.log("Token is:", token);
            resetPassword(data, token)
                .then((res) => {
                    console.log("reset page getting true ");
                    this.props.history.push("/Login")

                })
                .catch((err)=>{
                     alert("plz try again later");
                    
                })
        }
    }
    render() {
        return (
            <div>
                <form align="center">
                <div className="Input-Field">
                    <div>
                        < TextField label="New password" type="password"
                            onChange={this.handleChange('password')}
                        />
                    </div>
                    <div>
                        < TextField label="Confirm password" type="password"
                            onChange={this.handleChange('confirmpassword')}
                        />
                    </div>
                    <div className="button1">
                    <div id="buttonalign"  >
                        <Button variant="contained" color="primary" className="button" onClick={this.handleSubmit} >Submit</Button>
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
                    onClose={this.handleClose}

                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">
                        PLZ ENTER PROPER INPUT</span>}
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
export default ResetPassword;
