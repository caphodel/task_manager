<div class="red-util-container" style="display: flex;">
    <j-spacer></j-spacer><j-button red-permission="login"><i class="fa fa-plus"></i> New Task</j-button>
</div>

<script>
    function red_issue() {
        var $el = $('#red-tbl-issue');
        $el[0].param.sEcho++
        var echo = $el[0].param.sEcho;

        $.ajax({
            url: window.location.origin + ':8080/api/issue/total',
            type: 'GET',
            dataType: 'jsonp',
            sEcho: echo,
            data: {
                where: {
                    main: {
                        "$project.identifier$": "<?php echo $identifier;?>"
                    }
                }
            },
            success: function(data) {
                if(this.sEcho == $el[0].param.sEcho)
                    $el[0].param.iTotalRecords = data[0].total
            },
            error: function() {},
            beforeSend: function setHeader(xhr) {
                xhr.setRequestHeader('x-access-token', Cookies.get('token'));
            }
        });
        $.ajax({
            url: window.location.origin + ':8080/api/issue/list/' + $el[0].param.iDisplayLength + '/' + $el[0].param.iDisplayStart,
            type: 'GET',
            dataType: 'jsonp',
            sEcho: echo,
            data: {
                where: {
                    main: {
                        "$project.identifier$": "<?php echo $identifier;?>"
                    }
                }
            },
            success: function(data) {
                if(this.sEcho == $el[0].param.sEcho)
                    $('#red-tbl-issue')[0].generateData(data)
            },
            error: function() {},
            beforeSend: function setHeader(xhr) {
                xhr.setRequestHeader('x-access-token', Cookies.get('token'));
            }
        });
    }

    function red_issue_custom(record){
        data = ['<a href="<?php echo base_url() ?>issues/'+record.id+'">'+record.id+'</a>', record.tracker.name, record.status.name, record.priority.name, '<a href="<?php echo base_url() ?>issues/'+record.id+'">'+record.subject+'</a>', '<a href="<?php echo base_url() ?>user/'+record.assigned_to.id+'">'+record.assigned_to.name+'</a>', record.updated_on.replace('T', ' ').replace('.000Z', '')];
        return data;
    }

</script>

<div class="red-content-container">
    <j-panel>
        <div class="j-header">
            Issues
        </div>
        <j-table id="red-tbl-issue" src-fn="red_issue" paging="true" custom="red_issue_custom">
            [ ["#", "Tracker", "Status", "Priority", "Subject", "Assigned To", "Updated"] ]
        </j-table>
    </j-panel>
</div>
