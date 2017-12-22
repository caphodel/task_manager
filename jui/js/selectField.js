/**
 * @classdesc SelectField custom web component
 * @class selectField
 * @property {string} icon Button icon, using font awesome. Ex. fa-calendar etc. For icon list see <a href="">http://fortawesome.github.io/Font-Awesome/icons/</a>
 * @example <caption>Basic usage: <br/><j-selectfield>Username</j-selectfield></caption>
 * <j-selectfield>Username</j-selectfield>
 * @example <caption>Textfield with icon: <br/><j-selectfield icon="fa-user">Username</j-selectfield></caption>
 * <j-selectfield icon="fa-user">Username</j-selectfield>
 */

/*global jui2 localStorage document Object jQuery HTMLElement Popper*/

(function ($) {
    /** @constructor */
    var proto = Object.create(HTMLElement.prototype)

    proto.createdCallback = function () {

        jui2.ui.base.proto.createdCallback.call(this, jui2.ui.selectField);

        var $self = $(this),
            self = this,
            label = label || '',
            type = $self.attr('type') || 'text';

        this.jui2 = {
            disabled: false,
            multipleSelect: false,
            multipleSelectStatus: false
        }

        if (this.innerHTML.trim() == '')
            this.innerHTML = label

        this.innerHTML = jui2.tmpl['selectField']({
            label: this.innerHTML,
            type: type
        });

        $self.addClass('j-ui-flex').children().eq(0).click(function () {
            $(this).next().focus();
        })

        for (var i in jui2.method) {
            this[i] = jui2.method[i];
        }

        self.items = $self.children('.j-pop')

        self.items.appendTo('body')

        self.items.on('click', '> div', function () {
            var $el = $(this)
            if (self.jui2.multipleSelectStatus == false) {
                self.items.hide();
                $self.attr('data-value', $el.attr('data-value'))
                $self.children('.j-input-field').html($el.children().eq(1).html())
                $(self).triggerHandler('select')
            } else {
                if ($el.children('.j-select-multiple.fa-square-o').length > 0)
                    $el.children('.j-select-multiple.fa-square-o').removeClass('fa-square-o').addClass('fa-check-square-o')
                else
                    $el.children('.j-select-multiple.fa-check-square-o').removeClass('fa-check-square-o').addClass('fa-square-o')

                var elSelected = $el.parent().children('div').filter(function (i) {
                    return $(this).children('.j-select-multiple.fa-check-square-o').length > 0
                }).toArray()

                $self.attr('data-value', JSON.stringify(elSelected.reduce(function (val, el) {
                    return val.concat([$(el).attr('data-value')])
                }, [])))

                $self.children('.j-input-field').html(elSelected.reduce(function (val, el) {
                    return val.concat([$(el).children('div').text()])
                }, []).join(', '))
                $(self).triggerHandler('select')
            }
        })

        self.jui_popper = new Popper($self.children('.j-input-field'), self.items[0], {
            placement: 'bottom-start',
            modifiers: {
                flip: {
                    enabled: true
                }
            },
            eventsEnabled: false
        })

        $self.on('click', '> .j-input-field', function () {
            if (self.jui2.multipleSelectStatus == false && self.jui2.disabled == false) {
                self.items.toggle()
                self.jui_popper.update()
            }
        })

        $('body').click(function (e) {
            if ($(e.target).parents('.j-pop').length == 0 && $(e.target).closest('#' + self.juiid).length == 0 && self.jui2.multipleSelectStatus == false) {
                self.items.hide()
            }
        })

        $self.on('click', ' > .j-selectfield-multiple-toggle', function () {
            if(!self.jui2.disabled){
                self.jui2.multipleSelectStatus = self.jui2.multipleSelectStatus == true ? false : true;
                if (self.jui2.multipleSelectStatus) {
                    self.items.insertAfter($self.children('.j-input-field')).show()
                    self.jui_popper.destroy()
                    $self.children('.j-input-field').hide()
                    self.generate(function(){
                        var val = $self.val()
                        self.items.children('div').filter(function(i){
                            return $(this).attr('data-value') == val
                        }).click()
                    })
                } else {

                    var selected = $(self.items.children('div').filter(function (i) {
                        return $(this).children('.j-select-multiple.fa-check-square-o').length > 0
                    }).toArray()[0])

                    $self.children('.j-input-field').html(selected.text())

                    $self.attr('data-value', selected.attr('data-value'));

                    self.items.appendTo('body').hide()
                    self.jui_popper = new Popper($self.children('.j-input-field'), self.items[0], {
                        placement: 'bottom-start',
                        modifiers: {
                            flip: {
                                enabled: true
                            }
                        },
                        eventsEnabled: false
                    })
                    $self.children('.j-input-field').show()
                    self.generate()
                }
            }
        })

        this.attrChangedCb(['disabled', 'icon', 'placeholder', 'readonly', 'width', 'mandatory', 'autocomplete', 'autocompletefilter'])

        /**
         * Set and get widget value
         * @param {mixed} value can be empty
         * @returns {mixed}
         * @method val
         * @memberof selectField
         * @instance
         * @example <caption>nopreview</caption>
         * var value = $('#myWidget').val() // will return widget's value to variable value
         * @example <caption>nopreview</caption>
         * $('#myWidget').val('myValue') // will set widget's value to 'myValue'
         */

        /*Object.defineProperty(this.__proto__, 'value', {
            get: function () {
                return $(this).attr('data-value') || '';
            },
            set: function (value) {
                $(this).attr('data-value', value);
                var text = this.items.children('[data-value="' + value + '"]').html() || ''
                $(this).children('.j-input-field').html(text)
                $(this).triggerHandler('select')
                return value;
            }
        });*/

        if (self.setup) {
            self.setup();
        }

    };

    proto.val = function (value) {
        if (value) {
            $(this).attr('data-value', value);
            if (this.items.children().length == 0) {
                this.deferredSelect = value;
                return value;
            } else {
                var text = this.items.children('[data-value="' + value + '"]').html() || '';
                $(this).children('.j-input-field').html(text)
                $(this).triggerHandler('select')

                return $(this).attr('data-value');
            }
        } else {

            if (this.jui2.multipleSelectStatus == true) {
                return JSON.parse($(this).attr('data-value'));

            } else {
                return $(this).attr('data-value') || '';
            }
        }
    }

    /*

        proto.addAutocompleteList = function (txt) {
            var $el = $(this)
            if (!localStorage.getItem('jui2list' + $(this).attr('id'))) localStorage.setItem('jui2list' + $(this).attr('id'), JSON.stringify([]));
            var db = JSON.parse(localStorage.getItem("jui2list" + $(this).attr('id'))),
                add = true;
            $.each(db, function (i, val) {
                if (val == txt)
                    add = false
            })
            if (add) {
                db.push(txt);
                $('#jui2list' + $el.attr('id')).remove();
                $('<datalist id="jui2list' + $el.attr('id') + '">').appendTo('body')
                $.each(db, function (i, val) {
                    if ($el.attr('autocompletefilter') != undefined) {
                        if (val[1] == $el.attr('autocompletefilter'))
                            $('#jui2list' + $el.attr('id')).append('<option value="' + val[0] + '">')
                    } else {
                        $('#jui2list' + $el.attr('id')).append('<option value="' + val + '">')
                    }
                })
                localStorage.setItem('jui2list' + $(this).attr('id'), JSON.stringify(db));
            }
        }*/

    proto.generateData = function (data) {
        this.items.html(jui2.tmpl[this.jui2.multipleSelectStatus ? 'selectMultipleItem' : 'selectItem']({
            rows: data
        }))

        $(this).triggerHandler('itemsafterdraw');

        if (this.deferredSelect) {
            var text = this.items.children('[data-value="' + this.deferredSelect + '"]').html() || '';
            $(this).attr('data-value', this.deferredSelect);
            $(this).children('.j-input-field').html(text);
            $(this).triggerHandler('select');
            delete this.deferredSelect;
        }
    }

    proto.attachedCallback = function () {
        for (var i in this.attributes) {
            var attrName = this.attributes[i].nodeName,
                newVal = this.attributes[i].nodeValue;
            if (jui2.attrChange[this.tagName.toLowerCase() + '_' + attrName])
                jui2.attrChange[this.tagName.toLowerCase() + '_' + attrName](this, false, newVal);
            else if (jui2.attrChange[attrName] && this.enabledAttrChange.indexOf(attrName) > -1)
                jui2.attrChange[attrName](this, false, newVal);
        }
        $(this).triggerHandler('afterdraw')
    }

    proto.detachedCallback = function () {
        $(this.items).remove()
    }

    proto.attributeChangedCallback = function (attrName, oldVal, newVal) {
        if (jui2.attrChange[this.tagName.toLowerCase() + '_' + attrName])
            jui2.attrChange[this.tagName.toLowerCase() + '_' + attrName](this, false, newVal);
        else if (jui2.attrChange[attrName] && this.enabledAttrChange.indexOf(attrName) > -1)
            jui2.attrChange[attrName](this, false, newVal);
    }

    proto.generate = function () {

    }

    jui2.attrChange['j-selectfield_no-label'] = function (el, oldVal, newVal) {
        if (newVal != null) {
            $(el).children('label').remove()
        }
        /* else {

                }*/
    }

    jui2.attrChange['j-selectfield_src-array'] = function (el, oldVal, newVal) {
        if (newVal != null) {
            el.generate = function (cb) {
                var data = eval(newVal);
                el.generateData(data)
                if (el.attributes['data-value']) {
                    var value = el.attributes['data-value'].nodeValue
                    value = data.filter(function (val) {
                        return val[0] == value
                    });

                    $(el).children('.j-input-field').html(value[0][1])
                }
                if (cb)
                    cb()
            }
            el.generate()
        } else {
            el.generate = function () {}
        }
    }

    jui2.attrChange['j-selectfield_src-fn'] = function (el, oldVal, newVal) {
        var $el = $(el)
        if (newVal != null) {
            el.generate = function (cb) {
                eval(newVal).call(function (value) {
                    $el.children('.j-input-field').html(value)
                    if (cb)
                        cb()
                })
            }
            el.generate()
        } else {
            el.generate = function () {}
        }
    }

    jui2.attrChange['j-selectfield_multiple-select'] = function (el, oldVal, newVal) {
        var $el = $(el)
        if (newVal != null) {
            el.jui2.multipleSelect = eval(newVal)

        } else {
            el.jui2.multipleSelect = false
        }

        if (el.jui2.multipleSelect) {
            $el.children('.j-selectfield-multiple-toggle').remove()
            $el.append('<i class="fa fa-plus-square-o j-selectfield-multiple-toggle" style="width: 32px; text-align: center; cursor: pointer; line-height: 24px;"></i>')
        }
    }

    jui2.ui.selectField = {
        widget: document.registerElement('j-selectfield', {
            prototype: proto
        }),
        proto: proto
    }

}(jQuery));
