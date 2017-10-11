<script>
    var red_filter_list = [
            ['project_id', 'Project'],
            ['tracker_id', 'Tracker'],
            ['priority_id', 'Priority'],
            ['author_id', 'Author'],
            ['subject', 'Subject'],
            ['created_on', 'Created'],
            ['updated_on', 'Updated'],
            ['start_date', 'Start'],
            ['estimated_hours', 'Estimated time'],
            ['done_ratio', '% Done'],
            ['watcher_id', 'Watcher']
        ],
        red_status_list = [
            ['o', 'open'],
            ['=', 'is'],
            ['!', 'is not'],
            ['c', 'closed'],
            ['*', 'all']
        ],
        red_issue_operator = [
            ['=', 'is'],
            ['~', 'contains'],
            ['=', 'is not'],
            ['!~', 'doesn\'t contains'],
            ['=r', 'regular expression'],
            ['!r', 'doesn\'t containsregular expression'],
            ['*', 'all'],
            ['!*', 'none']
        ];

    var red_issue_filter = {
        where: {
            main: {
                "$status.is_closed$": 0
            }
        }
    }

    red_status_list_value = function() {
        $.ajax({
            url: window.location.origin + ':8080/api/status/list',
            type: 'GET',
            dataType: 'jsonp',
            success: function(data) {
                var list = []
                for(var i = 0; i < data.length ; i++){
                    list.push([data[i].id, data[i].name])
                }
                $('#red-issue-status-value')[0].generateData(list);
                $('#red-issue-status-value').val(list[0][0])
            },
            error: function() {},
            beforeSend: function setHeader(xhr) {
                xhr.setRequestHeader('x-access-token', Cookies.get('token'));
            }
        })
    }

</script>
<div class="red-issue-filter red-card">
    <j-toolbar><span>Filter</span></j-toolbar>
    <div class="red-card-content">
        <table class="red-layout-table">
            <tr>
                <td>
                    <j-selectfield id="red-issue-status" src-array="red_status_list">Status</j-selectfield>
                </td>
                <td>
                    <j-selectfield id="red-issue-status-value" style="display: none;" src-fn="red_status_list_value">Status</j-selectfield>
                </td>
                <td>
                    <j-selectfield id="red-add-filter" src-array="red_filter_list">Add filter</j-selectfield>
                </td>
            </tr>
        </table>
    </div>
</div>
<br/>
<script>
    $('#red-issue-status').on('select', function() {
        var value = $(this).val();
        switch (value) {
            case 'o':
                red_issue_filter.where.main['$status.is_closed$'] = 0;
                delete red_issue_filter.where.main.status_id;
                $('#red-issue-status-value').hide()
                break;
            case '=':
                red_issue_filter.where.main.status_id = $('#red-issue-status-value').val();
                delete red_issue_filter.where.main['$status.is_closed$'];
                $('#red-issue-status-value').show()
                break;
            case '!':
                red_issue_filter.where.main.status_id = $('#red-issue-status-value').val();
                delete red_issue_filter.where.main['$status.is_closed$'];
                $('#red-issue-status-value').show()
                break;
            case 'c':
                red_issue_filter.where.main['$status.is_closed$'] = 1;
                delete red_issue_filter.where.main.status_id;
                $('#red-issue-status-value').hide()
                break;
            case '*':
                delete red_issue_filter.where.main['$status.is_closed$'];
                delete red_issue_filter.where.main.status_id;
                $('#red-issue-status-value').hide()
                break;
        }
    }).on('afterdraw', function(){
        $('#red-issue-status').val(red_status_list[0][0])
    })

</script>
