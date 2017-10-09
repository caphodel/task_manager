<div class="red-util-container" style="display: flex;">
    <h1 class="red-user-name"></h1>
    <j-spacer></j-spacer>
</div>
<div class="red-content-container">
    <table class="red-layout-table">
        <tr>
            <td style="width: 50%">
                Email: <span class="red-user-email"></span><br/> Registered on: <span class="red-user-created"></span><br/>
                <div class="red-user-projects red-card">
                    <j-toolbar><span>Projects</span></j-toolbar>
                    <div class="red-card-content"></div>
                </div>
            </td>
            <td style="width: 50%">
            </td>
        </tr>
    </table>
</div>
<script>
    /*redProjectPermissionChecker(function(permission){
                if(permission.match(/admin/) != null){
                    user_show();
                }
            });*/

    user_show();
    get_user_project();

    function user_show() {
        $.ajax({
            url: window.location.origin + ':8080/api/user/<?php echo $identifier;?>',
            type: 'GET',
            dataType: 'jsonp',
            success: function(data) {
                console.log(data)
                $('.red-user-name').text(data.fullname)
                $('.red-user-email').text(data.mail)
                $('.red-user-created').text(data.created_on.split('T')[0])
            },
            error: function() {},
            beforeSend: function setHeader(xhr) {
                xhr.setRequestHeader('x-access-token', Cookies.get('token'));
            }
        });
    }

    function get_user_project() {
        $.ajax({
            url: window.location.origin + ':8080/api/project/list',
            type: 'GET',
            dataType: 'jsonp',
            data: {
                where: {
                    main: {
                        '$members.user_id$': <?php echo $identifier;?>
                    }
                },
                attribute: {
                    main: ["members->member_role->role.name", ["name", "project_name"], "members.created_on"]
                }
            },
            success: function(data) {
                console.log(data)
                var $el = $('.red-user-projects > .red-card-content')
                $.each(data, function(i, val) {
                    $el.append(red_string_generator([val.identifier, val.project_name], 'project') + ' (' + val.name + ', ' + val.created_on.split('T')[0] + ')<br/>')
                })
            },
            error: function() {},
            beforeSend: function setHeader(xhr) {
                xhr.setRequestHeader('x-access-token', Cookies.get('token'));
            }
        });
    }

</script>
