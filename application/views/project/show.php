<script>
    red_project_identifier = '<?php echo $identifier;?>';
    $('#red-btn-task').attr('href', '<?php echo base_url() ?>projects/'+red_project_identifier+'/issues');
    redProjectPermissionChecker(function(permission) {
        /*if(permission.match(/(:view_project)(:admin)/))
            red_get_watcher();*/

        $.ajax({
            url: window.location.origin + ':8080/api/project/<?php echo $identifier;?>',
            type: 'GET',
            dataType: 'jsonp',
            success: function(data) {
                if (data != null) {
                    $('.red-project-name').html(data.name)
                    $('.red-project-description').html(data.description)
                    project_show()
                } else {
                    redLoad(redDomain + 'base/not_found', "#red-content")
                }
            },
            error: function() {},
            beforeSend: function setHeader(xhr) {
                xhr.setRequestHeader('x-access-token', Cookies.get('token'));
            }
        });
    });

    function project_show() {
        $.ajax({
            url: window.location.origin + ':8080/api/project/<?php echo $identifier;?>/members',
            type: 'GET',
            dataType: 'jsonp',
            success: function(data) {
                $.each(data, function(i, val) {
                    if ($('.red-project-role-' + val.member_role.role.name.replace(/ /g, '_')).length == 0) {
                        $('.red-project-members').append('<p class="red-project-role-' + val.member_role.role.name.replace(/ /g, '_') + '">' + val.member_role.role.name + ': </p>')
                        $('.red-project-role-' + val.member_role.role.name.replace(/ /g, '_')).append('<a href="<?php echo base_url() ?>users/' + val.user_id + '">' + val.user.fullname + '</a>')
                    } else {
                        $('.red-project-role-' + val.member_role.role.name.replace(/ /g, '_')).append(', <a href="<?php echo base_url() ?>users/' + val.user_id + '">' + val.user.fullname + '</a>')
                    }
                })
            },
            error: function() {},
            beforeSend: function setHeader(xhr) {
                xhr.setRequestHeader('x-access-token', Cookies.get('token'));
            }
        });
        $.ajax({
            url: window.location.origin + ':8080/api/project/<?php echo $identifier;?>/issues?groupby=["tracker_id", "status.is_closed"]&orderby=[["tracker_id", "asc"], ["status_id", "asc"]]',
            type: 'GET',
            dataType: 'jsonp',
            success: function(data) {
                $.each(data, function(i, val) {
                    if ($('.red-project-tracker-' + val.tracker.name.replace(/ /g, '_')).length == 0) {
                        $('.red-project-task').append('<p class="red-project-tracker-' + val.tracker.name.replace(/ /g, '_') + '"><a href="<?php echo base_url() ?><?php echo $identifier;?>/issues?tracker_id=' + val.tracker.id + '">' + val.tracker.name + '</a>: </p>')
                        $('.red-project-tracker-' + val.tracker.name.replace(/ /g, '_')).append(val.count + ' Open')
                    } else {
                        $('.red-project-tracker-' + val.tracker.name.replace(/ /g, '_')).append('/' + val.count)
                    }
                })
            },
            error: function() {},
            beforeSend: function setHeader(xhr) {
                xhr.setRequestHeader('x-access-token', Cookies.get('token'));
            }
        });
    }

</script>
<div class="red-util-container" style="display: flex;">
    <h1 class="red-project-name"></h1>
    <j-spacer></j-spacer>
    <j-button red-permission="login"><i class="fa fa-plus"></i> New Task</j-button>
</div>
<div class="red-content-container">
    <table class="red-layout-table">
        <tr>
            <td width="50%">
                <h1 class="red-project-description" style="padding: 10px;"></h1>
            </td>
            <td rowspan="2">
                <div class="red-info-container">
                    <h1>Members</h1><br/>
                    <div class="red-project-members"></div>
                </div>
            </td>
        </tr>
        <tr>
            <td style="padding-right: 10px;">
                <div class="red-info-container">
                    <h1>Task Tracking</h1><br/>
                    <div class="red-project-task"></div>
                </div>
            </td>
        </tr>
    </table>
</div>
<script>
    $('#red-btn-task').attr('href', "<?php echo base_url() ?>projects/<?php echo $identifier;?>/issues?where[main][$status.is_closed$]=1");

</script>
