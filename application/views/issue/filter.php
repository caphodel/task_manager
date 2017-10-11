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
            ['=', 'is not'],
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
        console.log($(this).val())
    })

</script>
