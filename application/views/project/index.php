<div class="red-util-container" style="display: flex;">
    <j-spacer></j-spacer><j-button red-permission="login"><i class="fa fa-plus"></i> New Project</j-button>
</div>

<script>
    function red_project() {
        var $el = $('#red-tbl-project');
        $el[0].param.sEcho++
        var echo = $el[0].param.sEcho;

        $.ajax({
            url: window.location.origin + ':8080/api/project/total',
            type: 'GET',
            dataType: 'jsonp',
            sEcho: echo,
            success: function(data) {
                if(this.sEcho == $el[0].param.sEcho)
                    $el[0].param.iTotalRecords = data.total
            },
            error: function() {},
            beforeSend: function setHeader(xhr) {
                xhr.setRequestHeader('x-access-token', Cookies.get('token'));
            }
        });
        $.ajax({
            url: window.location.origin + ':8080/api/project/list/' + $el[0].param.iDisplayLength + '/' + $el[0].param.iDisplayStart,
            type: 'GET',
            dataType: 'jsonp',
            sEcho: echo,
            success: function(data) {
                if(this.sEcho == $el[0].param.sEcho)
                    $('#red-tbl-project')[0].generateData(data)
            },
            error: function() {},
            beforeSend: function setHeader(xhr) {
                xhr.setRequestHeader('x-access-token', Cookies.get('token'));
            }
        });
    }

    function red_project_custom(record){
        record.id = '<a href="<?php echo base_url() ?>'+"projects/"+record.identifier+'">'+record.name+'</a>'
        record.name = '<a href="<?php echo base_url() ?>'+"projects/"+record.identifier+'">'+record.description+'</a>'
        return record;
    }

</script>

<div class="red-content-container">
    <j-panel>
        <div class="j-header">
            Project
        </div>
        <j-table id="red-tbl-project" src-fn="red_project" paging="true" custom="red_project_custom">
            [ ["Project No", "Description"] ]
        </j-table>
    </j-panel>
    <script>
        $('#red-tbl-project')[0].setup = function() {
            /*$('#red-tbl-project')[0].onItemDoubleClick(function(record) {
                redLoad("project/"+record.identifier+"?from_base", "#red-content")
            })*/
        }

    </script>
</div>
