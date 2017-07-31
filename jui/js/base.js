
/**
 * @classdesc base for all custom web component
 * @class base
 */

(function($) {
  /** @constructor */
  var proto = Object.create(HTMLElement.prototype);

  proto.createdCallback = function(pr) {
		var ext, $this = $(this), self = this;
    this.enabledAttrChange = this.enabledAttrChange || [];
    if(pr){
      if(pr.extension !== undefined){
        ext = pr.extension;
        if(ext.length>0){
          for(var i in ext){
            ext[i](this);
          }
        }
      }
    }

    if($this.attr('onafterdraw'))
      $this.on('afterdraw', function(e){
        window[$this.attr('onafterdraw')].call(this, e);
      });

    this.attrChangedCb = function(enabledAttrChange, attrName, oldVal, newVal){
      if(enabledAttrChange){
        self.enabledAttrChange = $.unique(self.enabledAttrChange.concat(enabledAttrChange));

    		for(i in self.attributes){
    			var attrName = self.attributes[i].nodeName,
    			newVal = self.attributes[i].nodeValue, attr = self.tagName.toLowerCase()+'_'+attrName;
    			if(jui2.attrChange[attr])
    				jui2.attrChange[attr](self, false, newVal);
    			else if(jui2.attrChange[attrName] && self.enabledAttrChange.indexOf(attrName) > -1)
    	      jui2.attrChange[attrName](self, false, newVal);
    		}
      }
      else{
    		var attr = self.tagName.toLowerCase()+'_'+attrName;
    		if(jui2.attrChange[attr])
    			jui2.attrChange[attr](self, oldVal, newVal);
  	    else if(jui2.attrChange[attrName])
  	      jui2.attrChange[attrName](self, oldVal, newVal);
      }
  	}

    //add id if not set
    if(!$this.attr('id')){
      $this.attr('id', 'j-'+jui2.random(8, 'aA#'));
    }

    this.juiid = jui2.random(8, 'aA#');

    if(pr)
      if(!pr.extension){
        pr.extension = [];
      }
  };

  jui2.ui.base = {
    widget: document.registerElement('j-base', {
      prototype: proto
    }),
    proto: proto,
    extension: []
  };

}(jQuery))
;
