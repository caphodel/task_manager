<style>
	#red-issue-tools.red-fixed {
		padding: 4px 5px;
		background: #FAFBFC;
		border: 1px solid #e1e4e8;
		border-top-width: 0;
		border-radius: 0 0 3px 3px;
		margin-left: -5px;
		margin-top: 0px;
	}

</style>
<div class="red-util-container">
	<h1>
		<a class="red-issue-project-name"></a>
	</h1>
	<j-toolbar>
		<h1 class="red-issue-tracker-name">
			<?php echo '#'.$identifier; ?>
		</h1>
		<j-spacer></j-spacer>
		<div id="red-issue-tools" class="red-sticky">
			<j-button red-permission="add_issue_notes|admin" id="red-issue-update"><i class="fa fa-pencil"></i> Update</j-button>
			<j-button red-permission="log_time|admin" id="red-issue-update"><i class="fa fa-clock-o"></i> Log Time</j-button>
			<j-button red-permission="login" id="red-issue-watch"><i class="fa fa-eye"></i> Watch</j-button>
		</div>
	</j-toolbar>
</div>
<div class="red-content-container">
	<table class="red-layout-table">
		<tr>
			<td style="width: 75%">
				<div class="red-card" style="margin-top: 0px;">
					<j-toolbar>
						<h5 class="red-issue-subject" style="width: 100%;">
						</h5>
					</j-toolbar>
					<p id="red-issue-author">
						Added by <a></a>
					</p>
					<div class="red-issue-detail red-column-detail"></div>
				</div>
				<div class="red-issue-description red-card">
					<j-toolbar><span>Description</span></j-toolbar>
					<div class="red-card-content"></div>
				</div>
				<div class="red-issue-subtask red-card">
					<j-toolbar><span>Subtasks</span>
						<j-spacer></j-spacer>
						<j-button>Add</j-button>
					</j-toolbar>
					<div class="red-card-content">
						<table class="red-task" style="border-collapse: collapse; border: 0px; width: 100%; text-align: center;">
						</table>
					</div>
				</div>
				<div class="red-issue-related red-card">
					<j-toolbar><span>Related tasks</span>
						<j-spacer></j-spacer>
						<j-button id="red-issue-btn-add-relation">Add</j-button>
					</j-toolbar>
					<div class="red-card-content">
						<table class="red-task" style="border-collapse: collapse; border: 0px; width: 100%; text-align: center;">
						</table>
					</div>
				</div>
				<j-timeline id="red_issue_history">
				</j-timeline>
				<div id="red-issue-update-container"></div>
			</td>
			<td style="min-width: 200px;">
				<div class="red-info-container" style="/*position: absolute; top: 180px; right: 20px; min-width: 200px; max-width: 400px;*/">
					<div class="red-issue-watchers" red-permission="view_watcher|admin">
						<j-toolbar><span>Watchers</span>
							<j-spacer></j-spacer>
							<j-button>Add</j-button>
						</j-toolbar>
					</div>
				</div>
			</td>
		</tr>
	</table>
</div>

<script id="red-issue-tmpl-modal-relation" type="text">
	<j-toolbar style="background: #fafbfc">
		Add Related Task
	</j-toolbar>
	<j-textfield id="red-issue-relation-task">Task #</j-textfield><br/>
	<j-toolbar style="background: #fff; border: 0px;">
		<j-spacer></j-spacer><j-button onclick="red_issue_relation()">Add</j-button><j-button onclick="red_issue_relation_close()">Close</j-button>
	</j-toolbar>
</script>

<script>
	var red_issue_update_fields = [],
		red_issue_fields = []

	function red_issue_relation(){
		var value = $('#red-issue-relation-task').val();
		$('#red-issue-modal-relation').remove()
	}

	function red_issue_relation_close(){
		$('#red-issue-modal-relation').remove()
	}

	$('#red-issue-btn-add-relation').click(function() {
		var modal = jui2.modal({
			el: $('#red-issue-tmpl-modal-relation').html(),
			id: 'red-issue-modal-relation',
			height: '145px'
		})
		modal.children().addClass('red-card')
	})

	$.ajax({
		url: window.location.origin + ':8080/api/issue/<?php echo $identifier;?>',
		type: 'GET',
		dataType: 'jsonp',
		success: function(data) {
			//data = data[0]
			if (data.project == null) {
				$("#red-content").html('<div class="red-content-container">You are not authorized to access this page or the project has been deleted.</div>')
			} else if (data != null) {

				$('.red-issue-tracker-name').prepend(data.tracker.name);
				$('.red-issue-project-name').prepend(data.project.name).attr('href', '<?php echo base_url() ?>projects/' + data.project.identifier);
				$('#red-issue-author a').prepend(data.author.name).attr('href', '<?php echo base_url() ?>users/' + data.author.id).parent().append(' ' + moment(data.created_on).fromNow() + '. Updated ' + moment(data.updated_on).fromNow());
				$('.red-issue-subject').prepend(data.subject);

				$('.red-issue-description .red-card-content').append(stringFormatter(data.description.replace(/\n/g, "<br />")))

				/*issue detail*/

				var issue_detail = $('.red-issue-detail');

				red_issue_fields['status_id'] = data.status.id
				red_issue_fields['start_date'] = data.start_date
				red_issue_fields['priority_id'] = data.priority.id
				red_issue_fields['due_date'] = data.due_date
				red_issue_fields['assigned_to_id'] = data.assigned_to.id
				red_issue_fields['done_ratio'] = data.done_ratio
				red_issue_fields['category_id'] = data.category_id
				red_issue_fields['fixed_version_id'] = data.fixed_version_id
				red_issue_fields['estimated_hours'] = data.estimated_hours
				red_issue_fields['tracker_id'] = data.tracker_id
				red_issue_fields['subject'] = data.subject
				red_issue_fields['parent_id'] = data.parent_id
				red_issue_fields['description'] = data.description

				issue_detail.append('<div class="red-column-detail" data-value="' + data.status.id + '"><div><b>Status:</b></div><div>' + data.status.name + '</div></div>')
				issue_detail.append('<div class="red-column-detail" data-value="' + data.start_date + '"><div><b>Start:</b></div><div>' + data.start_date + '</div></div>')
				issue_detail.append('<div class="red-column-detail" data-value="' + data.priority.id + '"><div><b>Priority:</b></div><div>' + data.priority.name + '</div></div>')
				issue_detail.append('<div class="red-column-detail" data-value="' + data.due_date + '"><div><b>Due date:</b></div><div>' + data.due_date + '</div></div>')
				issue_detail.append('<div class="red-column-detail" data-value="' + data.assigned_to.id + '"><div><b>Assigned to:</b></div><div>' + red_string_generator([data.assigned_to.id, data.assigned_to.name], 'users') + '</div></div>')
				issue_detail.append('<div class="red-column-detail" data-value="' + data.done_ratio + '"><div><b>% Done:</b></div><div><div class="red-progress-bar" title="' + data.done_ratio + '%"><div style="width: ' + data.done_ratio + '%"></div></div> <div style="display: inline-block;vertical-align: top;">' + data.done_ratio + '%</div></div></div>')
				issue_detail.append('<div class="red-column-detail" data-value="' + data.category_id + '"><div><b>Category:</b></div><div>' + (data.category_id || '-') + '</div></div>')
				var spent_time = 0.0;
				if (data.time_entries == null) {
					data.time_entries = []
					spent_time = '-';
				}
				for (var k = 0; k < data.time_entries.length; k++) {
					spent_time += data.time_entries[k].hours
				}
				issue_detail.append('<div class="red-column-detail"><div><b>Spent time:</b></div><div>' + spent_time + '</div></div>')
				issue_detail.append('<div class="red-column-detail" data-value="' + data.fixed_version_id + '"><div><b>Target version:</b></div><div>' + (data.fixed_version_id || '-') + '</div></div>')
				issue_detail.append('<div class="red-column-detail" data-value="' + data.estimated_hours + '"><div><b>Estimated time:</b></div><div>' + (data.estimated_hours || '-') + '</div></div>')

				$.each(data.custom_values, function(i, val) {
					issue_detail.append('<div class="red-column-detail"><div><b>' + val.custom_field.name + ':</b></div><div>' + val.value + '</div></div>')
					red_issue_update_fields.push(val)
				})

				red_project_identifier = data.project.identifier;
				$('#red-btn-task').attr('href', '<?php echo base_url() ?>projects/' + red_project_identifier + '/issues');

				redProjectPermissionChecker(function(permission) {

					if (permission.match(/view_watcher|admin/) != null) {
						red_get_watcher(permission);
					}

					if (permission.match(/view_issues|admin/) != null) {
						red_get_issue_journal(permission);
						red_get_issue_subtask();
						red_get_issue_relation();
					}
				});
			} else {
				redLoad(redDomain + 'base/not_found', "#red-content")
			}
		},
		error: function() {},
		beforeSend: function setHeader(xhr) {
			xhr.setRequestHeader('x-access-token', Cookies.get('token'));
		}
	});

	function red_get_watcher(permission) {
		$.ajax({
			url: window.location.origin + ':8080/api/watcher/list',
			type: 'GET',
			data: {
				where: {
					main: {
						watchable_id: <?php echo $identifier;?>,
						watchable_type: 'Issue'
					}
				}
			},
			dataType: 'jsonp',
			success: function(data) {
				$('.red-issue-watchers h1').append(" (" + data.length + ")");
				$.each(data, function(i, val) {
					$('.red-issue-watchers').append('<j-tag class="red-issue-watcher" data-id="' + val.id + '">' + val.user.name + '</j-tag><br/>')
				})

				var watched = data.find(function(val) {
					return val.user_id == jwt_decode(Cookies.get('token')).id
				})

				if (watched != undefined) {
					if (Cookies.get('token') != undefined) {
						$('#red-issue-watch').html('<i class="fa fa-eye-slash"></i> Unwatch').attr('data-id', watched.id)
					}
				}

				$('.red-issue-watcher').on('close', function() {
					$(this).next('br').remove()
					console.log('delete watcher ' + $(this).attr('data-id') + ' for issue #<?php echo $identifier;?>')
				})
			},
			error: function() {},
			beforeSend: function setHeader(xhr) {
				xhr.setRequestHeader('x-access-token', Cookies.get('token'));
			}
		});
	}

	function red_get_issue_subtask() {
		$.ajax({
			url: window.location.origin + ':8080/api/issue/list',
			type: 'GET',
			data: {
				where: {
					main: {
						parent_id: <?php echo $identifier;?>
					}
				}
			},
			dataType: 'jsonp',
			success: function(data) {
				var $el = $('.red-issue-subtask > .red-card-content > table')
				for (var i = 0; i < data.length; i++) {
					var val = data[i]
					$el.append('<tr><td style="text-align: left;">' + red_string_generator([val.id, val.tracker.name + ' #' + val.id, val.status.is_closed], 'issue') + stringFormatter(': ' + val.subject + '</td><td>' + val.status.name + '</td><td>' + red_string_generator([val.assigned_to.id, val.assigned_to.name], 'users')) + '</td><td><div class="red-progress-bar" title="' + val.done_ratio + '%"><div style="width: ' + val.done_ratio + '%"></div></div></td></tr>')
				}

			},
			error: function() {},
			beforeSend: function setHeader(xhr) {
				xhr.setRequestHeader('x-access-token', Cookies.get('token'));
			}
		});
	}

	function red_get_issue_relation() {
		$.ajax({
			url: window.location.origin + ':8080/api/relation/<?php echo $identifier;?>',
			type: 'GET',
			dataType: 'jsonp',
			success: function(data) {
				var $el = $('.red-issue-related > .red-card-content > table')
				for (var i = 0; i < data.length; i++) {
					var val = data[i].issue
					$el.append('<tr><td style="text-align: left;">Related to ' + red_string_generator([val.id, val.tracker.name + ' #' + val.id, val.status.is_closed], 'issue') + stringFormatter(': ' + val.subject + '</td><td>' + val.status.name) + '</td><td>' + val.created_on.split('T')[0] + '</td><td>' + val.due_date + '</td></tr>')
				}

			},
			error: function() {},
			beforeSend: function setHeader(xhr) {
				xhr.setRequestHeader('x-access-token', Cookies.get('token'));
			}
		});
	}

	function red_get_issue_journal(permission) {
		$.ajax({
			url: window.location.origin + ':8080/api/journal/list',
			type: 'GET',
			data: {
				where: {
					main: {
						journalized_id: <?php echo $identifier;?>,
						journalized_type: 'Issue'
					}
				}
			},
			dataType: 'jsonp',
			success: function(data) {
				$history = $('#red_issue_history')
				$.each(data, function(i, val) {
					var html = "";
					html += "<div>Updated by " + red_string_generator([val.user.id, val.user.fullname], 'users') + " " + moment(val.created_on).fromNow() + "<div class='red-issue-journal-detail'></div></div>"
					$el = $(html)
					$.each(val.journal_details, function(i, val) {
						var detail;
						if (val.property == 'attr') {
							detail = val.prop_key
						} else {
							detail = val.custom_field.name
						}
						if (val.old_value == "" || val.old_value == null)
							$el.children('.red-issue-journal-detail').append('<div><b>' + detail + '</b> set to ' + val.value + '</div>')
						else
							$el.children('.red-issue-journal-detail').append('<div><b>' + detail + '</b> changed from ' + val.old_value + ' to ' + val.value + '</div>')
					})
					$el.append('<div class="red-issue-journal-note">' + stringFormatter(val.notes.replace(/\n/g, "<br />")) + '</div>')
					$history[0].append($el)
				})
				redJournalFormatter();
			},
			error: function() {},
			beforeSend: function setHeader(xhr) {
				xhr.setRequestHeader('x-access-token', Cookies.get('token'));
			}
		});
	}

	$('#red-issue-watch').click(function() {
		if ($(this).children('i').hasClass('fa-eye-slash')) {
			console.log('delete watcher ' + jwt_decode(Cookies.get('token')).id + ' for issue #<?php echo $identifier;?>')
		} else {
			console.log('watch ' + jwt_decode(Cookies.get('token')).id + ' for issue #<?php echo $identifier;?>')
		}
	})

	$('#red-issue-update').click(function() {
		redLoad(redDomain + 'issues/update/<?php echo $identifier;?>', '#red-issue-update-container');
	})

</script>
