function redAppend(url, el) {
    $.ajax({
        url: url,
        success: function (data) {
            $(el).append(data);
        }
    })
}

function redDoCheck(callback) {
    var admin = Cookies.get('token') != undefined ? (jwt_decode(Cookies.get('token')).admin == 1 ? ':admin' : '') : '';
    callback(((red_user_permission.member_role ? red_user_permission.member_role.role.permissions : red_user_permission.permissions) + admin))
    $('[red-permission]:not([red-permission="login"])').each(function (i, val) {
        var allowed = ((red_user_permission.member_role ? red_user_permission.member_role.role.permissions : red_user_permission.permissions) + admin).match(new RegExp($(val).attr('red-permission')));
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
                success: function (data) {

                    if (data == null) {
                        $.ajax({
                            url: window.location.origin + ':8080/api/role/1',
                            type: 'GET',
                            dataType: 'jsonp',
                            success: function (data) {
                                red_user_permission = data
                                redDoCheck(callback)
                            },
                            error: function () {},
                            beforeSend: function setHeader(xhr) {
                                xhr.setRequestHeader('x-access-token', Cookies.get('token'));
                            }
                        });
                    } else {
                        red_user_permission = data
                        redDoCheck(callback)
                    }
                },
                error: function () {},
                beforeSend: function setHeader(xhr) {
                    xhr.setRequestHeader('x-access-token', Cookies.get('token'));
                }
            });
        } else {
            $.ajax({
                url: window.location.origin + ':8080/api/role/1',
                type: 'GET',
                dataType: 'jsonp',
                success: function (data) {
                    red_user_permission = data
                    redDoCheck(callback)
                },
                error: function () {},
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
            success: function (data) {
                red_user_permission = data
                redDoCheck(callback)
            },
            error: function () {},
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
        success: function (data) {
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

$(function () {
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
    $(document).on('click tap', 'a, j-button[href]', function () {
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
    $(window).on('popstate', function (e) {

        // here can cause data loading, etc.

        // just post
        //console.log("We returned to the page with a link: " + location.href);
        if (location.href.split("task_manager/")[1] != "")
            redLoad(location.href, "#red-content");
    });
});

(function ($) {
    $.fn.vals = function () {
        var selector = this.selector,
            $this = $(selector),
            $vals = [];
        $this.each(function (i, val) {
            $el = $(val);
            $vals[$el.attr('name') || $el.attr('id')] = $el.val()
        })
        return $vals;
    }
})(jQuery);

$(document).ready(function () {
    var href = window.location.href.split(redDomain);
    if (href.length > 1 && href[1] != '') {
        redLoad(redDomain + href[1], "#red-content")
    }
})

function findPos(obj) {
    var curtop = 0;
    if (obj.offsetParent) {
        do {
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
        return [curtop];
    }
}

function trbl(e, relative) {
    var r = $(e).get(0).getBoundingClientRect();
    relative = $(relative);

    return {
        t: r.top + relative['scrollTop'](),
        r: r.right + relative['scrollLeft'](),
        b: r.bottom + relative['scrollTop'](),
        l: r.left + relative['scrollLeft']()

    }
}

$(function () {

    var $window = $(window),
        topPadding = 15;

    $window.scroll(function () {
        $(".red-sticky").each(function (i, val) {
            var $el = $(val),
                offset = trbl(val, window),
                top = $el.attr('top') != undefined ? $el.attr('top') : offset.t;

            if ($window.scrollTop()+60 > top && $el.css('position') == 'relative') {
                $el.attr('top', offset.t).css('position', 'fixed').css({
                    'position': 'fixed',
                    'top': '60px',
                    'left': (parseInt(offset.l) - parseInt($el.css('margin-left'))) + 'px',
                    'z-index': 10000
                }).addClass('red-fixed')
            } else if ($window.scrollTop() <= top) {
                $el.css({
                    'position': 'relative',
                    'top': '',
                    'left': '',
                    'z-index': ''
                }).removeClass('red-fixed')
            }
        })
        /*if ($window.scrollTop() > offset.top) {
            $sidebar.stop().animate({
                marginTop: $window.scrollTop() - offset.top + topPadding
            });
        } else {
            $sidebar.stop().animate({
                marginTop: 0
            });
        }*/
    });

});
