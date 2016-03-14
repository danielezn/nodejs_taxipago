$(document).ready(function() {
    var x_timer;    
    $("#username").keyup(function (e){
        clearTimeout(x_timer);
        var user_name = $(this).val();
        x_timer = setTimeout(function(){
            check_username_ajax(user_name);
        }, 500);
    }); 

function check_username_ajax(username){
    if(/[a-z]/i.test(username)){
        $("#user-result").html('Buscando...');
        $.post('/usernamecheck', {'username':username}, function(data) {
            if(data.available == true){
                $("#user-result").html('Usuario disponible');
                document.getElementById('submit_btn').disabled = false;
            }else{
                $("#user-result").html('Usuario no disponible');
                document.getElementById('submit_btn').disabled = true;
            }
            
        });
    }else{
        $("#user-result").html('Debe ingresar un usuario valido');
        document.getElementById('submit_btn').disabled = true;
    }
}
});