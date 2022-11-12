var user;
var password;
var isLogged = false;
var returnPage = "index.php";



$(document).ready(function() 
{
    
    $('#registerSection').hide();



});



function isLoggedVal()
{



}





function hideLogin(){
    $('#loginSection').hide();
    
    $('#registerSection').show(1000);
    $("#emailLogin").val( "" );
    $("#passwordLogin").val( "" );


}

function showLogin(){
    $('#loginSection').show(1000);
    $('#registerSection').hide();
    $("#phpUsernameRegister").val("");
    $("#phpEmailRegister").val( "" );
    $("#password").val( "" );
    $("#phpFirstNameRegister").val( "" );
    $("#phpLastNameRegister").val( "" );
    $("#verifyPassword").val( "" );
}