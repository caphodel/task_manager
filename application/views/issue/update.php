<style>
    #red-issue-update-description,
    #red-issue-update-notes {
        width: 100%;
    }

    #red-issue-update-description textarea,
    #red-issue-update-notes textarea {
        flex: 1 1 0;
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        height: 200px;
    }

</style>
<div class="red-issue-update red-card" id="red-issue-update-container">
    <j-toolbar>
        <h5 class="j-spacer">
            Update
        </h5>
        <j-button id="red-issue-update-more">More</j-button>
    </j-toolbar>
    <div style="width: 100%;">
        <span>Properties</span>
    </div>
    <div class="red-column-detail" id="red-issue-update-more-content" style="display: none">
        <div>
            <j-selectfield id="red-issue-update-tracker_id">Tracker</j-selectfield>
        </div>
        <div>
            <j-textfield id="red-issue-update-subject">Subject</j-textfield>
        </div>
        <div>
            <j-textfield id="red-issue-update-parent_id">Parent task</j-textfield>
        </div>
        <div>
        </div>
        <div style="width: 100%;">
            <j-textarea id="red-issue-update-description">Description</j-textarea>
        </div>
    </div>
    <div class="red-column-detail">
        <div>
            <j-selectfield id="red-issue-update-status_id">Status</j-selectfield>
        </div>
        <div>
            <j-datefield format="YYYY-MM-DD" id="red-issue-update-start_date">Start</j-datefield>
        </div>
        <div>
            <j-selectfield id="red-issue-update-priority_id">Priority</j-selectfield>
        </div>
        <div>
            <j-datefield format="YYYY-MM-DD" id="red-issue-update-due_date">Due date</j-datefield>
        </div>
        <div>
            <j-selectfield id="red-issue-update-assigned_to_id">Assigned to</j-selectfield>
        </div>
        <div>
            <j-textfield id="red-issue-update-estimated_hours">Estimated time</j-textfield>
        </div>
        <div>
            <j-selectfield id="red-issue-update-done_ratio">% done</j-selectfield>
        </div>
    </div>
    <div style="width: 100%;">
        <span>Log time</span>
    </div>
    <div class="red-column-detail">
        <div>
            <j-textfield id="red-issue-update-hours">Spent time</j-textfield>
        </div>
        <div>
            <j-textfield id="red-issue-update-activity_id">Spent time</j-textfield>
        </div>
        <div>
            <j-textfield id="red-issue-update-comments">Comment</j-textfield>
        </div>
    </div>
    <div style="width: 100%;">
        <span>Notes</span>
    </div>
    <div class="red-column-detail">
        <div style="width: 100%;">
            <j-textarea id="red-issue-update-notes">Notes</j-textarea>
        </div>
        <div>
            <j-button id="red-issue-submit-update">Submit</j-button>&nbsp;
            <j-button id="red-issue-submit-preview">Preview</j-button>
        </div>
    </div>
</div>
<script>
    function red_issue_show_update_fields() {
        $('#red-issue-update-tracker_id').on('afterdraw', function() {
            $(this).val(red_issue_fields['tracker_id'])
        })
        $('#red-issue-update-subject').on('afterdraw', function() {
            $(this).val(red_issue_fields['subject'])
        })
        $('#red-issue-update-parent_id').on('afterdraw', function() {
            $(this).val(red_issue_fields['parent_id'])
        })
        $('#red-issue-update-description').on('afterdraw', function() {
            $(this).val(red_issue_fields['description'])
        })
        $('#red-issue-update-status_id').on('afterdraw', function() {
            $(this).val(red_issue_fields['status_id'])
        })
        $('#red-issue-update-start_date').on('afterdraw', function() {
            $(this).val(red_issue_fields['start_date'])
        })
        $('#red-issue-update-priority_id').on('afterdraw', function() {
            $(this).val(red_issue_fields['priority_id'])
        })
        $('#red-issue-update-due_date').on('afterdraw', function() {
            $(this).val(red_issue_fields['due_date'])
        })
        $('#red-issue-update-assigned_to_id').on('afterdraw', function() {
            $(this).val(red_issue_fields['assigned_to_id'])
        })
        $('#red-issue-update-estimated_hours').on('afterdraw', function() {
            $(this).val(red_issue_fields['estimated_hours'])
        })
        $('#red-issue-update-done_ratio').on('afterdraw', function() {
            $(this).val(red_issue_fields['done_ratio'])
        })
        var $el = $('.red-issue-update > div.red-column-detail')

        $.each(red_issue_update_fields, function(i, val) {
            var field = ''
            switch (val.custom_field.field_format) {
                case 'string':
                    field = '<div><j-textfield id="red-issue-update-' + val.custom_field.id + '" data-value="' + val.value + '">' + val.custom_field.name + '</j-textfield></div>';
                    break;
                case 'text':
                    field = '<div><j-textarea id="red-issue-update-' + val.custom_field.id + '" data-value="' + val.value + '">' + val.custom_field.name + '</j-textarea></div>';
                    break;
                case 'date':
                    field = '<div><j-datefield format="YYYY-MM-DD" id="red-issue-update-' + val.custom_field.id + '" data-value="' + val.value + '">' + val.custom_field.name + '</j-datefield></div>';
                    break;
                case 'list':
                    window['red_issue_update_custom_' + val.custom_field.id] = val.custom_field.possible_values.replace(/- /ig, '').replace('--', '').split('\n').filter(function(a) {
                        return a != '';
                    }).reduce(function(a, b) {
                        return a.concat([
                            [b, b]
                        ]);
                    }, [])
                    field = '<div><j-selectfield id="red-issue-update-' + val.custom_field.id + '" data-value="' + val.value + '" src-array="red_issue_update_custom_' + val.custom_field.id + '">' + val.custom_field.name + '</j-selectfield></div>';
                    break;
            }
            $(field).insertAfter($('#red-issue-update-done_ratio').parent())
        })

        $('#red-issue-update-3').attr('data-value', jwt_decode(Cookies.get('token')).fullname)
    }

    red_issue_show_update_fields()

    $.ajax({
        url: window.location.origin + ':8080/api/status/list',
        type: 'GET',
        dataType: 'jsonp',
        success: function(data) {
            var list = []

            for (var i = 0; i < data.length; i++) {
                list.push([data[i].id, data[i].name])
            }

            window['red_issue_update_status'] = list;
            $("#red-issue-update-status_id").attr('src-array', 'red_issue_update_status')
        },
        error: function() {},
        beforeSend: function setHeader(xhr) {
            xhr.setRequestHeader('x-access-token', Cookies.get('token'));
        }
    })

    $.ajax({
        url: window.location.origin + ':8080/api/enumeration/list?where[main][type]=IssuePriority&where[main][active]=1',
        type: 'GET',
        dataType: 'jsonp',
        success: function(data) {
            var list = []

            for (var i = 0; i < data.length; i++) {
                list.push([data[i].id, data[i].name])
            }

            window['red_issue_update_priority'] = list;
            $("#red-issue-update-priority_id").attr('src-array', 'red_issue_update_priority')
        },
        error: function() {},
        beforeSend: function setHeader(xhr) {
            xhr.setRequestHeader('x-access-token', Cookies.get('token'));
        }
    })

    $.ajax({
        url: window.location.origin + ':8080/api/project/' + red_project_identifier + '/members',
        type: 'GET',
        dataType: 'jsonp',
        success: function(data) {
            var list = [],
                key = []

            for (var i = 0; i < data.length; i++) {
                if (key.indexOf(data[i].user.id) == -1) {
                    key.push(data[i].user.id)
                    list.push([data[i].user.id, data[i].user.fullname])
                }
            }

            window['red_issue_update_assigned_to_id'] = list;
            $("#red-issue-update-assigned_to_id").attr('src-array', 'red_issue_update_assigned_to_id')
        },
        error: function() {},
        beforeSend: function setHeader(xhr) {
            xhr.setRequestHeader('x-access-token', Cookies.get('token'));
        }
    })

    $.ajax({
        url: window.location.origin + ':8080/api/tracker/list',
        type: 'GET',
        dataType: 'jsonp',
        success: function(data) {
            var list = []

            for (var i = 0; i < data.length; i++) {
                list.push([data[i].id, data[i].name])
            }

            window['red_issue_update_tracker'] = list;
            $("#red-issue-update-tracker_id").attr('src-array', 'red_issue_update_tracker')
        },
        error: function() {},
        beforeSend: function setHeader(xhr) {
            xhr.setRequestHeader('x-access-token', Cookies.get('token'));
        }
    })

    window['red_issue_update_done_ratio'] = [
        [0, 0],
        [10, 10],
        [20, 20],
        [30, 30],
        [40, 40],
        [50, 50],
        [60, 60],
        [70, 70],
        [80, 80],
        [90, 90],
        [100, 100]
    ];
    $("#red-issue-update-done_ratio").attr('src-array', 'red_issue_update_done_ratio')


    $('body').scrollTop(findPos($('#red-issue-update-container')[0]))

    $('#red-issue-update-more').click(function() {
        $('#red-issue-update-more').text() == 'More' ? $('#red-issue-update-more').text('Less') : $('#red-issue-update-more').text('More');
        $('#red-issue-update-more-content').toggle();
    })

</script>
