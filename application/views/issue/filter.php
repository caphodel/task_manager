<script>
    var red_filter_list = [
            ['project_id', 'Project'],
            ['tracker_id', 'Tracker'],
            ['priority_id', 'Priority'],
            ['assigned_to_id', 'Assigned to'],
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
            ['>=', '>='],
            ['<=', '<='],
            ['~', 'contains'],
            ['!', 'is not'],
            ['!~', 'doesn\'t contains'],
            ['=r', 'regular expression'],
            ['!r', 'doesn\'t contains regular expression'],
            ['>t+', 'in more than'],
            ['<t+', 'in less than'],
            ['t+', 'in'],
            ['<t-', 'more than days ago'],
            ['>t-', 'less than days ago'],
            ['t-', 'days ago'],
            ['t', 'today'],
            ['w', 'this week'],
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

    function red_issue_cf_filter() {
        $.ajax({
            url: window.location.origin + ':8080/api/custom_field/list?where[main][type]=IssueCustomField&where[main][is_filter]=1',
            type: 'GET',
            dataType: 'jsonp',
            success: function(data) {
                var list = []
                for (var i = 0; i < data.length; i++) {
                    red_filter_list.push(['cf_' + data[i].id+'[#]'+data[i].field_format+'[#]'+data[i].possible_values, data[i].name])
                    $('#red-add-filter')[0].generateData(red_filter_list)
                }
            },
            error: function() {},
            beforeSend: function setHeader(xhr) {
                xhr.setRequestHeader('x-access-token', Cookies.get('token'));
            }
        })
    }

    red_status_list_value = function() {
        $.ajax({
            url: window.location.origin + ':8080/api/status/list',
            type: 'GET',
            dataType: 'jsonp',
            success: function(data) {
                var list = []
                for (var i = 0; i < data.length; i++) {
                    list.push([data[i].id, data[i].name])
                }
                $('#red-issue-status_id-value')[0].generateData(list);
            },
            error: function() {},
            beforeSend: function setHeader(xhr) {
                xhr.setRequestHeader('x-access-token', Cookies.get('token'));
            }
        })
    }

    var red_filter_form = [
        ['project_id', '=,!', 'Project', 'list', ':8080/api/project/list'],
        ['tracker_id', '=,!', 'Tracker', 'list', ':8080/api/tracker/list'],
        ['priority_id', '=,!', 'Priority', 'list', ':8080/api/enumeration/list?where[main][type]=IssuePriority&where[main][active]=1'],
        ['assigned_to_id', '=,!,!*,*', 'Assigned to', 'list', ':8080/api/user/list'],
        ['author_id', '=,!', 'Author to', 'list', ':8080/api/user/list'],
        ['subject', '~,!~,=r,!r', 'Subject', 'text'],
        ['created_on', '>t-,<t-,t-,t,w', 'Created', 'text'],
        ['created_on', '>t-,<t-,t-,t,w', 'Created', 'text'],
        ['updated_on', '>t-,<t-,t-,t,w', 'Updated', 'text'],
        ['start_date', '<t+,>t+,t+,>t-,<t-,t-,t,w', 'Start', 'text'],
        ['due_date', '<t+,>t+,t+,>t-,<t-,t-,t,w', 'Due date', 'text'],
        ['estimated_hours', '=,>=,<=,!*,*', 'Estimated hours', 'text'],
        ['done_ratio', '=,>=,<=,!*,*', '% done', 'text'],
        ['watcher_id', '=,!', 'Watcher', , 'list', ':8080/api/user/list']
    ]

    red_issue_filter_field_select = function() {
        var val = $(this).val(),
            $el = $(this);
        switch (val) {
            case '!*':
            case '*':
            case 't':
            case 'w':
                $el.parent().next().children().hide();

                break;
            default:
                $el.parent().next().children().show();
                break;
        }
    }

    red_issue_add_filter_to_form = function(id) {
        var record = red_filter_form.filter(function(i) {
            return i[0] == id
        })[0]

        if (record[3] == 'text') {

            window['red_issue_' + id + '_list'] = red_issue_operator.filter(function(i) {
                return (record[1].indexOf(i[0])) > -1;
            });

            $('.red-issue-filter .red-card-content table').append('<tr><td><j-selectfield class="red-filter-field" id="red-issue-' + id + '" src-array="red_issue_' + id + '_list">' + record[2] + '</j-selectfield></td><td><j-textfield id="red-issue-' + id + '-value"></j-textfield></td></tr>');

        }

        if (record[3] == 'list') {

            window['red_issue_' + id + '_list'] = red_issue_operator.filter(function(i) {
                return (record[1].indexOf(i[0])) > -1;
            });

            $('.red-issue-filter .red-card-content table').append('<tr><td><j-selectfield class="red-filter-field" id="red-issue-' + id + '"" src-array="red_issue_' + id + '_list">' + record[2] + '</j-selectfield></td><td><j-selectfield id="red-issue-' + id + '-value"></j-selectfield></td></tr>');

            if (record[4][0] == '[') {
                window['red_issue_' + id + '_value_list'] = record[4].split(',');
                $("#red-issue-" + id + "-value").attr('src-array', 'red_issue_' + id + '_value_list')
            } else {

                $.ajax({
                    url: window.location.origin + record[4],
                    type: 'GET',
                    dataType: 'jsonp',
                    success: function(data) {
                        var list = []

                        for (var i = 0; i < data.length; i++) {
                            list.push([data[i].id, data[i].name])
                        }

                        window['red_issue_' + id + '_value_list'] = list;
                        $("#red-issue-" + id + "-value").attr('src-array', 'red_issue_' + id + '_value_list')
                    },
                    error: function() {},
                    beforeSend: function setHeader(xhr) {
                        xhr.setRequestHeader('x-access-token', Cookies.get('token'));
                    }
                })

            }

        }

        $("#red-issue-" + id).on('select', function() {
            red_issue_filter_field_select.call(this)
        })
    }

    var red_issue_search_cf = false;

    function red_issue_form_to_url() {
        var options = {
            where: {
                main: {

                }
            },
            operator: {

            }
        }
        $('.red-filter-field').each(function(i, val) {
            red_issue_search_cf = false;
            var $el = $(val),
                $elVal = $('#' + val.id + '-value:visible');
            if (val.id.match(/^cf_/) != null) {
                red_issue_search_cf = true
                red_issue_cf_options = {
                    where: {
                        main: {
                            customized_type: 'Issue'
                        }
                    },
                    groupby: '["customized_id"]',
                    operator: param.operator || {},
                    search: 0
                }
                if ($elVal.length > 0) {
                    red_issue_cf_options.where.main[val.id.split('red-issue-')[1]] = $elVal.val();
                    red_issue_cf_options.operator[val.id.split('red-issue-')[1]] = $el.val();
                } else {
                    switch ($el.val()) {
                        case '!*':
                        case '*':
                        case '~':
                        case '!~':
                        case '!r':
                        case '=r':
                            red_issue_cf_options.operator[val.id.split('red-issue-')[1]] = $elVal.val();
                            break;
                    }
                }
            } else {
                if ($elVal.length > 0) {
                    options.where.main[val.id.split('red-issue-')[1]] = $elVal.val();
                    options.operator[val.id.split('red-issue-')[1]] = $el.val();
                } else {
                    switch ($el.val()) {
                        case '!*':
                        case '*':
                        case '~':
                        case '!~':
                        case '!r':
                        case '=r':
                            options.operator[val.id.split('red-issue-')[1]] = $elVal.val();
                            break;
                    }
                }
            }
        })
        return options;
    }

</script>
<div class="red-issue-filter red-card">
    <j-toolbar><span>Filter</span></j-toolbar>
    <div class="red-card-content">
        <table class="red-layout-table">
            <tr>
                <td>
                    <j-selectfield id="red-issue-status_id" src-array="red_status_list">Status</j-selectfield>
                </td>
                <td>
                    <j-selectfield id="red-issue-status_id-value" style="display: none;" src-fn="red_status_list_value">Status</j-selectfield>
                </td>
                <td rowspan="100">
                    <j-selectfield id="red-add-filter" src-array="red_filter_list">Add filter</j-selectfield>
                </td>
            </tr>
            <!--tr>
                <td>
                    <j-selectfield id="red-issue-project_id" src-array="red_status_list">Status</j-selectfield>
                </td>
                <td>
                    <j-textfield id="red-issue-project_id-value" style="display: none;" src-fn="red_status_list_value">Status</j-textfield>
                </td>
            </tr-->
        </table>
        <j-button id="red-issue-filter-apply">Apply</j-button>
    </div>
</div>
<br/>
<script>
    $('#red-issue-filter-apply').on('click', function() {
        red_issue_where = red_issue_form_to_url();
        if (red_issue_search_cf == true) {
            red_get_issue_cf(function() {
                $('#red-tbl-issue')[0].generateData();
            })
        } else {
            $('#red-tbl-issue')[0].generateData();
        }
    })

    $('#red-add-filter').on('select', function() {
        red_issue_add_filter_to_form($(this).val())
    })

    $('#red-issue-status_id').on('select', function() {
        var value = $(this).val();
        switch (value) {
            case 'o':
                red_issue_filter.where.main['$status.is_closed$'] = 0;
                delete red_issue_filter.where.main.status_id;
                $('#red-issue-status_id-value').hide()
                break;
            case '=':
                red_issue_filter.where.main.status_id = $('#red-issue-status_id-value').val();
                delete red_issue_filter.where.main['$status.is_closed$'];
                $('#red-issue-status_id-value').show()
                break;
            case '!':
                red_issue_filter.where.main.status_id = $('#red-issue-status_id-value').val();
                delete red_issue_filter.where.main['$status.is_closed$'];
                $('#red-issue-status-value').show()
                break;
            case 'c':
                red_issue_filter.where.main['$status.is_closed$'] = 1;
                delete red_issue_filter.where.main.status_id;
                $('#red-issue-status_id-value').hide()
                break;
            case '*':
                delete red_issue_filter.where.main['$status.is_closed$'];
                delete red_issue_filter.where.main.status_id;
                $('#red-issue-status_id-value').hide()
                break;
        }
    })
    /*.on('itemsafterdraw', function() {
            $('#red-issue-status_id').val(red_status_list[0][0])
        })*/

    $('#red-issue-status_id').val(red_status_list[0][0])

    function red_issue_url_to_form_data() {
        var data = red_issue_query_generator();

        $.each(data.operator, function(i, val) {
            $('#red-issue-' + i).val(val)
        })
        delete data.operator;

        $.each(data.where.main, function(i, val) {
            $('#red-issue-' + i + '-value').val(val)
        })
        delete data.where.main;
    }

    red_issue_url_to_form_data();

    red_issue_cf_filter()

</script>
