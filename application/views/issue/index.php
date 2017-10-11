<div class="red-util-container" style="display: flex;">
    <j-spacer></j-spacer>
    <j-button red-permission="login"><i class="fa fa-plus"></i> New Task</j-button>
</div>

<script>
    function red_issue_query_generator(cf) {
        var search = location.search.substring(1);
        var param = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
        for (var i in param) {
            if (param.hasOwnProperty(i)) {
                data = i.match(/(\[.*?\])/g)
                if (data != null) {
                    param.operator = {}
                    param.operator[data[0].replace(/\[|\]/g, '')] = param[i]
                    delete param[i]
                }
            }
        }

        var where = {
                where: {
                    main: {

                    }
                },
                operator: param.operator || {}
            },
            custom_values = {
                where: {
                    main: {
                        customized_type: 'Issue'
                    }
                },
                groupby: '["customized_id"]',
                operator: param.operator || {},
                search: 0
            }

        if(param.status_id==undefined)
            where.where.main = {

            }

        cf = cf | false;

        $.each(param, function(i, val) {
            if (['tracker_id', 'status_id', 'priority_id', 'assigned_to_id'].indexOf(i) > -1) {
                where['where']['main'][i] = JSON.parse(val)
            } else if (i.match('cf_') != null) {
                if (custom_values.where['main']['custom_field_id'] == undefined) {
                    custom_values.where['main']['custom_field_id'] = []
                    custom_values.where['main']['value'] = []
                }
                custom_values.where['main']['custom_field_id'].push(i.split('cf_')[1])
                custom_values.where['main']['value'].push(val);
                custom_values.search++;
            }
        })

        if (cf) {
            return custom_values
        } else
            return where;

    }

    function red_get_issue_cf() {
        var options = red_issue_query_generator(true)
        if (options.search > 0) {
            options.search = '[*count=' + options.search + '].customized_id';
            options.saveToGLobal = jui2.random(20, '#aA')
            $.ajax({
                url: window.location.origin + ':8080/api/custom_value/list',
                type: 'GET',
                dataType: 'jsonp',
                data: options,
                success: function(data) {
                    red_issue({
                        where: {
                            main: {

                            }
                        },
                        fromGlobal: {
                            id: options.saveToGLobal
                        }
                    })
                },
                error: function() {},
                beforeSend: function setHeader(xhr) {
                    xhr.setRequestHeader('x-access-token', Cookies.get('token'));
                }
            })
        } else {
            red_issue()
        }
    }

    function red_issue(where) {
        where = where || {
            where: {}
        }
        var $el = $('#red-tbl-issue');
        $el[0].param.sEcho++;
        var echo = $el[0].param.sEcho;

        var options = {
            where: {
                main: {
                    <?php if($identifier!=''){ ?>
                    "$project.identifier$": "<?php echo $identifier;?>"
                    <?php } ?>
                }
            },
            fromGlobal: {}
        }

        dataOptions = $.extend(true, {}, options, red_issue_query_generator(), where, red_issue_filter)

        $.ajax({
            url: window.location.origin + ':8080/api/issue/total',
            type: 'GET',
            dataType: 'jsonp',
            sEcho: echo,
            data: dataOptions,
            success: function(data) {
                if (this.sEcho == $el[0].param.sEcho) {
                    $el[0].param.iTotalRecords = data[0].total

                    $.ajax({
                        url: window.location.origin + ':8080/api/issue/list/' + $el[0].param.iDisplayLength + '/' + $el[0].param.iDisplayStart,
                        type: 'GET',
                        dataType: 'jsonp',
                        sEcho: echo,
                        data: dataOptions,
                        success: function(data) {
                            if (this.sEcho == $el[0].param.sEcho)
                                $('#red-tbl-issue')[0].generateData(data)
                        },
                        error: function() {},
                        beforeSend: function setHeader(xhr) {
                            xhr.setRequestHeader('x-access-token', Cookies.get('token'));
                        }
                    });
                }
            },
            error: function() {},
            beforeSend: function setHeader(xhr) {
                xhr.setRequestHeader('x-access-token', Cookies.get('token'));
            }
        });
    }

    function red_issue_custom(record) {
        data = ['<a href="<?php echo base_url() ?>issues/' + record.id + '">' + record.id + '</a>', record.tracker.name, record.status.name, record.priority.name, '<a href="<?php echo base_url() ?>issues/' + record.id + '">' + record.subject + '</a>', (record.assigned_to != null ? ('<a href="<?php echo base_url() ?>users/' + record.assigned_to.id + '">' + record.assigned_to.name + '</a>') : ''), record.updated_on.replace('T', ' ').replace('.000Z', '')];
        return data;
    }

</script>

<div class="red-content-container">

    <?php $this->view('issue/filter');?>

    <j-panel>
        <div class="j-header">
            Issues
        </div>
        <j-table id="red-tbl-issue" src-fn="red_get_issue_cf" paging="true" custom="red_issue_custom">
            [ ["#", "Tracker", "Status", "Priority", "Subject", "Assigned To", "Updated"] ]
        </j-table>
    </j-panel>
</div>
