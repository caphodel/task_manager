/**
 * @classdesc Tag custom web component
 * @class tag
 * @example <caption>Basic tag</caption>
 * <j-tag>My Tag</j-tag>
 * @example <caption>Tag with different color</caption>
 * <j-tag color="blue">My Tag</j-tag>
 * @example <caption>Tag with icon</caption>
 * <j-tag icon="fa-calendar">My Tag</j-tag>
 */
(function($){
	/** @constructor */
	var proto = Object.create(HTMLElement.prototype)

	proto.createdCallback = function() {

		jui2.ui.base.proto.createdCallback.call(this, jui2.ui.tag);

		var $self = $(this)

		this.iconPosition = 'afterBegin';

		$self.attr('tabindex', 0).addClass('j-ui j-tag').append('<i class="fa fa-close"></i>');

        $self.children('.fa-close').on('click', function(){
            $self.triggerHandler('close');
            $self.remove();
        })

		for(i in jui2.method){
			this[i] = jui2.method[i];
		}
	};

	proto.attributeChangedCallback = function(attrName, oldVal, newVal){
		/*var attr = this.tagName.toLowerCase()+'_'+attrName;
		if(jui2.attrChange[attr])
			jui2.attrChange[attr](this, oldVal, newVal);
	    else if(jui2.attrChange[attrName] && this.enabledAttrChange.indexOf(attrName) > -1)
	      jui2.attrChange[attrName](this, oldVal, newVal);*/
		this.attrChangedCb(false, attrName, oldVal, newVal)
	}

   /**
 	* Fires when tag clicked
 	* @event click
 	* @memberof tag
 	* @example
 	* <j-tag id="myTag">My Tag</j-tag>
 	* <script>
 	* $('#myTag').on('click', function(value){
 	* 	console.log('Tag clicked') //will print 'Tag clicked' in javascript console
 	* })
 	* </script>
 	*/
	jui2.ui.tag = {
		widget: document.registerElement('j-tag',  {
			prototype: proto
		}),
		proto: proto
	}

}(jQuery))
;
