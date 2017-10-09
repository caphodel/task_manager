/**
 * @classdesc Table custom web component
 * @class table
 * @example <caption>Basic table</caption>
 * <j-table>[["column1", "column2"], ["data1", "data2"]]</j-table>
 */
(function ($) {
    /** @constructor */
    var proto = Object.create(HTMLElement.prototype)

    proto.createdCallback = function () {

        jui2.ui.base.proto.createdCallback.call(this, jui2.ui.table);

        var $self = $(this),
            self = this,
            regxp = /<(.|\n)*?>(.|\n)*?<\/(.|\n)*?>/ig;
        this.aaData = [];

        $self.addClass('j-ui')

        this.jui2 = {
            events: {},
            calcMaxWidth: true,
            cellWidth: [],
            scrollbarWidth: 0,
            initial: true,
            headerOffset: 0
        }

        this.param = {
            sEcho: 0,
            rand: 0,
            iTotalRecords: 0,
            iDisplayLength: 10,
            iDisplayStart: 0,
            iSortCol: 0,
            sSearch: '',
            sSortDir: 'desc',
            totalPage: 0
        }

        var text = $('<div>' + this.innerHTML + '</div>');
        text.children().remove()

        if (text[0].innerHTML.trim().replace(regxp, '') == "")
            this.aaData = [];
        else
            this.aaData = JSON.parse(text[0].innerHTML.replace(regxp, ''));

        this.innerHTML = jui2.tmpl['tableBase']();
        this.headerMenu = $self.find('> .j-table > .j-table-head-pop').attr('related-to', $self.prop('id'))
        jui2.recylerItem.push(this.headerMenu);

        /*setup menu event*/
        this.headerMenu.find('.j-table-sort-asc').click(function () {
            self.sort(self.headerMenu[0].column, 'asc');
        })

        this.headerMenu.find('.j-table-sort-desc').click(function () {
            self.sort(self.headerMenu[0].column, 'desc');
        })

        $(this.headerMenu).appendTo('body')

        var $body = $self.children('.j-table').children('.j-table-body'),
            $head = $self.children('.j-table').children('.j-table-head');

        if (self.setup) {
            self.setup();
        }

        //adding header
        this.addHeader(this.aaData.shift());
        this.setHeaderMenu();

        this.generateData(this.aaData);

        //$head()

        this.attrChangedCb(['disabled', 'icon'])

        this.maxWidth = [];

        for (i in jui2.method) {
            this[i] = jui2.method[i];
        }

        $self.delegate('> .j-table > .j-table-head > .j-table-head-row > div', 'doubletap dblclick', function (e) {
            self.setColumnMaxWidth(this);
        });

        $self.on('doubletap dblclick', '> .j-table > .j-table-body > .j-table-body-row', function () {
            if (self.jui2.events.onItemDoubleClick)
                self.jui2.events.onItemDoubleClick(self.aaData[$(this).index()]);
        })

        $(window).off('scrollchange.table' + self.juiid)

        $(window).on('scrollchange.table' + self.juiid, function () {
            if ($('#' + self.juiid).length == 0) {
                $(window).off('scrollchange.table' + self.juiid)
            }
            self.setWidth();
        })

        var $element = $self;
        var $follow = $element.find('.j-table-head');
        var followHeight = $element.find('.j-table-head').outerHeight();

        $(window).off('scroll.table' + self.juiid)

        $(window).on('scroll.table' + self.juiid, function () {
            var height = $element.outerHeight(),
                window_height = $(window).height();
            if ($('#' + self.juiid).length == 0) {
                $(window).off('scroll.table' + self.juiid)
            }
            var pos = $(window).scrollTop();
            var top = $element.offset().top;

            // Check if element totally above or totally below viewport
            if (top + height - followHeight < pos || top > pos + window_height) {
                return;
            }

            var offset = parseInt($(window).scrollTop() + 60 - top);

            if (offset > 0) {
                $follow.css('transform', 'translateY(' + (offset) + 'px)');
                self.jui2.headerOffset = offset;
            } else {
                $follow.css('transform', 'translateY(0px)');
                self.jui2.headerOffset = 0;
            }

        });
    };

    proto.generateData = function (data) {
        var $self = $(this),
            self = this,
            $body = $self.children('.j-table').children('.j-table-body');

        this.aaData = data || this.aaData;

        this.generatedData = $.extend(true, {}, this.aaData)

        $self.triggerHandler('j-table.beforedraw');

        console.log('aaaaaa')

        $body.empty().append(jui2.tmpl['tableItems']({
            rows: this.generatedData,
            width: self.jui2.cellWidth
        }));

        $body.find('> div').click(function () {
            $(this).parent().children().removeClass('selected-top-border')
            $(this).addClass('selected').siblings().removeClass('selected')
            $(this).addClass('selected').prev().addClass('selected-top-border')
        })

        this.setWidth();

        this.addResizer($self.children('.j-table').find('> .j-table-head > .j-table-head-row > div'))

        $body.children().children(':nth-child(n+' + ($self[0].getHeaderContainer().children().last().children().length + 1) + ')').hide()

        $self.triggerHandler('afterdraw');
        $self.triggerHandler('j-table.afterdraw');
        $body.css('padding-top', $self[0].getHeaderContainer().height())
    }

    proto.setColumnMaxWidth = function (el) {
        var $el = $(el),
            $elItems = $(this).find('>.j-table > .j-table-body > .j-table-body-row > .j-table-body-column-' + el.column),
            $elWidth = $('<div style="position: absolute;visibility: hidden;height: auto;width: auto;white-space: nowrap;padding: 8px;"></div>').appendTo('body'),
            width = $elWidth.html(el.innerHTML).outerWidth(true);
        $elItems.each(function (i, val) {
            var w = $elWidth.html(val.innerHTML).outerWidth(true);
            if (w > width) {
                width = w;
            }
        })

        $elItems.css("flex", "1 0 " + width + "px") //.outerWidth(width)
        $el.css("flex", "1 0 " + width + "px") //.outerWidth(width)
        $(el).parent().children().each(function (i, el) {
            el.resizer_popper.update()
        })
        $elWidth.remove()
        $el.children().find('> .j-table-body > .j-table-body-row, > .j-table-head > .j-table-head-row').width($el.parent().children().sumWidth())
    }

    proto.addHeader = function (arrHeader, boundTo) {
        var $el = $(this),
            self = this,
            $headerContainer = self.getHeaderContainer(),
            $header = $(jui2.tmpl['tableHeader']({
                columns: arrHeader
            }));

        $header.children().each(function (i, val) {
            val.column = boundTo != undefined ? boundTo[i] : i;
        })

        $headerContainer.append($header);

        return $header;
    }

    proto.addResizer = function (el) {
        var $table = $(this)
        $(el).each(function (index, el) {
            if (el.resizer == undefined) {
                var $resizer = $('<div class="j-table-column-resizer" ontouchstart=""></div>')

                $table.children('.j-table').append($resizer);

                el.resizer = $resizer[0];
                $resizer[0].target = el;

                el.resizer_popper = new Popper(el, $resizer[0], {
                    placement: 'top-end',
                    modifiers: {
                        offset: {
                            offset: '0px, -' + $(el).outerHeight(true) + 'px'
                        }
                    },
                    onCreate: function (data) {
                        /*$resizer[0].position = {
                        	start: {
                        		x: 0,
                        		y: 0,
                        		offset: $resizer.offsetRelative().left
                        	}
                        }*/
                    },
                    eventsEnabled: false,
                    onUpdate: function (data) {

                        var translate = 'translate3d(' + ($(data.instance.reference).prevAll().sumWidth() + $(data.instance.reference).outerWidth() - 5) + 'px, 0px, 0px)'
                        data.instance.popper.style.webkitTransform = translate
                        data.instance.popper.style.MozTransform = translate
                        data.instance.popper.style.msTransform = translate
                        data.instance.popper.style.OTransform = translate
                        data.instance.popper.style.transform = translate
                        $(data.instance.popper).css('transform', translate)
                    }
                });

                $resizer[0].position = {
                    start: {
                        x: 0,
                        y: 0,
                        offset: $resizer.offsetRelative().left
                    }
                }

                $resizer.on('mousedown touchstart', function (e) {
                    var $el = $(this)
                    $el.addClass('j-table-column-resizer-active')
                    $el.css('width', '2px')
                    var clientX = e.type != 'touchstart' ? e.originalEvent.clientX : e.originalEvent.changedTouches[0].clientX;
                    this.position.start.x = clientX
                    this.position.start.offset = $resizer.offsetRelative().left

                    $('body')[0].dragEl = this;
                    $el.parent().addClass('j-no-select')
                })

                $('body').on("mouseup touchend", function (e) {
                    if (this.dragEl) {
                        var $el = $(this.dragEl)
                        $el.removeClass('j-table-column-resizer-active')
                        $el.css('width', '1px')
                        var clientX = e.type != 'touchend' ? e.originalEvent.clientX : e.originalEvent.changedTouches[0].clientX;
                        var translate = 'translate3d(' + (this.dragEl.position.start.offset + (clientX - this.dragEl.position.start.x)) + 'px, 0px, 0px)',
                            resizer = this.dragEl
                        this.dragEl.style.webkitTransform = translate
                        this.dragEl.style.MozTransform = translate
                        this.dragEl.style.msTransform = translate
                        this.dragEl.style.OTransform = translate
                        this.dragEl.style.transform = translate

                        var self = $(this.dragEl).parent('.j-table').parent()[0],
                            $table = $(this.dragEl).parent('.j-table');
                        var elWidth = $(this.dragEl.target).outerWidth(true) + (clientX - this.dragEl.position.start.x),
                            allWidth = $table.find('> .j-table-body > .j-table-body-row, > .j-table-head').outerWidth(true) + (clientX - this.dragEl.position.start.x),
                            elNextWidth = $(this.dragEl.target).next().outerWidth(true) - (clientX - this.dragEl.position.start.x);

                        $target = $(this.dragEl.target)
                        $target.css("flex", "1 0 " + elWidth + "px") /*.outerWidth(elWidth)*/ /*.next().css("flex", "1 0 " + elNextWidth + "px")*/ //.outerWidth(elNextWidth)
                        self.jui2.cellWidth[$target.index()] = elWidth;

                        $table.removeClass('j-no-select')
                        $table.find('> .j-table-body > .j-table-body-row > .j-table-body-column-' + this.dragEl.target.column).css("flex", "1 0 " + elWidth + "px") /*.outerWidth(elWidth)*/ /*.next().css("flex", "1 0 " + elNextWidth + "px")*/ //.outerWidth(elNextWidth)
                        /*console.log($target.parent().children().sumWidth())
                        if(allWidth < $target.parent().children().sumWidth()){
                            $target.next().css("flex", "1 0 " + elNextWidth + "px");
                            $table.find('> .j-table-body > .j-table-body-row > .j-table-body-column-' + this.dragEl.target.column).next().css("flex", "1 0 " + elNextWidth + "px")
                        }*/
                        $table.find('> .j-table-body > .j-table-body-row, > .j-table-head > .j-table-head-row').width(allWidth)
                        $table.find('> .j-table-body > .j-table-body-row, > .j-table-head').width(allWidth)

                        $table.find('> .j-table-body > .j-table-body-row, > .j-table-head > .j-table-head-row').width($target.parent().children().sumWidth())
                        $table.find('> .j-table-body > .j-table-body-row, > .j-table-head').width($target.parent().children().sumWidth())

                        /*if(allWidth < $target.parent().children().sumWidth()){
                            $target.next().css("flex", "1 0 " + elNextWidth + "px");
                            $table.find('> .j-table-body > .j-table-body-row > .j-table-body-column-' + this.dragEl.target.column).next().css("flex", "1 0 " + elNextWidth + "px")
                        }*/

                        $target.parent().children().each(function (i, el) {
                            el.resizer_popper.update()
                        })
                    }
                    this.dragEl = undefined;
                })

                $('body').on("mousemove touchmove", function (e) {
                    if (this.dragEl != undefined) {
                        var table = $(this.dragEl).parent()[0];
                        var clientX = e.type != 'touchmove' ? e.originalEvent.clientX : e.originalEvent.changedTouches[0].clientX;
                        var translate = 'translate3d(' + (this.dragEl.position.start.offset + (clientX - this.dragEl.position.start.x) + table.scrollLeft) + 'px, 0px, 0px)'
                        this.dragEl.style.webkitTransform = translate
                        this.dragEl.style.MozTransform = translate
                        this.dragEl.style.msTransform = translate
                        this.dragEl.style.OTransform = translate
                        this.dragEl.style.transform = translate
                    }
                })
            }
        });
    }

    proto.getHeaderContainer = function () {
        var $el = $(this)
        return $el.find('.j-table > .j-table-head');
    }

    proto.getBodyContainer = function () {
        var $el = $(this)
        return $el.find('.j-table > .j-table-body');
    }

    proto.setWidth = function () {
        var self = this,
            $self = $(this),
            $header = this.getHeaderContainer(),
            $body = this.getBodyContainer();

        if (this.jui2.calcMaxWidth) {
            $header.children('.j-table-head-row').children().each(function (i, val) {
                self.jui2.cellWidth[i] = $(val).outerWidth(true);
            })
            $.each(this.jui2.cellWidth, function (i, val) {
                var width = Math.max.apply(null, $body.find('> div > div:nth-child(' + (i + 1) + ')').map(function () {
                    return $(this).outerWidth(true);
                }).get());
                self.jui2.cellWidth[i] = width > self.jui2.cellWidth[i] ? width : self.jui2.cellWidth[i];
            })
        }

        if (this.aaData.length > 0) {
            this.jui2.calcMaxWidth = false
        }

        var maxWidthKey = $.maxKey(self.jui2.cellWidth);

        var count = 0;
        for (var i = self.jui2.cellWidth.length; i--;) {
            count += self.jui2.cellWidth[i];
        }

        this.jui2.cellWidth[maxWidthKey] += $header.width() - count;

        var scrollWidth = 0;

        if (this.aaData.length > 0 && !this.jui2.initial) {
            $(this).children().children('.j-table-head').css('position', 'absolute')
            if ($('body').hasScrollBar()) {
                this.jui2.scrollbarWidth = scrollWidth = $.scrollbarWidth();
            } else if (this.jui2.scrollbarWidth != 0) {
                scrollWidth = -this.jui2.scrollbarWidth;
                this.jui2.scrollbarWidth = 0;
            }
        }
        /*else if($(this).children().width() - $(this).children().children('.j-table-head').width() == $.scrollbarWidth()){
            scrollWidth = 0;
        }*/

        //if(this.jui2.initial && $(this).children().width() < Math.round(count) && this.aaData.length > 0){
        if (count != $(this).children().width())
            self.jui2.cellWidth[self.jui2.cellWidth.length - 1] = self.jui2.cellWidth[self.jui2.cellWidth.length - 1] - scrollWidth;
        //}

        $.each(self.jui2.cellWidth, function (i, val) {
            $header.find('> div > div:nth-child(' + (i + 1) + ')').css("flex", "1 0 " + val + "px") //.outerWidth(val)
            $body.find('> div > div:nth-child(' + (i + 1) + ')').css("flex", "1 0 " + val + "px") //.outerWidth(val)
        })

        if ($(this).children().width() - $(this).children().children('.j-table-head').width() == $.scrollbarWidth()) {
            scrollWidth = -$.scrollbarWidth();
        }

        count = 0;
        for (var i = self.jui2.cellWidth.length; i--;) {
            count += self.jui2.cellWidth[i];
        }

        //var rowWidth = count//$header.children().eq(0).children().sumWidth() - scrollWidth

        $(this).children().find('> .j-table-body > .j-table-body-row, > .j-table-head > .j-table-head-row').width(count)

        $(this).children().find('> .j-table-body > .j-table-body-row, > .j-table-head').width(count)

        $body.find('> div > div').css('white-space', 'normal')

        $(this).children().find('> .j-table-body > .j-table-body-row, > .j-table-head > .j-table-head-row').children().each(function (i, el) {
            if (el.resizer_popper) {
                el.resizer_popper.update()
            }
        })

        if (this.aaData.length > 0 && this.jui2.initial) {
            $(this).children().children('.j-table-head').css('transform', 'translateY(0px)').css('position', 'absolute')
            this.jui2.initial = false
        }
    }

    proto._sort = function (column, sort) {
        if (sort == 'asc')
            this.aaData.sort(function (a, b) {
                return a[column] - b[column]
            })
        if (sort == 'desc')
            this.aaData.sort(function (a, b) {
                return b[column] - a[column]
            })
        this.sortColumn = column;
    }

    proto.sort = function (column, sort) {
        if (this.fnSort) {
            this.fnSort(column, sort)
        } else {
            this._sort(column, sort);
        }
        this.generateData();
    }

    proto.setHeaderMenu = function () {
        var self = this,
            $self = $(this),
            $header = this.getHeaderContainer(),
            $body = this.getBodyContainer();
        $('body').click(function (e) {
            if ($(e.target).closest('.j-table-head-action').length == 0 && $(e.target).parents('.j-pop').length == 0) {
                var $jtable = $('#' + $('body').find('> .j-table-head-pop:visible').attr('related-to'))
                $jtable.find('.j-table-head-action:visible').removeAttr('style');
                if ($jtable.length > 0) {
                    //$jtable.find('.j-table-head-action').hide()
                    $jtable.each(function (i, val) {
                        val.jui_popper_id = null;
                        val.headerMenu.hide()
                    })
                }
            }
        })

        $header.find('.j-table-head-action').click(function () {
            var $self = $(this).closest('j-table'),
                $headerMenu = $self[0].headerMenu,
                $headAction = $(this);
            $headerMenu[0].column = $(this).parent()[0].column;
            $headAction.parent().siblings().children('.j-table-head-action').removeAttr('style');
            $('j-table').find('.j-table-head-action:visible').not($headAction).removeAttr('style').closest('j-table').each(function (i, val) {
                val.jui_popper_id = null;
                val.headerMenu.hide()
            });
            $('body').find('> .j-table-head-pop:not([related-to=' + $headAction.closest('j-table').prop('id') + '])').hide()

            if ($self[0].jui_popper_id != this) {
                if ($self[0].jui_popper)
                    $self[0].jui_popper.destroy()
                $headerMenu.hide()
                $headerMenu.show()
                $headAction[0].jui_popper = new Popper(this, $headerMenu[0], {
                    placement: 'bottom-start',
                    onCreate: function (data) {
                        $header.find('> .j-table-head-action').css('display', '')
                        $headAction.css('display', 'block')
                        $(data.instance.popper).find('.j-pop-children').hide()

                        $(data.instance.popper).find('.j-pop-children').each(function (i, val) {

                            $(val).parent().on('mouseover', function (e) {
                                var $el = $(this)
                                if ($el.children('.j-pop-children')[0].jui_popper)
                                    $el.children('.j-pop-children')[0].jui_popper.destroy()
                                $el.children('.j-pop-children')[0].jui_popper = new Popper($el[0], $el.children('.j-pop-children')[0], {
                                    placement: 'right-start'
                                });

                                $el.children('.j-pop-children').show();

                                $el.siblings().on('mouseover', function (e) {
                                    $el.find('.j-pop-children').hide();
                                    e.stopPropagation()
                                })
                                e.stopPropagation()
                            })
                        })
                    }
                });
            } else {
                //$('.j-table-head-pop').is(':visible') ? ($('.j-table-head-pop').hide(), el.css('display', ''), $('.j-table-columns-pop').hide()) : ($('.j-table-head-pop').show(), //el.css('display', 'block'))
            }
            $self[0].jui_popper_id = this;
        })
    }

    proto.onItemDoubleClick = function (fn) {
        $(this).find('> .j-table > .j-table-body').css('cursor', 'pointer');
        this.jui2.events.onItemDoubleClick = fn;
    }

    proto.offItemDoubleClick = function (fn) {
        $(this).find('> .j-table > .j-table-body').css('cursor', '');
        this.jui2.events.onItemDoubleClick = null;
    }

    proto.getRow = function (index) {
        return $(this).find('> .j-table > .j-table-body > .j-table-body-row').eq(index);
    }

    proto.getRecord = function (index) {
        return this.aaData[index];
    }

    proto.attachedCallback = function () {
        /*for (i in this.attributes) {
        	var attrName = this.attributes[i].nodeName,
        		newVal = this.attributes[i].nodeValue;
        	if (jui2.attrChange[this.tagName.toLowerCase() + '_' + attrName])
        		jui2.attrChange[this.tagName.toLowerCase() + '_' + attrName](this, false, newVal);
        	else if (jui2.attrChange[attrName] && this.enabledAttrChange.indexOf(attrName) > -1)
        		jui2.attrChange[attrName](this, false, newVal);
        }*/
        //$(this).triggerHandler('afterdraw')
    }

    proto.attributeChangedCallback = function (attrName, oldVal, newVal) {
        if (jui2.attrChange[this.tagName.toLowerCase() + '_' + attrName])
            jui2.attrChange[this.tagName.toLowerCase() + '_' + attrName](this, false, newVal);
        else if (jui2.attrChange[attrName] && this.enabledAttrChange.indexOf(attrName) > -1)
            jui2.attrChange[attrName](this, false, newVal);
    }

    jui2.ui.table = {
        widget: document.registerElement('j-table', {
            prototype: proto
        }),
        proto: proto
    }

    jui2.attrChange['j-table_src-array'] = function (el, oldVal, newVal) {
        if (newVal != null) {
            if (el.generateData_ == undefined)
                el.generateData_ = el.generateData;
            el.generateData = function (data) {
                if (typeof data == 'array') {
                    el.generateData_(data);
                }
                else if (!data) {
                    el.generateData_(eval(newVal), false);
                }
            }
        } else {

        }
    }

    jui2.attrChange['j-table_src-fn'] = function (el, oldVal, newVal) {
        if (newVal != null) {
            if (el.generateData_ == undefined)
                el.generateData_ = el.generateData;
            el.generateData = function (data) {
                if (typeof data == 'array' || typeof data == 'object') {
                    el.generateData_(data);
                }
                else if (!data) {
                    eval(newVal).call()
                }
            }
            el.generateData()
        } else {

        }
    }

    jui2.attrChange['j-table_src-ajax'] = function (el, oldVal, newVal) {
        var $el = $(el);
        if (newVal != null) {
            if (el.generateData_ == undefined)
                el.generateData_ = el.generateData;
            el.generateData = function (data) {
                if (typeof data == 'array') {
                    el.generateData_(data);
                }
                else if (!data) {
                    $.getJSON(newVal, param, function (data) {
                        if (data.sEcho == el.param.sEcho) {
                            el.aaData = data.aaData;
                            el.param.iTotalRecords = data.iTotalRecords;
                            el.param.totalPage = Math.ceil(el.param.iTotalRecords / el.param.iDisplayLength)
                            el.generateData_(data.aaData);
                        }
                    })
                }
            }
        } else {

        }
    }

}(jQuery));
