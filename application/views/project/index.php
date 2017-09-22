<div class="red-util-container" style="display: flex;">
    <j-spacer></j-spacer><j-button><i class="fa fa-plus"></i> New Project</j-button>
</div>

<script>
    function project() {
        var $el = $('#red-tbl-project');
        if ($el[0].limit == undefined)
            $el[0].limit = 10
        if ($el[0].offset == undefined)
            $el[0].offset = 0
        $.ajax({
            url: window.location.origin + ':8080/api/project/total',
            type: 'GET',
            dataType: 'jsonp',
            success: function(data) {
                $el[0].total = data.total
            },
            error: function() {},
            beforeSend: function setHeader(xhr) {
                xhr.setRequestHeader('x-access-token', Cookies.get('token'));
            }
        });
        $.ajax({
            url: window.location.origin + ':8080/api/project/list/' + $el[0].limit + '/' + $el[0].offset,
            type: 'GET',
            dataType: 'jsonp',
            success: function(data) {
                $('#red-tbl-project')[0].generateData(data)
            },
            error: function() {},
            beforeSend: function setHeader(xhr) {
                xhr.setRequestHeader('x-access-token', Cookies.get('token'));
            }
        });
    }

</script>

<div class="red-content-container">
    <j-panel>
        <div class="j-header">
            Project
        </div>
        <j-table id="red-tbl-project" src-fn="project">
            [ ["Project No", "Description", "Task"] ]
        </j-table>
    </j-panel>
    <script>
        $('#red-tbl-project')[0].setup = function() {
            $('#red-tbl-project')[0].onItemDoubleClick(function(record) {
            })
        }

    </script>
</div>
