
import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import '../App.css';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Snackbar from '@material-ui/core/Snackbar';

import { userLogin } from '../services/userServices'
class
    Loginpage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            open: false,
        }
    }

    handleforgetpassword = event => {
        event.preventDefault();
        this.props.history.push("/forgot");

    }
    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ open: false });
    };

    handleReg = event => {
        event.preventDefault();
        this.props.history.push("/register");

    }
    handleSubmit = event => {
        event.preventDefault();
        // console.log(this.state.username);
        //  console.log(this.state.username === '');
        //  console.log("hai how are u");
        console.log("msg in login page======>,", this.state.email);
        console.log("password in  login===>", this.state.password);
        var Emailverify = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(this.state.email);

        console.log("this.state.email === ''", this.state.email === '');

        if (this.state.email === '' || !Emailverify) {

            this.setState({ open: true });
        }
        else if (this.state.password === '' || this.state.password.length < 6) {
            this.setState({ open: true });
        }

        else {
            var data = {
                email: this.state.email,
                password: this.state.password,
            }
            userLogin(data)
                .then((res) => {

                      console.log("responce true",res);
                    console.log(this.state.email);
                    localStorage.setItem('Sender', this.state.email);
                    
                    this.props.history.push("/dashBoard");

                }).catch((err) => {
                    console.log("err", err);

                    alert("Login unsuccessful!!");
                })
          
        }
    }

    handleChange = name => {
        console.log("hai name in login " + name);

        this.setState({ [name]: name });
    };

    handleChange1 = name => event => {
        console.log("hai name in login " + name);

        this.setState({ [name]: event.target.value });
    };

    render() {
        // console.log("msg in login page======>,",this.state.email);
        // console.log("password in  login===>",this.state.password);

        return (
            <div>

                <div >
                    <form align="center">

                        <div className="Input-Field">
                            <h1>Welcome to Chat-App</h1>
                            <div>

                                {/* <Input handleChange={this.handleChange} type={"text"} label={"Email"} />
                             <Input handleChange={this.handleChange} type={"password"} label={"Password"} /> */}

                                < TextField label="email"
                                    onChange={this.handleChange1('email')}
                                />
                                <br />
                            </div>
                            <div>

                                {/* <Inputpassword handlepassword={this.handleChange} /> */}
                                <TextField className="margin" label="password" type="password"
                                    onChange={this.handleChange1('password')}
                                />
                            </div>
                        </div>

                        <div>
                            {/* <Loginbutton /> */}
                        </div>
                        <div className="button">
                            <div id="buttonalign" >
                               <Button variant="contained" color="primary" className="button" onClick={this.handleSubmit} > SUBMIT</Button>
                                <Button variant="contained" color="primary" className="button" onClick={this.handleReg} > REGISTER</Button>
                            
                                </div>

                            <br />
                            <div id="forgetbutton" >
                                <Button variant="contained" color="primary" className="button" onClick={this.handleforgetpassword} >Forgot Password?</Button>
                            </div>
                        </div>

                    </form>
                </div>

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
        );
    }
}
export { Loginpage };
export default Loginpage;






