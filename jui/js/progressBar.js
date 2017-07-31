
 /**
  * @classdesc Progress Bar custom web component
  * @class progressBar
  * @property {string} value Button icon, using font awesome. Ex. fa-calendar etc. For icon list see <a href="">http://fortawesome.github.io/Font-Awesome/icons/</a>
  * @example <caption>Basic usage: <br/><j-textfield>Username</j-textfield></caption>
  * <j-textfield>Username</j-textfield>
  * @example <caption>Textfield with icon: <br/><j-textfield icon="fa-user">Username</j-textfield></caption>
  * <j-textfield icon="fa-user">Username</j-textfield>
  */

(function($){
	/** @constructor */
	var proto = Object.create(HTMLElement.prototype)

	proto.createdCallback = function(label, type) {

		jui2.ui.base.proto.createdCallback.call(this, jui2.ui.progressBar);

		var $self = $(this);

		$self.append(jui2.tmpl['progressBar']()).addClass("j-ui j-progress j-background-transparent j-height-s j-radius-s j-padding-s").css("width", "100%");

		this.attrChangedCb(['disabled'])

		/**
		 * Set and get widget value
		 * @param {mixed} value can be empty
		 * @returns {mixed}
		 * @method val
		 * @memberof progressBar
		 * @instance
		 * @example <caption>nopreview</caption>
		 * var value = $('#myWidget').val() // will return widget's value to variable value
		 * @example <caption>nopreview</caption>
		 * $('#myWidget').val('myValue') // will set widget's value to 'myValue'
		 */
		/*Object.defineProperty(this.__proto__, 'value', {
			configurable: true,
			writable: true,
			set: function(value){
				this.pgValue = isNaN(value) ? exprEval.Parser.evaluate(value+" * 100 ") : value;
				$(this).children().css('width', this.pgValue+"%");
				return this.pgValue;
			}
		});*/

	};
	
	proto.attachedCallback = function(){
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

	proto.attributeChangedCallback = function(attrName, oldVal, newVal){
		for (i in this.attributes) {
            var attrName = this.attributes[i].nodeName,
                newVal = this.attributes[i].nodeValue;
            if (jui2.attrChange[this.tagName.toLowerCase() + '_' + attrName])
                jui2.attrChange[this.tagName.toLowerCase() + '_' + attrName](this, false, newVal);
            else if (jui2.attrChange[attrName] && this.enabledAttrChange.indexOf(attrName) > -1)
                jui2.attrChange[attrName](this, false, newVal);
        }
	}

	jui2.ui.progressBar = {
		widget: document.registerElement('j-progressBar',  {
			prototype: proto
		}),
		proto: proto
	}
	
	jui2.attrChange['j-progressbar_value'] = function (el, oldVal, newVal) {
		if(newVal){
			el.pgValue = isNaN(newVal) ? exprEval.Parser.evaluate(newVal+" * 100 ") : newVal;
			$(el).children().css('width', el.pgValue+"%");
			var val = 5;
			if(el.pgValue > 5)
				val = 25
			if(el.pgValue > 25)
				val = 50
			if(el.pgValue > 50)
				val = 75
			if(el.pgValue > 75)
				val = 100
			$(el).children().removeClass("j-progress-bar-5")
			$(el).children().removeClass("j-progress-bar-25")
			$(el).children().removeClass("j-progress-bar-50")
			$(el).children().removeClass("j-progress-bar-75")
			$(el).children().removeClass("j-progress-bar-100")
			$(el).children().addClass("j-progress-bar-"+val)
		}
	}

}(jQuery))
;
