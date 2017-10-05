<div class="red-util-container" style="display: flex;">
    <h1 class="red-user-name"></h1>
    <j-spacer></j-spacer>
</div>
<div class="red-content-container">
</div>
<script>
    redProjectPermissionChecker(function(permission){
        if(permission.match(/admin/) != null){
            user_show();
        }
    });

    function user_show(){

        $.ajax({
            url: window.location.origin + ':8080/api/user/<?php echo $identifier;?>',
            type: 'GET',
            dataType: 'jsonp',
            success: function(data) {
                console.log(data)
            },
            error: function() {},
            beforeSend: function setHeader(xhr) {
                xhr.setRequestHeader('x-access-token', Cookies.get('token'));
            }
        });
    }

</script>
