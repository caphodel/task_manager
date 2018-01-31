<script>
	var red_issue_update_fields = [];
	function issue_new_custom_fields() {
		$.ajax({
			url: window.location.origin + ':8080/api/custom_field/list',
			type: 'GET',
			dataType: 'jsonp',
			data: {
				where: {
					main: {
						tracker_id: <?php echo $identifier;?>
					}
				}
			},
			success: function(data) {
				$.each(data, function(i, val){
					var data = {
						custom_field: {
							field_format: val.
						}
					}
					red_issue_update_fields.push(data)
				})

			},
			error: function() {},
			beforeSend: function setHeader(xhr) {
				xhr.setRequestHeader('x-access-token', Cookies.get('token'));
			}
		})
	}

</script>
