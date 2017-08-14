/**
 * @classdesc TextField custom web component
 * @class textField
 * @property {string} icon Button icon, using font awesome. Ex. fa-calendar etc. For icon list see <a href="">http://fortawesome.github.io/Font-Awesome/icons/</a>
 * @example <caption>Basic usage: <br/><j-textfield>Username</j-textfield></caption>
 * <j-textfield>Username</j-textfield>
 * @example <caption>Textfield with icon: <br/><j-textfield icon="fa-user">Username</j-textfield></caption>
 * <j-textfield icon="fa-user">Username</j-textfield>
 */

(function($) {
	/** @constructor */
	var proto = Object.create(HTMLElement.prototype)

	proto.createdCallback = function() {

		jui2.ui.base.proto.createdCallback.call(this, jui2.ui.textField);

		var $self = $(this),
			label = label || '',
			type = $self.attr('type') || 'text';

		if (this.innerHTML.trim() == '')
			this.innerHTML = label

		this.innerHTML = jui2.tmpl['textField']({
			label: this.innerHTML,
			type: type
		});

		$self.children().eq(0).click(function() {
			$(this).next().focus();
		})

		for (i in jui2.method) {
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

		Object.defineProperty(this.__proto__, 'value', {
			configurable: true,
			get: function() {
				if ($(this).children('input')[0])
					return $(this).children('input')[0].value;
				else
					return '';
			},
			set: function(value) {
				if ($(this).children('input')[0])
					$(this).children('input')[0].value = value;
				return $(this).children('input')[0].value
			}
		});

	};

	proto.addAutocompleteList = function(txt) {
		var $el = $(this)
		if (!localStorage.getItem('jui2list' + $(this).attr('id'))) localStorage.setItem('jui2list' + $(this).attr('id'), JSON.stringify([]));
		var db = JSON.parse(localStorage.getItem("jui2list" + $(this).attr('id')));
		add = true;
		$.each(db, function(i, val) {
			if (val == txt)
				add = false
		})
		if (add) {
			db.push(txt);
			$('#jui2list' + $el.attr('id')).remove();
			$('<datalist id="jui2list' + $el.attr('id') + '">').appendTo('body')
			$.each(db, function(i, val) {
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

	proto.attachedCallback = function() {
		for (i in this.attributes) {
			var attrName = this.attributes[i].nodeName,
				newVal = this.attributes[i].nodeValue;
			if (jui2.attrChange[this.tagName.toLowerCase() + '_' + attrName])
				jui2.attrChange[this.tagName.toLowerCase() + '_' + attrName](this, false, newVal);
			else if (jui2.attrChange[attrName] && this.enabledAttrChange.indexOf(attrName) > -1)
				jui2.attrChange[attrName](this, false, newVal);
		}
		$(this).triggerHandler('afterdraw')
	}

	proto.attributeChangedCallback = function(attrName, oldVal, newVal) {
		if (jui2.attrChange[this.tagName.toLowerCase() + '_' + attrName])
			jui2.attrChange[this.tagName.toLowerCase() + '_' + attrName](this, false, newVal);
		else if (jui2.attrChange[attrName] && this.enabledAttrChange.indexOf(attrName) > -1)
			jui2.attrChange[attrName](this, false, newVal);
	}

	jui2.ui.textField = {
		widget: document.registerElement('j-textfield', {
			prototype: proto
		}),
		proto: proto
	}

}(jQuery));
