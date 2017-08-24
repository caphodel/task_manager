/**
 * @classdesc Table custom web component
 * @class table
 * @example <caption>Basic table</caption>
 * <j-table>[["column1", "column2"], ["data1", "data2"]]</j-table>
 */
(function($){
	/** @constructor */
	var proto = Object.create(HTMLElement.prototype)

	proto.createdCallback = function() {

		jui2.ui.base.proto.createdCallback.call(this, jui2.ui.table);

		var $self = $(this), regxp = /<(.|\n)*?>(.|\n)*?<\/(.|\n)*?>/ig, data = [];

		var text = $('<div>' + this.innerHTML + '</div>');
		text.children().remove()

		if (text[0].innerHTML.trim().replace(regxp, '') == "")
			data = [];
		else
			data = JSON.parse(text[0].innerHTML.replace(regxp, ''));

		this.innerHTML = jui2.tmpl['tableBase']();

		this.attrChangedCb(['disabled', 'icon'])

		for(i in jui2.method){
			this[i] = jui2.method[i];
		}
	};

	proto.addHeader = function(arrHeader){
		var $el = $(this), self = this, $headerContainer = self.getHeaderContainer(), header = jui2.tmpl['tableHeader']({columns: arrHeader});

		$headerContainer.append(header);

		return $(header);
	}

	proto.getHeaderContainer = function(){
		var $el = $(this)
		return $el.find('.j-table .j-table-head');
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

	jui2.ui.table = {
		widget: document.registerElement('j-table',  {
			prototype: proto
		}),
		proto: proto
	}

}(jQuery))
;
