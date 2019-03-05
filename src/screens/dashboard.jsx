import '../components/appBar';
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import TextField from '@material-ui/core/TextField';
import io from 'socket.io-client';
import MenuItem from '@material-ui/core/MenuItem';
import { chatServices, userChatArray } from "../services/chatService";
import '../App.css';
const socket = io.connect('http://localhost:4000');
export default class dashBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            MsgArray: [],
            message: "",
            MsgDisplay: "",
            Receiver: '',
            Sender: '',
            msg: [],
            onlineUser: [],
        }
    }
    componentDidMount() {
        /**
         * Get all the users data
         **/
        chatServices()
            .then((result) => {
                this.setState({
                    onlineUser: result.data.result
                })
                console.log("users", result.data.result);
            })
            .catch((error) => {
                alert(error)
            });
        userChatArray()
            .then((result) => {
                this.setState({
                    MsgArray: result.data.result
                })
                console.log("chat history is :", this.state.MsgArray);
            })
            .catch((error) => {
                alert(error);
            });

        const Sender = localStorage.getItem('Sender');
        socket.on(Sender, (res) => {
            console.log("response in dash board ==>", res);
            const msg = this.state.msg;
            msg.push(res);
            this.setState({ msg: msg });
            console.log("this set msg ==>", this.state.msg);
        })
    }
    /**
     * Takes the users list
     */
    handleClick = (key, event) => {
        this.setState({ anchorEl: null });
        let Receiver = event.target.textContent;
        this.setState({ Receiver: Receiver });
        localStorage.setItem("Reciever", Receiver);
    };

    handleLogout = event => {
        event.preventDefault();
        this.props.history.push("/login");
    }
    handleMessage = (e) => {
        this.setState({ message: e.target.value });
    }

    handleSubmit = event => {
        event.preventDefault();
        if (!this.state.message) {
            this.props.history.push("/dashBoard");
        } else if (this.state.isUserSelected === false)
            this.props.history.push("/dashboard");
        else {
            const Sender = localStorage.getItem("Sender");
            this.setState({ Sender: Sender });
            console.log("Sender is :", Sender);
            console.log("Selected receiver: ", this.state.Receiver);
            const data = {
                senderId: Sender,
                recieverId: this.state.Receiver,
                message: this.state.message
            };
            socket.emit("new_msg", data);
            this.setState({
                message: "",
                anchorEl: null
            });
        }
    };
    render() {
        const loginUsers = this.state.onlineUser.map((key) => {
            if (key.email !== localStorage.getItem('Sender')) {
                return (
                    <MenuItem onClick={(event) => this.handleClick(key, event)}>{key.email}</MenuItem>
                )
            }
            else {
                return true;
            }
        })

        const msg = this.state.MsgArray.map(key => {
            return (
                <div>
                    {key.senderId === localStorage.getItem("Sender") ? (
                        key.recieverId === this.state.Receiver ? (
                            <div className="sender-div">
                                {
                                    <label>
                                        <i>
                                            {key.senderId}
                                        </i>
                                        :
            </label>
                                }
                                <div>{key.message}</div>
                            </div>
                        ) : null
                    ) : null}
                    {key.senderId === this.state.Receiver ? (
                        <div className="receiver-div">
                            <label>
                                {" "}
                                <i>
                                    {key.senderId}
                                </i>
                                :
            </label>
                            <div>{key.message} </div>
                        </div>
                    ) : null}
                </div>
            );
        });

        const msgdis = this.state.msg.map(key => {
            return (
                <div>
                    {key.recieverId === localStorage.getItem("Reciever") ? (
                        key.senderId === this.state.Sender ? (
                            <div className="sender-div">
                                <label>
                                    <i>
                                        {key.senderId}
                                    </i>
                                    :
            </label>
                                <div>{key.message}</div>
                            </div>
                        ) : null
                    ) : null}
                    {key.senderId === this.state.Receiver ? (
                        <div className="receiver-div">
                            <label>
                                <i>
                                    {key.senderId}
                                </i>
                                :
            </label>
                            <div>{key.message}</div>
                        </div>
                    ) : null}
                </div>
            );
        });

        return (
            <div className="root">

                <AppBar position="static" align="center"><h1>Welcome to Chat-App</h1>
                </AppBar>
                <div className="logoutbutton"><Button className="logoutbutton" color="inherit" onClick={this.handleLogout}>Logout</Button>
                </div>
                <div className="box">
                    <label><b>Users List:-</b></label>
                    {loginUsers}
                </div>
                <h3>{this.state.Sender} In conversation with {this.state.Receiver}</h3>
                <div>
                    <p><h4><u>Login User</u>:-{localStorage.getItem('Sender')}</h4></p>
                    <div className="dashboard">
                    </div>

                </div>
                <div className="msgdisplay">
                    {msg}
                    {msgdis}
                   
                </div>

                <div className="containerButton">
                    <TextField
                        type="textfield"
                        value={this.state.message}
                        placeholder="Type here..."
                        onChange={this.handleMessage}
                        variant="filled"
                        InputProps={{
                            disableUnderline: true
                        }}
                    />
                </div>

                <div className="sendbutton">
                    <Button
                        id="send"
                        type="submit"
                        variant="contained"
                        color="primary"
                        title="click on send"
                        onClick={this.handleSubmit}>
                        send
                        </Button>
                </div>
            </div>
        )
    }
}

