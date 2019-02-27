import axios from 'axios';

// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
function userRegister(data) {
   
 return axios.post('/register', data);
//    .then(function (response) {

//             console.log("responce register",response);

//             //  this.props.props.history.push("/Login");

//            // window.location.href = '/Login';
//             // alert('Registered success..')

//         })
//         .catch(function (err) {
//             console.log(err);
//             alert("User with email id already exists!!")

//         })
}

function userLogin(data) {

   return axios.post('/login', data);
        // .then(function (response) {

        //     console.log(response);
        //     //alert("Login Successfully!!");
        //     // this.props.props.history.push("/dashBoard");
        //     window.location.href = '/dashBoard';

        // })
        // .catch(function (err) {
        //     console.log(err);
        //     alert("Login unsuccessful!!");
        // });
}

{/*function verifyEmail(data) {
    axios.post('/forgot', data)
        .then(function (response) {

            alert(' plz check your email..')
        })
        .catch(function (err) {
            console.log(err);
            alert('User Not Found..');
        });
}*/}
function forgotPassword(data){
    
     axios.post('/forgotpassword',data)
    .then(function(response){
        console.log("reeesssss=====",response);
        alert('Please check your mail');
    })
    .catch(function(err){
        console.log("errrrr",err);
        alert('User not found');
    });        
        
}
function passwordupdate(data, token) {

    console.log("data from front end ", data.password);

  return axios.post(`/reset/${token}`, { 'data': data.password },{headers:{ 'token': token }})
        // .then(function (response) {
        //     alert('update sucessfully');
        //     window.location.href = '/Login';
        // })
        // .catch(function (err) {

        //     alert('FAIl to update');
        // })


}
function getallusers(){

return axios.get('/getallusers');


}
export {
    userRegister,
    userLogin,
   // verifyEmail,
    passwordupdate,
    getallusers,
    forgotPassword
}
