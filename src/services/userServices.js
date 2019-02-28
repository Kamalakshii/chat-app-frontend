import axios from 'axios';
function userRegister(data) {
 return axios.post('/register', data);
}
function userLogin(data) {
   return axios.post('/login', data);
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
        alert('Kindly check your mail....');
    })
    .catch(function(err){
        console.log("errrrr",err);
        alert('User not found');
    });        
        
}
function resetPassword(data, token) {

    console.log("data from front end ", data.password);

  return axios.post(`/resetPassword/${token}`, { 'data': data.password },{headers:{ 'token': token }})

}
export {
    userRegister,
    userLogin,
    resetPassword,
    forgotPassword
}
