<html>

<head>
	<link href="assets/css/main.css" rel="stylesheet" type="text/css" />
	<link href="assets/css/fonts.css" rel="stylesheet" type="text/css" />
	<link href="assets/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
	<link href="assets/css/animate.css" rel="stylesheet" type="text/css" />
	<script src="assets/js/jquery.min.js"></script>
	<script src="assets/js/jui2.lib.js"></script>
	<script src="assets/js/jui2.tmp.min.js"></script>
	<script src="assets/js/jui2.ui.js"></script>
	<style>
		* {
			color: #1c2022;
		}
		
		#header j-button {
			color: #ABACB1;
		}
		
		#header>.j-menu>j-button,
		#header>.j-menu-alt>j-button {
			font-family: "Lato", sans-serif !important;
			font-size: 16px !important;
			font-weight: 600 !important;
		}
		
		#header>.j-menu>j-button,
		#header>.j-menu-alt>j-button {
			padding: 20px;
			cursor: pointer;
		}
		
		#header>.j-menu-alt>i {
			padding: 10px;
			cursor: pointer;
		}
		
		#header>.j-menu>j-button:hover,
		#header>i:hover,
		j-button:hover,
		#header>.j-menu-alt>j-button:hover,
		#header>.j-menu-alt>j-button:hover>*,
		#header>.j-menu-alt>i:hover {
			color: #4ABFDF !important;
		}
		
		body {
			background: #F7F8F9;
		}
		
		*[data-badge]:after {
			background: #00a4d2 none repeat scroll 0 0;
			border: 2px solid #026280;
			border-radius: 1rem;
			color: white;
			content: attr(data-badge);
			font-size: 1rem;
			line-height: 1.75rem;
			position: absolute;
			right: -1rem;
			text-align: center;
			top: -1rem;
			height: auto;
			width: auto;
			padding: 0px 5px;
		}
		
		i[data-badge] {
			color: #4ABFDF;
		}
		
		*[data-badge=""]:after,
		*[data-badge="0"]:after {
			display: none;
		}
		
		i[data-badge=""],
		i[data-badge="0"] {
			color: inherit;
		}
		
		.j-ui {
			box-sizing: border-box;
			position: relative;
			display: inline-block;
		}
		
		.j-height-s {
			height: 10px;
		}
		
		.j-radius-s {
			border-radius: 3px;
		}
		
		.j-padding-s {
			padding: 1px;
		}
		
		.j-background-transparent {
			background: rgba(0, 0, 0, 0.1);
		}
		
		j-card {
			border-color: #e1e8ed;
			border-image: none;
			border-radius: 4px;
			border-style: solid;
			border-width: 1px;
			background: #fff;
			margin: 2px;
		}
		
		.info-task-completed>div {
			padding: 14px 20px;
		}
		
		.j-footer {
			padding: 20px 20px !important;
			background: #F8F8F8;
		}
		
		.j-footer>i {
			cursor: pointer;
		}
		
		.j-footer>i:hover {
			color: #4ABFDF !important;
		}
		
		j-card>.j-header {
			border-bottom: 1px solid #E2E2E2;
			background: #2FBFF3;
			color: #fff;
		}
		
		.j-header,
		.j-header>* {
			font-family: "Lato", sans-serif;
			font-size: 16px;
			font-weight: 600;
			color: #525e61;
		}
		
		.j-header {
			padding: 14px 20px;
		}
		
		.info-task-completed table td {
			padding: 2px 5px;
		}
		
		.info-task-completed table tr:nth-child(1) td:nth-child(1) {
			color: #ABACB1;
			font-size: 80px;
			padding-left: 0px;
		}
		
		.j-height-s .j-progress-bar {
			height: 8px;
		}
		
		.j-progress-bar {
			border-radius: 2px;
			background-image: -webkit-linear-gradient(top, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.05));
			background-image: -moz-linear-gradient(top, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.05));
			background-image: -o-linear-gradient(top, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.05));
			background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.05));
			-webkit-transition: 0.4s linear;
			-moz-transition: 0.4s linear;
			-o-transition: 0.4s linear;
			transition: 0.4s linear;
			-webkit-transition-property: width, background-color;
			-moz-transition-property: width, background-color;
			-o-transition-property: width, background-color;
			transition-property: width, background-color;
			-webkit-box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.25), inset 0 1px rgba(255, 255, 255, 0.1);
			box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.25), inset 0 1px rgba(255, 255, 255, 0.1);
		}
		
		.j-progress {
			-webkit-box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.25), 0 1px rgba(255, 255, 255, 0.08);
			box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.25), 0 1px rgba(255, 255, 255, 0.08);
		}
		
		.j-progress-bar-5 {
			background-color: #f63a0f;
		}
		
		.j-progress-bar-25 {
			background-color: #f27011;
		}
		
		.j-progress-bar-50 {
			background-color: #f2b01e;
		}
		
		.j-progress-bar-75 {
			background-color: #f2d31b;
		}
		
		.j-progress-bar-100 {
			background-color: #86e01e;
		}
		
		.j-list {
			border-collapse: collapse;
			width: 100%;
			display: table !important;
			padding: 0px 10px;
			table-layout: fixed;
		}
		
		.j-list td {
			text-overflow: ellipsis;
			white-space: nowrap;
			overflow: hidden;
		}
		
		.j-list td,
		.j-list th {
			padding: .9em;
			vertical-align: top;
		}
		
		.j-list tr {
			padding: .35em;
			border-bottom: 1px solid #E2E2E2;
		}
		
		.j-list thead tr {
			border-bottom: 2px solid #E2E2E2;
		}
		
		.j-list td[data-badge]:after {
			display: none;
		}
		
		.j-list td[data-hidden] {
			text-indent: inherit;
			white-space: inherit;
			overflow: inherit;
			font-size: inherit;
			margin: 0;
		}
		
		.j-menu-button,
		.j-menu-button-alt {
			text-decoration: none;
			display: none;
			padding: 20px;
			cursor: pointer;
		}
		
		nav.j-menu,
		nav.j-menu-alt {
			-moz-animation-duration: 0.5s;
			-webkit-animation-duration: 0.5s;
			-o-animation-duration: 0.5s;
			animation-duration: 0.5s;
		}
		/*
		
		.ripple:active:after {
			opacity: .2;
			position: absolute;
			content: "";
			width: 100%;
			height: 100%;
			transition: 0s;
			background: #000;
			top: 0;
			left: 0;
		}*/
		
		.j-line-bar::after {
			background: #86e01e none repeat scroll 0 0;
			content: "";
			display: block;
			height: 3px;
			width: 50%;
		}
		
		j-textfield {
			padding: 5px 8px;
			align-items: center;
			display: flex;
		}
		
		j-textfield label {
			width: 120px;
			font-weight: 700;
		}
		
		j-textfield input {
			border-radius: 3px;
			border: 1px solid #DFE1E3;
			padding: 12px 10px;
		}
		
		j-textfield input:focus {
			border-color: #4697e4;
		}
		
		j-spacer {
			flex: 1 1 0;
			-webkit-box-flex: 1;
			-webkit-flex: 1;
		}

	</style>
	<link href="assets/css/responsive.css" rel="stylesheet" type="text/css" />
</head>

<body>

	<div id="header" style="height: 60px; background: #fff; border: 0px; box-shadow: 0 0.5px 0 0 #ffffff inset, 0 1px 2px 0 #B3B3B3;flex: 1 1 0;-webkit-box-flex: 1;-webkit-flex: 1;align-items: center;display: flex;">
		<i class="j-menu-button fa fa-bars fa-2x ripple" style="color: #ABACB1;"></i>
		<nav class="j-menu">
			<j-button class="ripple j-ui" style="color: #525e61">Dashboard</j-button>
			<j-button class="ripple j-ui" style="color: #ABACB1">Project</j-button>
			<j-button class="ripple j-ui" style="color: #ABACB1">Task</j-button>
			<j-button class="ripple j-ui" style="color: #ABACB1">Calendar</j-button>
			<j-button class="ripple j-ui" style="color: #ABACB1">Document</j-button>
		</nav>
		<j-spacer style="flex: 1 1 0; -webkit-box-flex: 1; -webkit-flex: 1;"></j-spacer>
		<nav class="j-menu-alt">
			<!--j-button class="j-ui ripple" data-label="Notification">
				<i class="fa fa-bell fa-lg j-ui" style="" data-badge="10"></i>
			</j-button-->
			<j-button id="red-sign-in" class="j-ui ripple">
				Sign In
			</j-button>
			<!--div style="width: 200px;" id="user-info"></div-->
		</nav>
		<i class="j-menu-button-alt fa fa-ellipsis-v fa-2x ripple" style="color: #ABACB1;"></i>
	</div>

	<div id="red-content" style="padding: 10px; padding-top: 70px; box-sizing: border-box; height: 100%; display: flex; flex-wrap: wrap;">

		<?php if(isset($load)) $this->view($load); ?>

	</div>

	<!--div id="header "><?php $this->view('base/logo'); ?><j-toolbar style="padding-left: 8px;vertical-align: middle;flex: 1 1 0;-webkit-box-flex: 1;-webkit-flex: 1;align-items: center;display: flex; "><j-button class="active ">Dashboard</j-button><j-button>Issues</j-button></j-toolbar><?php $this->view('mini-info/index'); ?></div>
	<table id="body ">
		<tbody>
			<tr>
				<td id="left "></td>
				<td id="right "></td>
			</tr>
		</tbody>
	</table-->

	<script>
		var getWindowSize = (function() {
			var docEl = document.documentElement,
				IS_BODY_ACTING_ROOT = docEl && docEl.clientHeight === 0;

			// Used to feature test Opera returning wrong values 
			// for documentElement.clientHeight. 
			function isDocumentElementHeightOff() {
				var d = document,
					div = d.createElement('div');
				div.style.height = "2500px";
				d.body.insertBefore(div, d.body.firstChild);
				var r = d.documentElement.clientHeight > 2400;
				d.body.removeChild(div);
				return r;
			}

			if (typeof document.clientWidth == "number") {
				return function() {
					return {
						width: document.clientWidth,
						height: document.clientHeight
					};
				};
			} else if (IS_BODY_ACTING_ROOT || isDocumentElementHeightOff()) {
				var b = document.body;
				return function() {
					return {
						width: b.clientWidth,
						height: b.clientHeight
					};
				};
			} else {
				return function() {
					return {
						width: docEl.clientWidth,
						height: docEl.clientHeight
					};
				};
			}
		})();

		$('.j-menu-button').click(function() {
			$('.j-menu').css("visibility") == "visible" ? $('.j-menu').removeClass("slideInLeft").addClass("animated slideOutLeft").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
				$('.j-menu').css("visibility", "hidden")
			}) : ($('.j-menu-alt').css("visibility", "hidden").removeClass("slideInRight"), $('.j-menu').removeClass("slideOutLeft").css("visibility", "visible").addClass("animated slideInLeft").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
				$('.j-menu').css("visibility", "visible")
			}))
		})

		$('body').on('resize', function() {
			$('.j-menu').css("max-height", getWindowSize().height - 63)
			$('.j-menu-alt').css("max-height", getWindowSize().height - 63)
		})
		$('.j-menu').css("max-height", getWindowSize().height - 63)
		$('.j-menu-alt').css("max-height", getWindowSize().height - 63)

		$('.j-menu-button-alt').click(function() {
			$('.j-menu-alt').css("visibility") == "visible" ? $('.j-menu-alt').removeClass("slideInRight").addClass("animated slideOutRight").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
				$('.j-menu-alt').css("visibility", "hidden")
			}) : ($('.j-menu').css("visibility", "hidden").removeClass("slideInLeft"), $('.j-menu-alt').removeClass("slideOutRight").css("visibility", "visible").addClass("animated slideInRight").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
				$('.j-menu-alt').css("visibility", "visible")
			}))
		})

		$('nav').delegate("j-button", "click", function() {
			if ($("j-button").parent().hasClass("slideInRight") || $("j-button").parent().hasClass("slideInLeft"))
				$("j-button").parent().removeClass("slideInRight").removeClass("slideInLeft").removeClass("slideOutLeft").removeClass("slideOutRight").addClass("animated fadeOut").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
					$('.j-menu-alt').css("visibility", "hidden")
				})
		})

		redDomain = window.location + "/index.php";

		function redAppend(url, el) {
			$.ajax({
				url: url,
				success: function(data) {
					$(el).append(data);
				}
			})
		}

		function redLoad(url, el) {
			$.ajax({
				url: url,
				success: function(data) {
					$(el).empty().append(data);
				}
			})
		}

		$('#red-sign-in').click(function() {
			redLoad(redDomain + "/base/login?from_base", "#red-content")
		})

		/*$.ajax({
			url: 'index.php/project/',
			success: function(data) {
				$('#content').append(data);
			}
		})

		$.ajax({
			url: 'index.php/base/login',
			success: function(data) {
				$('#content').append(data);
			}
		})*/

	</script>
</body>

</html>
