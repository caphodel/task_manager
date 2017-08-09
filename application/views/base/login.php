<j-panel id="red-form-login" style="display: flex; align-items: center; height: 100%; width: 100%;">
	<j-spacer></j-spacer>
	<j-card class="j-ui" style="padding-bottom: 52px;">
		<div class="j-header">
			Login
		</div>
		<j-textfield style="display: flex;" class="j-ui" id="username" type="text">Username</j-textfield>
		<j-textfield style="display: flex;" class="j-ui" id="password" type="password">Password</j-textfield>

		<div style="display: flex;position:absolute;bottom:0;width:100%;padding: 6px 20px; height: 52px;">
			<j-button id="red-btn-login" style="margin-left: auto;border:1px solid #E2E2E2;padding: 12px 10px;border-radius: 3px;font-weight: 600;">Login</j-button>
		</div>
	</j-card>
	<j-spacer></j-spacer>
</div>
<script>
	$("#red-btn-login").click(function() {
		$.post(window.location.origin + ":8080/api/auth", {
			username: $("#username").val(),
			password: $("#password").val()
		}, function(data, textStatus) {
			if (data.success) {
				red_token = data.token;
				$('#red-form-login').remove();
				$('#red-sign-in').text("Logged In")
			} else {
				alert(data.message)
			}
		}, "json");
	})

</script>
