/**
 * @classdesc DateField custom web component
 * @class dateField
 * @property {string} icon Button icon, using font awesome. Ex. fa-calendar etc. For icon list see <a href="">http://fortawesome.github.io/Font-Awesome/icons/</a>
 * @example <caption>Basic usage: <br/><j-datefield>Username</j-datefield></caption>
 * <j-datefield>Username</j-datefield>
 * @example <caption>Textfield with icon: <br/><j-datefield icon="fa-user">Username</j-datefield></caption>
 * <j-datefield icon="fa-user">Username</j-datefield>
 */

/*global jui2 localStorage document Object jQuery HTMLElement Popper*/

(function ($) {
    /** @constructor */
    var proto = Object.create(HTMLElement.prototype)

    proto.createdCallback = function () {

        jui2.ui.base.proto.createdCallback.call(this, jui2.ui.dateField);

        var $self = $(this),
            self = this,
            label = label || '',
            type = $self.attr('type') || 'text';

        if (this.innerHTML.trim() == '')
            this.innerHTML = label

        this.innerHTML = jui2.tmpl['dateField']({
            label: this.innerHTML,
            type: type
        });

        self.jui2 = {
            disabled: false
        }

        $self.addClass('j-ui-flex j-form-field').children().eq(0).click(function () {
            $(this).next().focus();
        })

        for (var i in jui2.method) {
            this[i] = jui2.method[i];
        }

		if(!$self.attr('format')){
			$self.attr('format', 'DD/MM/YYYY')
		}

        self.format = $self.attr('format');

        self.items = $self.children('.j-pop')

        self.items.appendTo('body')

        self.items.on('click', '> div td', function () {
            var $el = $(this)
            self.items.hide();
            $self.attr('data-value', $el.attr('data-value'))
            $self.children('.j-input-field').html($el.attr('data-value'))
            $(self).triggerHandler('select')
        })

        self.items.on('click', '.fa-chevron-right', function () {
            var $el = $(this)
            self.show(moment($el.parent().children('span').text(), 'MMM YYYY').add(1, 'month').format(self.format), self.format)
        })

        self.items.on('click', '.fa-chevron-left', function () {
            var $el = $(this)
            self.show(moment($el.parent().children('span').text(), 'MMM YYYY').subtract(1, 'month').format(self.format), self.format)
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

        $self.on('click', function () {
            if(!self.jui2.disabled){
                self.show(false, self.format)
                self.items.toggle()
                self.jui_popper.update()
            }
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
         * @memberof dateField
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
                $(this).triggerHandler('date')
                return value;
            }
        });*/

        if (self.setup) {
            self.setup();
        }

    };

    proto.getArrayofDate = function (dt, format) {
        var start = moment(dt, format).startOf('month').startOf('week');
        var end = moment(dt, format).endOf('month').endOf('week');
        var today = moment(dt, format);

        var days = [];
        var day = start;

        while (day <= end) {
            days.push([day.format(format), day.format('DD'), today.isSame(day, 'month')]);
            day = day.clone().add(1, 'd');
        }

        return days
    }

    proto.val = function (value) {
        if (value) {
            $(this).attr('data-value', value);
            if (this.items.children().length == 0) {
                this.deferredDate = value;
                return value;
            } else {
                var text = this.items.children('[data-value="' + value + '"]').html() || '';
                $(this).children('.j-input-field').html(text)
                $(this).triggerHandler('date')
                return $(this).attr('data-value');
            }
        } else {
            return $(this).attr('data-value') || '';
        }
    }

    proto.show = function(dt, format){
        format = format || this.format
        dt = dt || $(this).val() || moment().format(format)
        var self = this;
        var date = this.getArrayofDate(dt, format)

        var i = 0;
        var el = '<table><tr>'+date.reduce(function(data, val){
            i++;
            if(i==8){
                i = 1
                return data+'</tr><tr><td data-value="'+val[0]+'" data-thismonth="'+val[2]+'">'+val[1]+'</td>'
            }
            else{
                return data+'<td data-value="'+val[0]+'" data-thismonth="'+val[2]+'">'+val[1]+'</td>'
            }
        }, '')+'</tr></table>'
        self.items.find('.j-date-items-header > span').text(moment(dt, format).format('MMM YYYY'))
        self.items.find('.j-date-items-container').empty().append(el);
    }

    proto.generateData = function (data) {
        this.items.html(jui2.tmpl['dateItem']({
            rows: data
        }))

        $(this).triggerHandler('dateitemafterdraw');
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
        if(this.attributes['data-value']){
            $(this).children('.j-input-field').text(this.attributes['data-value'].nodeValue)
        }
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

    jui2.attrChange['j-datefield_no-label'] = function (el, oldVal, newVal) {
        if (newVal != null) {
            $(el).children('label').remove()
        }
        /* else {

                }*/
    }

    jui2.ui.dateField = {
        widget: document.registerElement('j-datefield', {
            prototype: proto
        }),
        proto: proto
    }

}(jQuery));
