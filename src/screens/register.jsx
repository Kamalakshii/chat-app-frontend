import React, { Component } from 'react';
import '../App.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { userRegister } from '../services/userServices'
class RegisterPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            open: false,
            up: false,
        };
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({ open: false });
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };
    handleRegister = event => {
        event.preventDefault();
        console.log("this.state.mailid");
        console.log("length", this.state.password.length);
        var Emailverify = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(this.state.email);
        console.log(this.state.email === '')
        if (this.state.firstname === '') {
            this.setState({ open: true });
        }

        else if (this.state.lastname === '') {
            this.setState({ open: true });
        }

        else if (this.state.email === '' || !Emailverify) {
            this.setState({ open: true });
        }

        else if (this.state.password === '' || this.state.password.length < 8) {
            this.setState({ open: true });
        }
        else {
            var data = {
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                email: this.state.email,
                password: this.state.password
            }
            userRegister(data)
                .then((responce) => {
                    console.log("hai how are u", responce);
                    this.props.history.push("/Login");
                })
        }
    }
    render() {
        return (
            <div>
                <form align="center">
                    <div className="Input-Field">
                        <h1>Registration</h1>
                        <div>
                            < TextField label=" firstname"
                                onChange={this.handleChange('firstname')}
                            />
                        </div>
                        <div>
                            < TextField label="lastname"
                                onChange={this.handleChange('lastname')}
                            />
                        </div>
                        <div>
                            < TextField label="email"
                                onChange={this.handleChange('email')}
                            />
                        </div>
                        <div>
                            < TextField label="password" type="password"
                                onChange={this.handleChange('password')}
                            />
                        </div>
                    </div>
                    <br />
                    <div className="button">
                        <div id="buttonalign">

                            <Button variant="contained" color="primary" className="button" type="reset" >Reset</Button>
                            <br />
                            <Button variant="contained" color="primary" className="button" onClick={this.handleRegister} > REGISTER</Button>
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
export { RegisterPage };
export default RegisterPage;
