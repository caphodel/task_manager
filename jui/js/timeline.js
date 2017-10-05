/**
 * @classdesc Timeline custom web component
 * @class timeline
 * @example <caption>Basic timeline</caption>
 * <j-timeline>My Timeline</j-timeline>
 * @example <caption>Timeline with different color</caption>
 * <j-timeline color="blue">My Timeline</j-timeline>
 * @example <caption>Timeline with icon</caption>
 * <j-timeline icon="fa-calendar">My Timeline</j-timeline>
 */
(function($){
	/** @constructor */
	var proto = Object.create(HTMLElement.prototype)

	proto.createdCallback = function() {

		jui2.ui.base.proto.createdCallback.call(this, jui2.ui.timeline);

		var $self = $(this)

		this.iconPosition = 'afterBegin';

		$self.attr('tabindex', 0).addClass('j-ui');

        $self.children().each(function(i, val){
            if($(val).children('.j-timeline-point').length == 0){
                $(val).append('<div class="j-timeline-point"></div>')
            }
        })

		for(i in jui2.method){
			this[i] = jui2.method[i];
		}
	};

    proto.append = function(el){
        $(this).append(el);

        $(this).children().each(function(i, val){
            if($(val).children('.j-timeline-point').length == 0){
                $(val).append('<div class="j-timeline-point"></div>')
            }
        })
    }

	proto.attributeChangedCallback = function(attrName, oldVal, newVal){
		/*var attr = this.timelineName.toLowerCase()+'_'+attrName;
		if(jui2.attrChange[attr])
			jui2.attrChange[attr](this, oldVal, newVal);
	    else if(jui2.attrChange[attrName] && this.enabledAttrChange.indexOf(attrName) > -1)
	      jui2.attrChange[attrName](this, oldVal, newVal);*/
		this.attrChangedCb(false, attrName, oldVal, newVal)
	}

   /**
 	* Fires when timeline clicked
 	* @event click
 	* @memberof timeline
 	* @example
 	* <j-timeline id="myTimeline">My Timeline</j-timeline>
 	* <script>
 	* $('#myTimeline').on('click', function(value){
 	* 	console.log('Timeline clicked') //will print 'Timeline clicked' in javascript console
 	* })
 	* </script>
 	*/
	jui2.ui.timeline = {
		widget: document.registerElement('j-timeline',  {
			prototype: proto
		}),
		proto: proto
	}

}(jQuery))
;
