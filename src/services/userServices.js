import axios from 'axios';
function userRegister(data) {
 return axios.post('/register', data);
}
function userLogin(data) {
   return axios.post('/login', data);
}
function forgotPassword(data){
    
     axios.post('/forgotpassword',data)
    .then(function(response){
        console.log("reee=====",response);
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
