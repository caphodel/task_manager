/**
 * @classdesc TextField custom web component
 * @class textField
 * @property {string} icon Button icon, using font awesome. Ex. fa-calendar etc. For icon list see <a href="">http://fortawesome.github.io/Font-Awesome/icons/</a>
 * @example <caption>Basic usage: <br/><j-textfield>Username</j-textfield></caption>
 * <j-textfield>Username</j-textfield>
 * @example <caption>Textfield with icon: <br/><j-textfield icon="fa-user">Username</j-textfield></caption>
 * <j-textfield icon="fa-user">Username</j-textfield>
 */

/*global jui2 localStorage document Object jQuery HTMLElement*/

(function ($) {
    /** @constructor */
    var proto = Object.create(HTMLElement.prototype)

    proto.createdCallback = function () {

        jui2.ui.base.proto.createdCallback.call(this, jui2.ui.textField);

        var $self = $(this),
            self = this,
            label = label || '',
            type = $self.attr('type') || 'text';

        if (this.innerHTML.trim() == '')
            this.innerHTML = label

        this.innerHTML = jui2.tmpl['textField']({
            label: this.innerHTML,
            type: type
        });

        $self.addClass('j-ui-flex j-form-field').children().eq(0).click(function () {
            $(this).next().focus();
        })

        for (var i in jui2.method) {
            this[i] = jui2.method[i];
        }

        this.attrChangedCb(['disabled', 'icon', 'placeholder', 'readonly', 'width', 'mandatory', 'autocomplete', 'autocompletefilter'])

        /**
         * Set and get widget value
         * @param {mixed} value can be empty
         * @returns {mixed}
         * @method val
         * @memberof textField
         * @instance
         * @example <caption>nopreview</caption>
         * var value = $('#myWidget').val() // will return widget's value to variable value
         * @example <caption>nopreview</caption>
         * $('#myWidget').val('myValue') // will set widget's value to 'myValue'
         */

        /*Object.defineProperty(this.__proto__, 'value', {
            configurable: true,
            get: function () {
                if ($(this).children('input')[0])
                    return $(this).children('input')[0].value;
                else
                    return '';
            },
            set: function (value) {
                if ($(this).children('input')[0])
                    $(this).children('input')[0].value = value;
                return $(this).children('input')[0].value
            }
        });*/

        if (self.setup) {
            self.setup();
        }

    };

    proto.val = function (value) {
        if (value) {
            if ($(this).children('input')[0])
                $(this).children('input')[0].value = value;
            return $(this).children('input')[0].value
        } else {
            if ($(this).children('input')[0])
                return $(this).children('input')[0].value;
            else
                return '';
        }
    }

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
        if(this.deferredValue){
            $(this).children('input')[0].value = value
        }
        if(this.attributes['data-value']){
            $(this).children('input')[0].value = this.attributes['data-value'].nodeValue
        }
    }

    proto.attributeChangedCallback = function (attrName, oldVal, newVal) {
        if (jui2.attrChange[this.tagName.toLowerCase() + '_' + attrName])
            jui2.attrChange[this.tagName.toLowerCase() + '_' + attrName](this, false, newVal);
        else if (jui2.attrChange[attrName] && this.enabledAttrChange.indexOf(attrName) > -1)
            jui2.attrChange[attrName](this, false, newVal);
    }

	jui2.attrChange['j-textfield_add-tag'] = function(el, oldVal, newVal) {
		if (newVal != null) {
			var $el = $(el),
				$pop = $('<div class="j-select-items j-pop" id="' + $el.prop('id') + '-pop" tabindex="1">')
			$('#' + $el.prop('id') + '-pop').remove()
			$('body').append($pop)
			$el.items = $pop;
			$el.children('.j-input-field').keypress(function(e) {
				var key = e.keyCode || e.charCode;
				if ($el.children('span').length == 0)
					return false
				else {
					if (key == 8 || key == 46) {
						if (key == 8 && $(this).val() == "") {
							$el.children('span').remove()
							return false;
						}
					}
				}
			}).click(function() {
				if ($el.children('span').length == 0) {
					$el.items.toggle()
					$el.jui_popper.update()
					$el.items.focus()
				}
			});
			$el.jui_popper = new Popper($el.children('.j-input-field'), $pop, {
				placement: 'bottom-start',
				modifiers: {
					flip: {
						enabled: true
					}
				},
				eventsEnabled: false
			})
			$el.items.html(jui2.tmpl['selectItem']({
				rows: newVal.split(';').map(function(data) {
					return [data, data]
				})
			}))
			$el.children('.j-input-field').on('keypress', function(e) {
				var key = e.keyCode || e.charCode;
				if (key == 13) {
					if ($el.children('span').length > 0) {
						$('#'+$el.attr('tag-target')).append('<label clas="j-label">'+$el.children('span').text()+'</label>'+'<input value="'+$el.val()+'"></input>')
						$el.val('')
						$el.children('span').remove()
						$el.attr('style', '')
					}
				}
			})
			$el.items.on('click', ' > div', function(e) {
				var $val = $(this);
				$('<span>' + $val.attr('data-value') + '</span>').insertBefore($el.children('.j-input-field'))
				$el.items.hide()
				$el.children('.j-input-field').css('border-left', '0').css('border-radius', '0 3px 3px 0')
				$el.children('.j-input-field').focus()
			})
			$('body').on('keypress.' + $el.items.prop('id'), function(e) {
				var key = e.keyCode || e.charCode;
				if ($el.items.is(':visible')) {
					if (key == 40) {
						e.preventDefault()
						if ($el.items.children('.active').length == 0)
							$el.items.children().eq(0).addClass('active')
						else {
							if ($el.items.children('.active').next().length)
								$el.items.children('.active').removeClass('active').next().addClass('active')
						}
					} else if (key == 38) {
						e.preventDefault()
						if ($el.items.children('.active').length == 0)
							$el.items.children().eq(0).addClass('active')
						else {
							if ($el.items.children('.active').prev().length)
								$el.items.children('.active').removeClass('active').prev().addClass('active')
						}
					} else if (key == 13) {
						var $val = $el.items.children('.active');
						$('<span>' + $val.attr('data-value') + '</span>').insertBefore($el.children('.j-input-field'))
						$el.items.hide()
						$el.children('.j-input-field').css('border-left', '0').css('border-radius', '0 3px 3px 0')
						$el.children('.j-input-field').focus()
					}
				}
			})
			$('body').on('click.pop' + $el.prop('id'), function(e) {
				if ($(e.target).parents('.j-pop').length == 0 && $(e.target).closest('#' + $el.prop('id')).length == 0) {
					$el.items.hide()
				}
				if ($('#' + $el.prop('id')).length == 0) {
					$('#' + $el.prop('id') + '-pop').remove()
					$el.children('.j-input-field').off('keypress')
					$('body').off('click.pop' + $el.prop('id'))
					$('body').off('keypress.' + $el.items.prop('id'))
				}
			})
		} else {
			$('#' + $el.prop('id') + '-pop').remove()
			$el.children('.j-input-field').off('keypress')
			$('body').off('click.pop' + $el.prop('id'))
			$('body').off('keypress.' + $el.items.prop('id'))
		}
	}

    jui2.attrChange['j-textfield_no-label'] = function (el, oldVal, newVal) {
        if (newVal != null) {
            $(el).children('label').remove()
        }
        /* else {

                }*/
    }

    jui2.ui.textField = {
        widget: document.registerElement('j-textfield', {
            prototype: proto
        }),
        proto: proto
    }

}(jQuery));
