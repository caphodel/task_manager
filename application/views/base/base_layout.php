<html>

<head>
    <link href="<?php echo base_url() ?>assets/css/main.css" rel="stylesheet" type="text/css" />
    <link href="<?php echo base_url() ?>assets/css/fonts.css" rel="stylesheet" type="text/css" />
    <link href="<?php echo base_url() ?>assets/css/animate.css" rel="stylesheet" type="text/css" />
    <script src="<?php echo base_url() ?>assets/js/jquery.min.js"></script>
    <script src="<?php echo base_url() ?>assets/js/jui2.lib.js"></script>
    <script src="<?php echo base_url() ?>assets/js/jui2.tmp.min.js"></script>
    <script src="<?php echo base_url() ?>assets/js/jui2.ui.js"></script>
    <script src="<?php echo base_url() ?>assets/js/cookie.js"></script>
    <script src="<?php echo base_url() ?>assets/js/history.js"></script>
    <script src="<?php echo base_url() ?>assets/js/jwt-decode.min.js"></script>
    <script src="<?php echo base_url() ?>assets/js/defiant.min.js"></script>
    <script src="<?php echo base_url() ?>assets/js/moment_min.js"></script>
    <title>Task Manager</title>
    <style>
        * {
            color: #1c2022;
            line-height: 18px;
        }

        #header j-button {
            color: #ABACB1;
            border: 0px;
            background: #24292E;
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
            background: #fff;
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
            /*border-style: solid;
			border-width: 1px;*/
            background: #fff;
            margin: 2px;
        }

        j-card>* {
            border-color: #5fa2dd;
            border-left: 1px solid #5fa2dd;
            border-right: 1px solid #5fa2dd;
        }

        j-card>*:first-child {
            border-top: 1px solid #5fa2dd;
            border-left: 1px solid #5fa2dd;
            border-right: 1px solid #5fa2dd;
            border-top-left-radius: 4px;
            border-top-right-radius: 4px;
        }

        j-card>*:last-child {
            border-bottom: 1px solid #5fa2dd;
            border-left: 1px solid #5fa2dd;
            border-right: 1px solid #5fa2dd;
            border-bottom-left-radius: 4px;
            border-bottom-right-radius: 4px;
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

        /*.j-header,
		.j-header>* {
			font-family: "Lato", sans-serif;
			font-size: 16px;
			font-weight: 600;
			color: #525e61;
		}*/

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

        j-spacer {
            flex: 1 1 0;
            -webkit-box-flex: 1;
            -webkit-flex: 1;
        }

        .fa-lg2 {
            font-size: 1.4em !important;
            line-height: .65em !important;
            vertical-align: -15%;
        }

        .red-issue-filter td{
            width: 33.3%;
        }

    </style>
    <!--link href="assets/css/responsive.css" rel="stylesheet" type="text/css" /-->

    <link href="<?php echo base_url() ?>assets/css/jui2.css" rel="stylesheet" type="text/css" />
    <link href="<?php echo base_url() ?>assets/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
</head>

<body>

    <div id="header" style="height: 60px; border: 0px; box-shadow: 0 0.5px 0 0 #ffffff inset, 0 1px 2px 0 #B3B3B3;flex: 1 1 0;-webkit-box-flex: 1;-webkit-flex: 1;align-items: center;display: flex;">
        <!--i class="j-menu-button fa fa-bars fa-2x ripple" style="color: #ABACB1;"></i-->
        <nav class="j-menu">
            <j-button class="ripple j-ui" style="color: #ABACB1">Dashboard</j-button>
            <j-button href="<?php echo base_url() ?>projects" class="ripple j-ui" style="color: #ABACB1">Project</j-button>
            <j-button href="<?php echo base_url() ?>issues" id="red-btn-task" class="ripple j-ui" style="color: #ABACB1">Task</j-button>
            <j-button class="ripple j-ui" style="color: #ABACB1">Calendar</j-button>
            <j-button class="ripple j-ui" style="color: #ABACB1">Document</j-button>
        </nav>
        <j-spacer style="flex: 1 1 0; -webkit-box-flex: 1; -webkit-flex: 1;"></j-spacer>
        <nav class="j-menu-alt">
            <!--j-button class="j-ui ripple" data-label="Notification">
				<i class="fa fa-bell fa-lg j-ui" style="" data-badge="10"></i>
			</j-button-->
            <j-button href="<?php echo base_url() ?>login" id="red-sign-in" class="j-ui ripple">
                Sign In
            </j-button>
            <!--div style="width: 200px;" id="user-info"></div-->
        </nav>
        <!--i class="j-menu-button-alt fa fa-ellipsis-v fa-2x ripple" style="color: #ABACB1;"></i-->
    </div>

    <div id="red-content" style="/*padding: 10px; padding-top: 70px;*/ padding-top: 60px; box-sizing: border-box; height: 100%;/* display: flex; flex-wrap: wrap;*/">

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

        function redJournalFormatter() {
            var $data = $('.red-issue-journal-detail > div'),
                assigned_to = [], status = [];

            $data.each(function(i, val) {
                val = $(val)
                var text = val.html();

                if (val.children('b').text() == 'status_id'){
                    if (text.match('set to')!=null) {
                        var id = text.split('set to ')
                        status.push(id[1])
                    } else {
                        var id = text.split('changed from ')[1].split(' to ')
                        status.push(id[0])
                        status.push(id[1])
                    }
                }

                if (val.children('b').text() == 'assigned_to_id') {
                    if (text.match('set to')!=null) {
                        var id = text.split('set to ')
                        assigned_to.push(id[1])
                    } else {
                        var id = text.split('changed from ')[1].split(' to ')
                        assigned_to.push(id[0])
                        assigned_to.push(id[1])
                    }
                }

                if (val.children('b').text() == 'done_ratio') {
                    val.children('b').text('% Done')
                }
            })

            if (assigned_to.length > 0) {
                $.ajax({
                    url: window.location.origin + ':8080/api/user/' + assigned_to.join(','),
                    type: 'GET',
                    dataType: 'jsonp',
                    success: function(data) {
                        $data.each(function(i, val) {
                            val = $(val)
                            var text = val.html();
                            if (val.children('b').text() == 'assigned_to_id') {
                                val.children('b').text('Assigned to')
                                if (text.match('set to')) {
                                    var id = text.split('set to ')
                                    var user = JSON.search(data, '//*[id="'+id[1]+'"]')[0];
                                    val.html(val.html().replace(id[1], red_string_generator([user.id, user.fullname], 'users')))
                                } else {
                                    var id = text.split('changed from ')[1].split(' to ')
                                    var user = JSON.search(data, '//*[id="'+id[0]+'"]')[0];
                                    val.html(val.html().replace(id[0], red_string_generator([user.id, user.fullname], 'users')))
                                    user = JSON.search(data, '//*[id="'+id[1]+'"]')[0];
                                    val.html(val.html().replace(id[1], red_string_generator([user.id, user.fullname], 'users')))
                                }
                            }
                        })
                    },
                    error: function() {},
                    beforeSend: function setHeader(xhr) {
                        xhr.setRequestHeader('x-access-token', Cookies.get('token'));
                    }
                })
            }

            if (status.length > 0) {
                $.ajax({
                    url: window.location.origin + ':8080/api/status/' + status.join(','),
                    type: 'GET',
                    dataType: 'jsonp',
                    success: function(data) {
                        $data.each(function(i, val) {
                            val = $(val)
                            var text = val.html();
                            if (val.children('b').text() == 'status_id') {
                                val.children('b').text('Status')
                                if (text.match('set to')) {
                                    var id = text.split('set to ')
                                    var status = JSON.search(data, '//*[id="'+id[1]+'"]')[0];
                                    val.html(val.html().replace(id[1], status.name))
                                } else {
                                    var id = text.split('changed from ')[1].split(' to ')
                                    var status = JSON.search(data, '//*[id="'+id[0]+'"]')[0];
                                    val.html(val.html().replace(id[0], status.name))
                                    status = JSON.search(data, '//*[id="'+id[1]+'"]')[0];
                                    val.html(val.html().replace(id[1], status.name))
                                }
                            }
                        })
                    },
                    error: function() {},
                    beforeSend: function setHeader(xhr) {
                        xhr.setRequestHeader('x-access-token', Cookies.get('token'));
                    }
                })
            }
        }

        function stringFormatter(text) {
            var exp = /(("(.*)":)?\b(https?|ftp|file):\/\/[-A-Z0-9+\(\)&@#\/%?=~_|!:,.;]*[-A-Z0-9+\(\)&@#\/%=~_|])/ig;
            var ret = text.replace(exp, "<a href='$1'>$1</a>").replace(/href='(["'])(?:(?=(\\?))\2.)*?\1:/ig, "href='") //.replace(/(["'])((?:(?=(\\?))\2.)*?\1):/ig, "");

            var data = ret.match(/(["'])(?:(?=(\\?))\2.)*?\1:(.*)<\/a>*?/ig);
            if (data != null) {
                for (var i = 0; i < data.length; i++) {
                    ret = ret.replace(data[i], data[i].split('":')[0].split('"')[1] + '<\/a')
                }
            }

            ret = ret.replace(/(#\d+)/g, "<a href='issues/$1'>$1</a>");
            ret = ret.replace(/(href='issues\/#)/g, "href='<?php echo base_url() ?>issues/")
            return ret;
        }

        red_string_generator = function(data, type) {
            switch (type) {
                case 'user':
                case 'users':
                case 'assigned_to':
                case 'author':
                    return "<a href='<?php echo base_url() ?>users/" + data[0] + "'>" + data[1] + "</a>";
                case 'issue':
                    return "<a href='<?php echo base_url() ?>issues/" + data[0] + "' red-issue='" + data[2] + "'>" + data[1] + "</a>";
                case 'project':
                    return "<a href='<?php echo base_url() ?>projects/" + data[0] + "'>" + data[1] + "</a>";
            }
        }

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

        var redDomain = "<?php echo base_url() ?>",
            red_token = "",
            red_user_permission = "",
            red_project_identifier = "",
            red_previous_url;

        function redAppend(url, el) {
            $.ajax({
                url: url,
                success: function(data) {
                    $(el).append(data);
                }
            })
        }

        function redDoCheck(callback) {
            var admin = Cookies.get('token') != undefined ? (jwt_decode(Cookies.get('token')).admin == 1 ? ':admin' : '') : '';
            callback((red_user_permission.permissions + admin))
            $('[red-permission]:not([red-permission="login"])').each(function(i, val) {
                var allowed = (red_user_permission.permissions + admin).match(new RegExp($(val).attr('red-permission')));
                if (allowed != null) {

                } else {
                    $(val).remove()
                }
            })
        }

        function redProjectPermissionChecker(callback) {
            var login = Cookies.get('token');
            if (login != undefined) {
                login = jwt_decode(login)
                if (red_project_identifier != '') {
                    $.ajax({
                        url: window.location.origin + ':8080/api/project/' + red_project_identifier + '/role/' + login.id,
                        type: 'GET',
                        dataType: 'jsonp',
                        success: function(data) {

                            if (data == null) {
                                $.ajax({
                                    url: window.location.origin + ':8080/api/role/1',
                                    type: 'GET',
                                    dataType: 'jsonp',
                                    success: function(data) {
                                        red_user_permission = data
                                        redDoCheck(callback)
                                    },
                                    error: function() {},
                                    beforeSend: function setHeader(xhr) {
                                        xhr.setRequestHeader('x-access-token', Cookies.get('token'));
                                    }
                                });
                            } else {
                                red_user_permission = data
                                redDoCheck(callback)
                            }
                        },
                        error: function() {},
                        beforeSend: function setHeader(xhr) {
                            xhr.setRequestHeader('x-access-token', Cookies.get('token'));
                        }
                    });
                } else {
                    $.ajax({
                        url: window.location.origin + ':8080/api/role/1',
                        type: 'GET',
                        dataType: 'jsonp',
                        success: function(data) {
                            red_user_permission = data
                            redDoCheck(callback)
                        },
                        error: function() {},
                        beforeSend: function setHeader(xhr) {
                            xhr.setRequestHeader('x-access-token', Cookies.get('token'));
                        }
                    });
                }
            } else {
                $.ajax({
                    url: window.location.origin + ':8080/api/role/2',
                    type: 'GET',
                    dataType: 'jsonp',
                    success: function(data) {
                        red_user_permission = data
                        redDoCheck(callback)
                    },
                    error: function() {},
                    beforeSend: function setHeader(xhr) {
                        xhr.setRequestHeader('x-access-token', Cookies.get('token'));
                    }
                });
            }
        }

        function redPermissionChecker() {
            $('[red-permission="login"]').hide()
            var login = Cookies.get('token');
            if (login != undefined) {
                if (!jwt_decode(login)) {
                    $('[red-permission="login"]').remove()
                } else {
                    $('#red-sign-in').text("Logged In")
                    $('[red-permission="login"]').show()
                }
            } else {
                $('[red-permission="login"').remove()
                $('[red-permission]').show()
            }
        }

        function redLoad(url, el) {
            $.ajax({
                url: url,
                success: function(data) {
                    $(el).empty().append(data);
                    redPermissionChecker()
                }
            })
        }

        redPermissionChecker()

        function isExternal(url) {
            var match = url.match(/^([^:\/?#]+:)?(?:\/\/([^\/?#]*))?([^?#]+)?(\?[^#]*)?(#.*)?/);
            if (typeof match[1] === "string" && match[1].length > 0 && match[1].toLowerCase() !== location.protocol) return true;
            if (typeof match[2] === "string" && match[2].length > 0 && match[2].replace(new RegExp(":(" + {
                    "http:": 80,
                    "https:": 443
                }[location.protocol] + ")?$"), "") !== location.host) return true;
            return false;
        }

        $(function() {
            // we get a normal Location object

            /*
             * Note, this is the only difference when using this library,
             * because the object window.location cannot be overriden,
             * so library the returns generated "location" object within
             * an object window.history, so get it out of "history.location".
             * For browsers supporting "history.pushState" get generated
             * object "location" with the usual "window.location".
             */
            var location = window.history.location || window.location;

            // looking for all the links and hang on the event, all references in this document
            $(document).on('click tap', 'a, j-button[href]', function() {
                // keep the link in the browser history

                if (!isExternal($(this).attr('href'))) {

                    if ($(this).attr('href').match('/login') == null)
                        red_previous_url = $(this).attr('href');

                    history.pushState(null, null, $(this).attr('href'));

                    // here can cause data loading, etc.
                    redLoad($(this).attr('href'), "#red-content")

                    // do not give a default action
                    return false;
                } else {
                    return true
                }
            });

            // hang on popstate event triggered by pressing back/forward in browser
            $(window).on('popstate', function(e) {

                // here can cause data loading, etc.

                // just post
                //console.log("We returned to the page with a link: " + location.href);
                if (location.href.split("task_manager/")[1] != "")
                    redLoad(location.href, "#red-content");
            });
        });

        $(document).ready(function() {
            var href = window.location.href.split(redDomain);
            if (href.length > 1 && href[1] != '') {
                redLoad(redDomain + href[1], "#red-content")
            }
        })

    </script>
</body>

</html>
