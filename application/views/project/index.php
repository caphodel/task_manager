<!--j-card class="j-ui" style="width: 300px;padding-bottom: 52px;">
	<div class="j-header">
		Your Projects
	</div>
	<table class="j-list j-ui">
		<thead>
			<tr>
				<th data-label="Project No">Project No</th>
				<th data-label="Description">Description</th>
				<th data-label="Description">Task</th>
			</tr>
		</thead>
		<tbody>
			<tr style="position:relative">
				<td data-label="" data-badge="9/25">PRJ-01<div class="j-line-bar" style="background: rgb(222, 222, 222) none repeat scroll 0% 0%; position: absolute; display: inline-block; height: 3px; bottom: 3px; width: 95%; left: 2.5%;"></div></td>
				<td data-label="">Project no 1 description</td>
				<td data-label="" data-hidden>7/10</td>
			</tr>
			<tr>
				<td data-label="" data-badge="9/25">PRJ-02</td>
				<td data-label="">Project no 2 description</td>
				<td data-label="" data-hidden>7/10</td>
			</tr>
		</tbody>
	</table>
	<div style="display: flex;position:absolute;bottom:0;width:100%;padding: 6px 20px; height: 52px;">
		<j-button style="margin-left: auto;border:1px solid #E2E2E2;padding: 12px 10px;border-radius: 3px;font-weight: 600;">View All Projects</j-button>
	</div>
</j-card-->

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
            dataType: 'json',
            success: function(data) {
                $el[0].total = data.total
            },
            error: function() {},
            beforeSend: function setHeader(xhr) {
                xhr.setRequestHeader('x-access-token', Cookies.get('token'));
            }
        });
        $.ajax({
            url: window.location.origin + ':8080/api/project/' + $el[0].limit + '/' + $el[0].offset,
            type: 'GET',
            dataType: 'json',
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

<j-panel>
    <div class="j-header">
        Project
    </div>
    <j-table id="red-tbl-project" src-fn="project">
        [ ["Project No", "Description", "Task"] ]
    </j-table>
</j-panel>
