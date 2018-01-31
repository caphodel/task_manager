<script>
	function red_widget_latest_project() {
		var $el = $('#red-widget-latest-project');
		$el.find('thead').hide()
		$el[0].param.sEcho++;
		var echo = $el[0].param.sEcho;
		$.ajax({
			url: window.location.origin + ':8080/api/project/list/10/0',
			type: 'GET',
			dataType: 'jsonp',
			sEcho: echo,
			data: {
				orderby: '[["id", "DESC"]]'
			},
			success: function(data) {
				if (this.sEcho == $el[0].param.sEcho){
					$('#red-widget-latest-project')[0].generateData(data)
				}
			},
			error: function() {},
			beforeSend: function setHeader(xhr) {
				xhr.setRequestHeader('x-access-token', Cookies.get('token'));
			}
		});
	}

	function red_widget_latest_project_custom(record) {
		return ['<a href="<?php echo base_url() ?>' + "projects/" + record.identifier + '">' + record.name + '</a> (' + moment(record.created_on).format('DD-MM-YYYY HH:mm:ss') + ')<br/>' + record.description];
	}

</script>

<div class="red-card col-50">
	<j-toolbar>Latest Project</j-toolbar>
	<j-table2 id="red-widget-latest-project" custom="red_widget_latest_project_custom" src-fn="red_widget_latest_project" style="padding: 0px;">
		[["#"]]
	</j-table2>
</div>
<div class="red-card col-50">
	<j-toolbar>Latest Project</j-toolbar>
</div>
<div class="red-card col-50">
	<j-toolbar>Latest Project</j-toolbar>
</div>
