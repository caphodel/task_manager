<div class="red-util-container">
    <j-toolbar>
        <h1 class="red-issue-tracker-name"> #
            <?php echo $identifier; ?>
        </h1>
        <j-spacer></j-spacer>
        <j-button red-permission="login" id="red-issue-watch"><i class="fa fa-eye"></i> Watch</j-button>
    </j-toolbar>
    <h1 class="red-issue-subject">
    </h1>
</div>
<div class="red-content-container">
    <table class="red-layout-table">
        <tr>
            <td>

            </td>
            <td width="400px">

            </td>
        </tr>
    </table>
    <div class="red-info-container" style="position: absolute; top: 180px; right: 20px; width: 400px;">
        <div class="red-issue-watchers">
            <h1>Watchers</h1><br/>
            <div style="display: inline-block;padding: 2px 5px;border-radius: 3px;box-shadow: inset 0 1px 2px rgba(27,31,35,0.075),0 0 0 0.2em rgba(3,102,214,0.3); border: 1px solid #5fa2dd; background: #fff;">Deddy <i class="fa fa-close"></i></div>
        </div>
    </div>
</div>
<script>
    $.ajax({
        url: window.location.origin + ':8080/api/issue/<?php echo $identifier;?>',
        type: 'GET',
        dataType: 'jsonp',
        success: function(data) {
            $('.red-issue-tracker-name').prepend(data.tracker.name);
            $('.red-issue-subject').prepend(data.subject);
            console.log(data.watchers.length)
            $('.red-issue-watchers h1').append(" ("+data.watchers.length+")");
            if (JSON.search(data, '//watchers/user[id="' + jwt_decode(Cookies.get('token')).id + '"]').length > 0) {
                $('#red-issue-watch').html('<i class="fa fa-eye-slash"></i> Unwatch')
            } else {}
        },
        error: function() {},
        beforeSend: function setHeader(xhr) {
            xhr.setRequestHeader('x-access-token', Cookies.get('token'));
        }
    });

</script>
