<div id="red-form-login" style="display: flex; align-items: center; height: 100%; width: 100%;">
	<j-spacer></j-spacer>
	<j-panel class="j-ui" style="width: auto">
		<div class="j-header">
			Login
		</div>
		<j-textfield style="display: flex;" class="j-ui" id="user" type="text">Username</j-textfield>
		<j-textfield style="display: flex;" class="j-ui" id="password" type="password">Password</j-textfield>

		<j-toolbar>
			<j-spacer></j-spacer><j-button id="red-btn-login">Login</j-button>
		</j-toolbar>
	</j-panel>
	<j-spacer></j-spacer>
</div>
<script>
	$("#red-btn-login").click(function() {
		$.post(window.location.origin + ":8080/api/auth", {
			username: $("#user").val(),
			password: $("#password").val()
		}, function(data, textStatus) {
			if (data.success) {
                Cookies.set('token', data.token)
				$('#red-form-login').remove();
				$('#red-sign-in').text("Logged In")
                if(red_previous_url!=""){
                    /*history.pushState(null, null, $(this).attr('href'));
                    redLoad(red_previous_url, "#red-content")*/
                    //window.location =
                    window.history.back();
                }
			} else {
				alert(data.message)
			}
		}, "json");
	})

</script>
