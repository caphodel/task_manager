<div class="red-util-container" style="display: flex;">
	<j-spacer></j-spacer>
	<j-button red-permission="login"><i class="fa fa-plus"></i> New Project</j-button>
</div>

<script>
	$('#red-btn-task').attr('href', '<?php echo base_url() ?>issues');

	function red_project() {
		var $el = $('#red-tbl-project');
		$el[0].param.sEcho++;
		var echo = $el[0].param.sEcho;

		$.ajax({
			url: window.location.origin + ':8080/api/project/total',
			type: 'GET',
			dataType: 'jsonp',
			sEcho: echo,
			success: function(data) {
				if (this.sEcho == $el[0].param.sEcho) {
					$el[0].param.iTotalRecords = data.total
					$.ajax({
						url: window.location.origin + ':8080/api/project/list/' + $el[0].param.iDisplayLength + '/' + $el[0].param.iDisplayStart,
						type: 'GET',
						dataType: 'jsonp',
						sEcho: echo,
						success: function(data) {
							if (this.sEcho == $el[0].param.sEcho)
								$('#red-tbl-project')[0].generateData(data)
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
	/*

	    function red_project2() {
	        var $el = $('#red-tbl-project2');
	        $el[0].param.sEcho++;
	        var echo = $el[0].param.sEcho;

	        $.ajax({
	            url: window.location.origin + ':8080/api/project/total',
	            type: 'GET',
	            dataType: 'jsonp',
	            sEcho: echo,
	            success: function(data) {
	                if (this.sEcho == $el[0].param.sEcho) {
	                    $el[0].param.iTotalRecords = data.total
	                    $.ajax({
	                        url: window.location.origin + ':8080/api/project/list/' + $el[0].param.iDisplayLength + '/' + $el[0].param.iDisplayStart,
	                        type: 'GET',
	                        dataType: 'jsonp',
	                        sEcho: echo,
	                        success: function(data) {
	                            if (this.sEcho == $el[0].param.sEcho)
	                                $('#red-tbl-project2')[0].generateData(data)
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
	    }*/

	function red_project_custom(record) {
		record.id = '<a href="<?php echo base_url() ?>' + "projects/" + record.identifier + '">' + record.name + '</a>'
		record.name = '<a href="<?php echo base_url() ?>' + "projects/" + record.identifier + '">' + record.description + '</a>'
		return record;
	}

</script>

<div class="red-content-container">
	<div class="red-card">
		<j-toolbar><span>Project</span></j-toolbar>
		<j-table2 id="red-tbl-project" src-fn="red_project" paging="true" custom="red_project_custom" style="padding: 0;">
			[ ["Project No", "Description"] ]
		</j-table2>
		<!--j-table2 id="red-tbl-project2" src-fn="red_project2" paging="true" custom="red_project_custom">
            [ ["Project No", "Description"] ]
        </j-table2-->
	</div>
	<script>
		$('#red-tbl-project')[0].setup = function() {
			/*$('#red-tbl-project')[0].onItemDoubleClick(function(record) {
			    redLoad("project/"+record.identifier+"?from_base", "#red-content")
			})*/
		}

	</script>
</div>
