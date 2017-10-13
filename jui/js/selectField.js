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
            self.items.hide();
            $self.attr('data-value', $el.attr('data-value'))
            $self.children('.j-input-field').html($el.children().eq(1).html())
            $(self).triggerHandler('select')
        })

        self.jui_popper = new Popper($self.children('.j-input-field'), self.items[0], {
            placement: 'bottom-start',
            modifiers: {
                flip: {
                    enabled: false
                }
            }
        })

        $self.on('click', function () {
            self.items.toggle()
        })

        $('body').click(function (e) {
            if ($(e.target).parents('.j-pop').length == 0 && $(e.target).closest('#' + self.juiid).length == 0) {
                self.items.hide()
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
            return $(this).attr('data-value') || '';
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
        this.items.html(jui2.tmpl['selectItem']({
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

    jui2.attrChange['j-selectfield_no-label'] = function (el, oldVal, newVal) {
        if (newVal != null) {
            $(el).children('label').remove()
        }
        /* else {

                }*/
    }

    jui2.attrChange['j-selectfield_src-array'] = function (el, oldVal, newVal) {
        if (newVal != null) {
            var data = eval(newVal);
            el.generateData(data)
        }
        /* else {

                }*/
    }

    jui2.attrChange['j-selectfield_src-fn'] = function (el, oldVal, newVal) {
        if (newVal != null) {
            eval(newVal).call()
        }
        /* else {

                }*/
    }

    jui2.ui.selectField = {
        widget: document.registerElement('j-selectfield', {
            prototype: proto
        }),
        proto: proto
    }

}(jQuery));
