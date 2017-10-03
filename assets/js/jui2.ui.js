/****js/core.js****/
/**
 * @namespace jui2
 * @global
 */
var jui2 = jui2 || {
	ui: {},
	lang: {},
	chart: {}
};



// Which HTML element is the target of the event
function mouseTarget(e) {
	var targ;
	if (!e) var e = window.event;
	if (e.target) targ = e.target;
	else if (e.srcElement) targ = e.srcElement;
	if (targ.nodeType == 3) // defeat Safari bug
		targ = targ.parentNode;
	return targ;
}

// Mouse position relative to the document
// From http://www.quirksmode.org/js/events_properties.html
function mousePositionDocument(e) {
	var posx = 0;
	var posy = 0;
	if (!e) {
		var e = window.event;
	}
	if (e.pageX || e.pageY) {
		posx = e.pageX;
		posy = e.pageY;
	}
	else if (e.clientX || e.clientY) {
		posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
		posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
	}
	return {
		x : posx,
		y : posy
	};
}

// Find out where an element is on the page
// From http://www.quirksmode.org/js/findpos.html
function findPos(obj) {
	var curleft = curtop = 0;
	if (obj.offsetParent) {
		do {
			curleft += obj.offsetLeft;
			curtop += obj.offsetTop;
		} while (obj = obj.offsetParent);
	}
	return {
		left : curleft,
		top : curtop
	};
}

// Mouse position relative to the element
// not working on IE7 and below
function mousePositionElement(e, target) {
	var mousePosDoc = mousePositionDocument(e);
	//var target = mouseTarget(e);
	var targetPos = findPos(target);
	var posx = mousePosDoc.x - targetPos.left;
	var posy = mousePosDoc.y - targetPos.top;
	return {
		x : posx,
		y : posy
	};
}

(function($) {

    $.fn.getTransform = function(){
        var div = $(this).css('transform');
        var values = div.split('(')[1];
        values = values.split(')')[0];
        values = values.split(',');
        return values;
    }

    /*helper to detect scrollbar show event*/
    $(document).ready(function(){
        // Create an invisible iframe
        var iframe = document.createElement('iframe');
        iframe.id = "hacky-scrollbar-resize-listener";
        iframe.style.cssText = 'height: 0; background-color: transparent; margin: 0; padding: 0; overflow: hidden; border-width: 0; position: absolute; width: 100%;';

        // Register our event when the iframe loads
        iframe.onload = function() {
          // The trick here is that because this iframe has 100% width
          // it should fire a window resize event when anything causes it to
          // resize (even scrollbars on the outer document)
          iframe.contentWindow.addEventListener('resize', function() {
            try {
              var evt = document.createEvent('UIEvents');
              evt.initUIEvent('scrollchange', true, false, window, 0);
              window.dispatchEvent(evt);
            } catch(e) {}
          });
        };

        // Stick the iframe somewhere out of the way
        document.body.appendChild(iframe);
    })

	Array.prototype._reduce = function(callback /*, initialValue*/) {
    'use strict';
    if (this == null) {
      throw new TypeError('Array.prototype.reduce called on null or undefined');
    }

    if (typeof callback !== 'function') {
			return;
      //throw new TypeError(typeof callback + ' is not a function');
    }
    var t = Object(this), len = t.length >>> 0, k = 0, value;
    if (arguments.length == 2) {
      value = arguments[1];
    } else {
      while (k < len && !(k in t)) {
        k++;
      }
      if (k >= len) {
        throw new TypeError('Reduce of empty array with no initial value');
      }
      value = t[k++];
    }
    for (; k < len; k++) {
      if (k in t) {
        value = callback(value, t[k], k, t);
      }
    }
    return value;
  };

	jui2.path = './dist/';

	jui2.loadExtension = function(){
		$.getJSON(jui2.path+'extension/').done(function(data){
			for(i in data){
				data[i] = jui2.path+'extension/'+data[i]+'/'+data[i]+'.js'
			}
			head.load(data)
		})
	}

	jui2.lang = jui2.lang || {};
	/**
	 * @namespace ui
	 * @memberof jui2
	 */
	jui2.ui = jui2.ui || {};
	/**
	 * Create random string
	 * @memberof jui2
	 * @param  {Number} length String length
	 * @param  {String} chars  String output format combination, Combination: 'a' for lowercase alphabet, 'A' for uppercase alphabet, '#' for numeric and '!' for non alphanumeric
	 * @return {String}        Random string
	 * @example
	 * var randomString = jui2.random(8, 'aA#'); //will return random string containing uppercase, lowercase and numeric string
	 */
	jui2.random = function (length, chars) {
		var result = '', mask = '', text, i;

		text = {
			'a': 'abcdefghijklmnopqrstuvwxyz',
			'A': 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
			'#': '0123456789',
			'!': '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\'
		};

		for (i = chars.length; i--;)
			mask+=text[chars[i]]

		for (i = length; i > 0; --i)
			result += mask[Math.round(Math.random() * (mask.length - 1))];
		return result;
	};

	jui2.recylerItem = [];

	jui2.recyler = setInterval(function () {
		jui2.recylerItem.forEach(function(item){
			if($('#'+item.attr('related-to')).length == 0){
				item.remove()
				delete item.id
			}
		});
	}, 60000);
	/**
	 * return highest z-index
	 * @memberof jui2
	 * @return {number} Highest z-index
	 */
	jui2.findHighestZIndex = function(selector){
		selector = selector || 'body > *:not(j-menu)';
		var zIndex =  Math.max.apply(null,$.map($(selector), function(e,n){
			var pos = $(e).css('position');
		   if(pos=='absolute' || pos == 'fixed')
				return parseInt($(e).css('z-index'))||1 ;
		   })
		);
		return zIndex == '-Infinity' ? 0 : zIndex;
	}
	/**
	 * Clear null value from JSON object and change it to empty string
	 * @memberof jui2
	 * @param  {object} json JSON object
	 * @return {object}      JSON object
	 */
	jui2.clearNullFromJson = function(json){
		jui2.iterateJson(json, function(json){
			if(typeof json == 'object')
				for (var data in json) {
					if(!json[data])
						if(json[data]!=0)
							json[data] = ''
				}
		})
	};
	/**
	 * Iterating a json object
	 * @memberof jui2
	 * @param  {object}   json JSON object
	 * @param  {Function} fn   function to execute in every JSON object items
	 * @example
	 * jui2.iterateJson({
	 * 	a: 1,
	 *  b: 2
	 * }, function(obj){
	 * 	console.log(obj)
	 * }) // will print 1 then 2
	 */
	jui2.iterateJson = function(json, fn){
		for (var data in json) {
			fn(json[data])
			typeof json[data] == 'object' &&
				jui2.iterateJson(json[data], fn)
		}
	};
	/**
	 * Confirm dialog
	 * @memberof jui2
	 * @param  {string}   label Text/label for confirm
	 * @param  {Function} yes   function to execute when yes button clicked
	 * @param  {Function} no   function to execute when no button clicked
	 */
	jui2.confirm = function(label, yes, no){
		$('body').append(jui2.tmpl['confirm']({label: label}))
		$('.j-confirm j-button').eq(0).click(function(){
			yes.call(this)
			$('.j-confirm').remove()
		})
		$('.j-confirm j-button').eq(1).click(function(){
			no.call(this)
			$('.j-confirm').remove()
		})
	}

	$.fn.offsetRelative = function(top){
		var $this = $(this);
		var $parent = $this.offsetParent();
		var offset = $this.position();
		if(!top) return offset; // Didn't pass a 'top' element
		else if($parent.get(0).tagName == "BODY") return offset; // Reached top of document
		else if($(top,$parent).length) return offset; // Parent element contains the 'top' element we want the offset to be relative to
		else if($parent[0] == $(top)[0]) return offset; // Reached the 'top' element we want the offset to be relative to
		else { // Get parent's relative offset
			var parent_offset = $parent.offsetRelative(top);
			offset.top += parent_offset.top;
			offset.left += parent_offset.left;
			return offset;
		}
	};

	$.fn.positionRelative = function(top){
		return $(this).offsetRelative(top);
	};

	/**
	 * After resize event
	 * @param  {event}   event object
	 */
	$.event.special.resizefinished = {
		delegateType: "resize",
	    bindType: "resize",
		setup: function() {
			this.afterResizeId;
		},
	    handle: function( e ) {
      		e.preventDefault()
			var self = this, args = arguments, handleObj = e.handleObj;
			clearTimeout(this.afterResizeId);
			this.afterResizeId = setTimeout(function(){
				ret = handleObj.handler.apply( self, args );
	            return ret;
			}, 500);
	    }
	}

	/**
	 * Right click event
	 * @param  {event}   event object
	 */
	$.event.special.rightclick = {
	    delegateType: "mouseup",
	    bindType: "mouseup",
	    handle: function( e ) {
      		e.preventDefault()
	        var handleObj = e.handleObj;
	        e = e || window.event;

	        if(e.which == 3){
	            e.type = handleObj.origType;
	            ret = handleObj.handler.apply( this, arguments );
	            e.type = handleObj.type;
	            return ret;
	        }
	    }
	};

	/**
	 * measure dom element without append it to DOM
	 * @param {function} fn Function to return the expected value/information
	 * @return {*}	 	value/information of element returned by fn
	 * @example
	 * $('#div').measure(function(){
	 * 		return this.width(); //return width of element
 	 * })
	 */
	$.fn.measure = function(fn) {
        var clone = $(this).clone(), result;

        clone.css({
            visibility: 'hidden',
            position: 'absolute'
        });
        clone.appendTo(document.body);

        if (typeof fn == 'function') {
            result = fn.apply(clone);
        }
        clone.remove();

        return result;
	};
	/**
	 * Get form values as xml from jQuery selection
	 * @param {string} root XML root name
	 * @param {object} object JSON object that appended to XMl
	 * @return {string} xml XML string
	 */
	$.fn.toXML = function(root, object){
		var $body = $("<body>"),
		$root = $("<"+root+">").attr("xmlns:xsi", "http://www.w3.org/2001/XMLSchema-instance");

		$.each(this, function(i, val){
			if(val.toXML)
				$root.append(val.toXML());
			else{
				var children = $(val).find('j-textfield, j-textarea, j-wysiwyg, j-passwordfield, j-combofield, j-datefield, j-numberfield, j-editor, j-timefield').filter(function(){
					return $(this).parents("j-table").length == 0 && $(this).is(':visible');
				})
				var xml = $("<"+$(val).attr('id')+">");
				$.each(children, function(i, val){
					xml.attr($(val).attr('id'), $(val).val())
				})
				$root.append(xml)
			}
		})

		if(object){
			$.each(object, function(i, val){
				var xml = $("<"+i+">");
				if(val instanceof Object)
					$.each(val, function(i, val){
						xml.attr(i, val)
					})
				else {
					xml.attr("value", val)
				}
				$root.append(xml)
			})
		}

		return '<?xml version="1.0" encoding="utf-8" standalone="yes"?><?xml-stylesheet type="text/xsl" href="'+root+'.xsl" title="Compact"?>'+$body.append($root).html()
	}

	$.fn.sumWidth = function(){
		var width = 0;
		for(var i=0;i<this.length;i++){
			width+=this.eq(i).outerWidth(true);
		}
		return width;
	}

	/*old code*/
	$.fn.jui2Serialize = function(){
		value = {};
		this.find('[role=textField],[role=timeField],[role=uploadField],[role=textArea],[role=dateField],[role=comboField],[role=datePicker],[role=passwordField],[role=radioField]').each(function(){
			var el = $(this)
			var role = el.attr('role'), id = el.attr('name')||el.attr('id'), text = '';

			if (role=='textArea')
				text = $(el.find('iframe')[0].contentWindow.document.body).html().trim()

			value[id] =
				role=='textArea' && (text != '<br>' && jui2.escapeHtmlEntities(text.replace('&#x2010;', '-').replace('&#x2013;', '-').replace('&#x9;', '').replace(/&nbsp;/g,' ').replace(/\s\s+/g, ' ').replace(/(^<br>|<br>$)/g,'').replace(/<\/?colgroup[^>]*>/g,"")) != '' && jui2.escapeHtmlEntities(jui2.cleanWordPaste(text).replace('&#x2010;', '-').replace('&#x2013;', '-').replace('&#x9;', '').replace(/&nbsp;/g,' ').replace(/\s\s+/g, ' ').replace(/(^<br>|<br>$)/g,'').replace(/<\/?colgroup[^>]*>/g,"")))
				|| role=='comboField' &&
					el.find('input[type=hidden]').val()
				|| role=='radioField' &&
					el.find('input:checked').val()
				|| role=='timeField' &&
					el.find('input').eq(0).val()+':'+el.find('input').eq(1).val()
				|| el.find('input').val()

			if(role=='textArea' && value[id]=='<br>')
				value[id] = ''

			if(role=='textArea'){
				if(value[id])
					value[id] = jui2.escapeHtmlEntities((he.encode(value[id], {
						'allowUnsafeSymbols': false
					})).replace('&#x2010;', '-').replace('&#x2013;', '-').replace('&#x9;', '').replace(/&nbsp;/g,' ')
					.replace(/\s\s+/g, ' '));
			}

		});
		var i = 0
		this.find('j-datefield, j-combofield').each(function(i, val){
			var el = $(val), id = el.attr('name')||el.attr('id')
			value[id] = el.val();
		})

		value = $.extend(value, $(this).getValues())
		return value;
	};

	/**
	 * Count the size of overlapped area
	 * @param  {jQuery} selector jQuery selector, object or HTMLElement
	 * @return {object}          JSON object containing width and height of overlapped area
	 */
	$.fn.overlappedSize = function(selector){
		var el = $(selector),
		offset1 = this.offset(),
		offset2 = el.offset(),
		w1 = this.outerWidth(),
		w2 = el.outerWidth(),
		h1 = this.outerHeight(),
		h2 = el.outerHeight(),
		width = Math.max(Math.min(offset1.left+w1, offset2.left+w2) - Math.max(offset1.left, offset2.left), 0),
		height = Math.max(Math.min(offset1.top+h1, offset2.top+h2) - Math.max(offset1.top, offset2.top), 0)

		return {
			width: width,
			height: height
		}
	}

	/**
	 * Calculate distance between 2 points
	 * @param  {object} point1 x and y of point ex. {x: 10, y: 10}
	 * @param  {object} point2 x and y of point ex. {x: 10, y: 10}
	 * @return {number}        distance
	 */
	$.calcDistance = function(point1, point2){
		var xs = 0, ys = 0;

		xs = point2.x - point1.x;
		xs = xs * xs;

		ys = point2.y - point1.y;
		ys = ys * ys;

		return Math.sqrt( xs + ys );
	}

	$.fn.centerPoint = function(){
		var xy1 = this.offset()

		return {
			x: xy1.left + this.outerWidth()/2,
			y: xy1.top + this.outerHeight()/2
		}
	}

	/**
	 * Get nearest distance of 2 elements
	 * @param  {jQuery} selector jQuery selector, object or HTMLElement
	 * @return {integer}          Distance of nearest distance in pixel
	 */
	$.fn.nearestDistance = function(selector){
		var thisOuterWidth = this.outerWidth(), thisOuterHeight = this.outerHeight(), offset1 = this.offset(), topLeft1 = {x: offset1.left, y: offset1.top},
		bottomLeft1 = {x: offset1.left, y: offset1.top+thisOuterHeight},
		topRight1 = {x: offset1.left+thisOuterWidth, y: offset1.top},
		bottomRight1 = {x: offset1.left+thisOuterWidth, y: offset1.top+thisOuterHeight},
		bottom1 = offset1.top+thisOuterHeight,
		right1 = offset1.left+thisOuterWidth
		el = $(selector), elOuterHeight = el.outerHeight(), elOuterWidth = el.outerWidth()
		offset2 = el.offset(), topLeft2 = {x: offset2.left, y: offset2.top},
		bottomLeft2 = {x: offset2.left, y: offset2.top+elOuterHeight},
		topRight2 = {x: offset2.left+elOuterWidth, y: offset2.top},
		bottomRight2 = {x: offset2.left+elOuterWidth, y: offset2.top+elOuterHeight},
		bottom2 = offset2.top+elOuterHeight,
		right2 = offset2.left+elOuterWidth, distance = []

		if(right1 > offset2.left && !(offset1.left > right2)){
			if(bottom1 < offset2.top)
				distance.push(offset2.top - bottom1)
			if(bottom2 < offset1.top)
				distance.push(offset1.top - bottom2)
		}

		if(bottom1 > offset2.top && !(offset1.top > bottom2)){
			if(right1 < offset2.left)
				distance.push(offset2.left - right1)
			if(right2 < offset1.left)
				distance.push(offset1.left - right2)
		}

		if(bottom1 < offset2.top){
			/*distance.push($.calcDistance(bottomRight1, topLeft2))
			distance.push($.calcDistance(bottomRight1, topRight2))
			distance.push($.calcDistance(bottomLeft1, topLeft2))
			distance.push($.calcDistance(bottomLeft1, topRight2))*/
			distance.push(
				$.calcDistance(bottomRight1, topLeft2),
				$.calcDistance(bottomRight1, topRight2),
				$.calcDistance(bottomLeft1, topLeft2),
				$.calcDistance(bottomLeft1, topRight2)
			)
		}
		else if(bottom2 < offset1.top){
			distance.push(
				$.calcDistance(bottomRight2, topLeft1),
				$.calcDistance(bottomRight2, topRight1),
				$.calcDistance(bottomLeft2, topLeft1),
				$.calcDistance(bottomLeft2, topRight1)
			)
		}

		if(right1 < offset2.left){
			distance.push(
				$.calcDistance(bottomRight1, topLeft2),
				$.calcDistance(bottomRight1, bottomLeft2),
				$.calcDistance(topRight1, topLeft2),
				$.calcDistance(topRight1, bottomLeft2)
			)
		}
		else if(right2 < offset1.left){
			distance.push(
				$.calcDistance(bottomRight2, topLeft1),
				$.calcDistance(bottomRight2, bottomLeft1),
				$.calcDistance(topRight2, topLeft1),
				$.calcDistance(topRight2, bottomLeft1)
			)
		}

		//TODO: 0 Could be optimized.
		return Math.min.apply(null, distance);
	}

	$.fn.nearest = function(selector){
		var isOverlap = false, self = this, data = $(), value = false, tmp, el1, el2, offset1, offset2, targetOffset = this.offset(), width = this.outerWidth(), height = this.outerHeight();
		$(selector || '*:visible').not(this.get(0)).each(function(i, el){

			if(!isOverlap){
				if(self.isOverlap(el)){
					tmp = self.overlappedSize(el)
					tmp = tmp.width*tmp.height
					data = $(el)
					value = tmp
					data.add(el)
					isOverlap = true
				}
				else{
			if(!value){
				value = self.nearestDistance(el);
				data = $(el)
			}
			else{
	            if(self.nearestDistance(el) < value){
					data = $(el)
					value = self.nearestDistance(el)
	            }
	            else if(value == self.nearestDistance(el)){
					el1 = data.last(), el2 = $(el), dist2 = $.calcDistance(self.centerPoint(),el2.centerPoint()), dist1 = $.calcDistance(self.centerPoint(),el1.centerPoint())

					if(dist2 < dist1)
						data = el2
					else if(dist1 == dist2)
						data = data.add(el)
	            }
	    	}
				}
			}
			else{
		        tmp = self.overlappedSize(el)
		        tmp = tmp.width*tmp.height
				if(value < tmp){
					data = $(el)
					value = tmp
				}
				else if(value == tmp){
					el1 = data.last(), el2 = $(el), dist2 = $.calcDistance(self.centerPoint(),el2.centerPoint()), dist1 = $.calcDistance(self.centerPoint(),el1.centerPoint())

					if(dist2 < dist1)
						data = el2
					else if(dist1 == dist2)
						data = data.add(el)
				}
			}
		})

		return data;
	}

	/**
	 * Check if element is in viewport
	 * @return {boolean} true if element in viewport
	 */
	$.fn.inViewport = function() {
    var rect = this.getBoundingClientRect();

    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
	};

	/**
	 * Get HTML string of element
	 * @return {String}   Outer HTML string of an element
	 */
	$.fn.outerHTML = function(s) {
		return s
	    ? this.before(s).remove()
	    : jQuery("<p>").append(this.eq(0).clone()).html();
	};

	/**
	 * Check if element touched the top of the window
	 * @return {boolean} true if element touched the top of the window
	 * @author Deddy Lasmono Putro
	 */
	$.fn.touchTop = function(){
		return $(this).offset().top<0
	};

	/**
	 * Check if element touched the bottom of the window
	 * @return {boolean} true if element touched the bottom of the window
	 * @author Deddy Lasmono Putro
	 */
	$.fn.touchBottom = function(){
		var wd = $(window);
		return (this.offset().top + this.height()) >= (wd.height()+wd.scrollTop())
	};

	/**
	 * Get values from jui2 widget inside selected element
	 * @return {object} Collection of jui2 widget values
	 * @author Deddy Lasmono Putro
	 */
	$.fn.getValues = function(){
		var values = {}
		this.find('j-colorpicker, j-textfield, j-textarea, j-wysiwyg, j-passwordfield, j-combofield, j-datefield, j-numberfield, j-editor, j-timefield, j-radiofield, j-dateTimeField').filter(function(){
			var el = $(this);
	    return (el.attr('name')||el.attr('id')) !== undefined
	  }).each(function(i, val){
	    var el = $(val), id = el.attr('name')||el.attr('id')
			values[id] = el.val()
		})
		return values;
	};

	/**
	 * Get RGB value from hex color
	 * @param  {string} color Hex color
	 * @return {object}       Object containing RGB value
	 * @author Deddy Lasmono Putro
	 */
	$.getRGB = function(color) {
		var r, g, b, rgb;
		if(color.match(/rgb/gi)){
			rgb = color.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
			r = rgb[1];
			g = rgb[2];
			b = rgb[3];

		  return {
				R: r,
				G: g,
				B: b
		  };
		}
		else{
			r = color.substring(1, 3);
			g = color.substring(3, 5);
			b = color.substring(5, 7);

		  return {
				R: parseInt(r, 16),
				G: parseInt(g, 16),
				B: parseInt(b, 16)
		  };
		}
	};

	$.max = function (array)
	{
	    var m = -Infinity, i = 0, n = array.length;

	    for (; i != n; ++i) {
	        if (array[i] > m) {
	            m = array[i];
	        }
	    }

	    return m;
	}

	$.maxKey = function (array)
	{
	    var m = -Infinity, i = 0, n = array.length, key = 0;

	    for (; i != n; ++i) {
	        if (array[i] > m) {
	            m = array[i];
				key = i
	        }
	    }

	    return key;
	}

	/**
	 * Get ideal color (black or white) for defined background color
	 * @param  {string} bgColor Hex color
	 * @return {string} color Hex color (black/white)
	 * @author Deddy Lasmono Putro
	 */
	$.idealTextColor = function(bgColor) {

		var nThreshold = 105,
		components = $.getRGB(bgColor),
		bgDelta = (components.R * 0.299) + (components.G * 0.587) + (components.B * 0.114);

		return ((255 - bgDelta) < nThreshold) ? "#000000" : "#ffffff";
	};

	/**
	 * Get only text(remove children) from element
	 * @return {string} Element's text
	 * @author Deddy Lasmono Putro
	 */
	$.fn.justtext = function() {
		var c = this.clone(), text = c.children()
		.remove()
		.end()
		.text();
		c.remove();
		return text;
	};

	/**
	 * Center an element
	 * @return {jQuery} jQuery object
	 * @author Deddy Lasmono Putro
	 */
	$.fn.center = function () {
		var wd = $(window), wdHeight = wd.height() , wdWidth = wd.width(), outerHeight = this.outerHeight(false), outerWidth = this.outerWidth(false);
		this.css("position","absolute");
		if(this.parent().css('position')=='fixed' || $('body')[0] == this.parent()[0]){
			this.css("top", Math.max(0, ((wdHeight - outerHeight) / 2)) + "px");
			this.css("left", Math.max(0, ((wdWidth - outerWidth) / 2)) + "px");
			this.css("position","fixed");
		}
		else{
			this.css("top", Math.max(0, ((wdHeight - outerHeight) / 2) + wd.scrollTop()) + "px");
			this.css("left", Math.max(0, ((wdWidth - outerWidth) / 2) + wd.scrollLeft()) + "px");
		}

		return this;
	};

	/**
	 * Check if element overlapping other element
	 * @param  {jQuery} selector Jquery selector, object or eleemnt
	 * @return {boolean}          true if overlapping
	 * @author Deddy Lasmono Putro
	 */
	$.fn.isOverlap = function(selector){
		var rect1, rect2 = selector instanceof jQuery ? selector[0].getBoundingClientRect() : (selector instanceof HTMLCollection ? selector.getBoundingClientRect() : $(selector)[0].getBoundingClientRect())
		if(!this.is(':visible')){
			this.css('opacity', 0).show();
			rect1 = this[0].getBoundingClientRect()
			this.hide().css('opacity', '');
		}
		else
			rect1 = this[0].getBoundingClientRect()
		return !(rect1.right < rect2.left ||
	    rect1.left > rect2.right ||
	    rect1.bottom < rect2.top ||
	    rect1.top > rect2.bottom)
	};

	/**
	 * Check if element inside another element
	 * @param  {jQuery} selector jQuery object, selector or HTMLElement
	 * @return {boolean}          true if element inside another element
	 * @author Deddy Lasmono Putro
	 */
	$.fn.isInside = function(selector){
		var rect1 = this[0].getBoundingClientRect(), rect2 = selector instanceof jQuery ? selector[0].getBoundingClientRect() : (selector instanceof HTMLCollection ? selector.getBoundingClientRect() : $(selector)[0].getBoundingClientRect())
		return (rect2.right > rect1.right &&
	    rect2.left < rect1.left ||
	    rect2.bottom > rect1.bottom ||
	    rect2.top < rect1.top)
	};

	/**
	 * Get elements that touching selected element
	 * @param  {jQuey} selector jQuery selector, object or HTMLElement
	 * @return {jQuery}          jQuery object that contains all element that touching selected element
	 */
	$.fn.touching = function(selector){
	  var el = this;
	  return $(selector || '*:visible').filter(function(){
	    return el.isOverlap(this)
	  })
	}

	/**
	 * Check if element has scrollbar or not
	 * @return {boolean} Return true if element has scrollbar
	 * @author Deddy Lasmono Putro
	 */
    $.fn.hasScrollBar = function() {
      return this.get(0).scrollHeight > this.outerHeight(true);
    };

	/**
	 * Get browser scrollbar size
	 * @return {integer} Return the size of scrollbar in pixel
	 * @author Deddy Lasmono Putro
	 */
	$.scrollbarWidth = function() {
		var parent, child, width;

		if(width===undefined) {
			parent = $('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo('body');
			child=parent.children();
			width=child.innerWidth()-child.height(99).innerWidth();
			parent.remove();
		}

		return width;
	};

	$.fn.checkField = function(){
		var pass = [];
		$.each(this, function(i, val){
			if($(val).val()=='' || $(val).val()==undefined){
				pass.push($(val));
			}
		})
		return pass.length != 0 ? pass : true;
	}

})(jQuery);

/*!
 * jQuery resize event - v1.1 - 3/14/2010
 * http://benalman.com/projects/jquery-resize-plugin/
 *
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */

// Script: jQuery resize event
//
// *Version: 1.1, Last updated: 3/14/2010*
//
// Project Home - http://benalman.com/projects/jquery-resize-plugin/
// GitHub       - http://github.com/cowboy/jquery-resize/
// Source       - http://github.com/cowboy/jquery-resize/raw/master/jquery.ba-resize.js
// (Minified)   - http://github.com/cowboy/jquery-resize/raw/master/jquery.ba-resize.min.js (1.0kb)
//
// About: License
//
// Copyright (c) 2010 "Cowboy" Ben Alman,
// Dual licensed under the MIT and GPL licenses.
// http://benalman.com/about/license/
//
// About: Examples
//
// This working example, complete with fully commented code, illustrates a few
// ways in which this plugin can be used.
//
// resize event - http://benalman.com/code/projects/jquery-resize/examples/resize/
//
// About: Support and Testing
//
// Information about what version or versions of jQuery this plugin has been
// tested with, what browsers it has been tested in, and where the unit tests
// reside (so you can test it yourself).
//
// jQuery Versions - 1.3.2, 1.4.1, 1.4.2
// Browsers Tested - Internet Explorer 6-8, Firefox 2-3.6, Safari 3-4, Chrome, Opera 9.6-10.1.
// Unit Tests      - http://benalman.com/code/projects/jquery-resize/unit/
//
// About: Release History
//
// 1.1 - (3/14/2010) Fixed a minor bug that was causing the event to trigger
//       immediately after bind in some circumstances. Also changed $.fn.data
//       to $.data to improve performance.
// 1.0 - (2/10/2010) Initial release

(function ($, window, undefined) {
	'$:nomunge'; // Used by YUI compressor.

	// A jQuery object containing all non-window elements to which the resize
	// event is bound.
	var elems = $([]),

	// Extend $.resize if it already exists, otherwise create it.
	jq_resize = $.resize = $.extend($.resize, {}),

	timeout_id,

	// Reused strings.
	str_setTimeout = 'setTimeout',
	str_resize = 'resize',
	str_data = str_resize + '-special-event',
	str_delay = 'delay',
	str_throttle = 'throttleWindow';

	// Property: jQuery.resize.delay
	//
	// The numeric interval (in milliseconds) at which the resize event polling
	// loop executes. Defaults to 250.

	jq_resize[str_delay] = 250;

	// Property: jQuery.resize.throttleWindow
	//
	// Throttle the native window object resize event to fire no more than once
	// every <jQuery.resize.delay> milliseconds. Defaults to true.
	//
	// Because the window object has its own resize event, it doesn't need to be
	// provided by this plugin, and its execution can be left entirely up to the
	// browser. However, since certain browsers fire the resize event continuously
	// while others do not, enabling this will throttle the window resize event,
	// making event behavior consistent across all elements in all browsers.
	//
	// While setting this property to false will disable window object resize
	// event throttling, please note that this property must be changed before any
	// window object resize event callbacks are bound.

	jq_resize[str_throttle] = true;

	// Event: resize event
	//
	// Fired when an element's width or height changes. Because browsers only
	// provide this event for the window element, for other elements a polling
	// loop is initialized, running every <jQuery.resize.delay> milliseconds
	// to see if elements' dimensions have changed. You may bind with either
	// .resize( fn ) or .bind( "resize", fn ), and unbind with .unbind( "resize" ).
	//
	// Usage:
	//
	// > jQuery('selector').bind( 'resize', function(e) {
	// >   // element's width or height has changed!
	// >   ...
	// > });
	//
	// Additional Notes:
	//
	// * The polling loop is not created until at least one callback is actually
	//   bound to the 'resize' event, and this single polling loop is shared
	//   across all elements.
	//
	// Double firing issue in jQuery 1.3.2:
	//
	// While this plugin works in jQuery 1.3.2, if an element's event callbacks
	// are manually triggered via .trigger( 'resize' ) or .resize() those
	// callbacks may double-fire, due to limitations in the jQuery 1.3.2 special
	// events system. This is not an issue when using jQuery 1.4+.
	//
	// > // While this works in jQuery 1.4+
	// > $(elem).css({ width: new_w, height: new_h }).resize();
	// >
	// > // In jQuery 1.3.2, you need to do this:
	// > var elem = $(elem);
	// > elem.css({ width: new_w, height: new_h });
	// > elem.data( 'resize-special-event', { width: elem.width(), height: elem.height() } );
	// > elem.resize();

	$.event.special[str_resize] = {

		// Called only when the first 'resize' event callback is bound per element.
		setup : function () {
			// Since window has its own native 'resize' event, return false so that
			// jQuery will bind the event using DOM methods. Since only 'window'
			// objects have a .setTimeout method, this should be a sufficient test.
			// Unless, of course, we're throttling the 'resize' event for window.
			if (!jq_resize[str_throttle] && this[str_setTimeout]) {
				return false;
			}

			var elem = $(this);

			// Add this element to the list of internal elements to monitor.
			elems = elems.add(elem);

			// Initialize data store on the element.
			$.data(this, str_data, {
				w : elem.width(),
				h : elem.height()
			});

			// If this is the first element added, start the polling loop.
			if (elems.length === 1) {
				loopy();
			}
		},

		// Called only when the last 'resize' event callback is unbound per element.
		teardown : function () {
			// Since window has its own native 'resize' event, return false so that
			// jQuery will unbind the event using DOM methods. Since only 'window'
			// objects have a .setTimeout method, this should be a sufficient test.
			// Unless, of course, we're throttling the 'resize' event for window.
			if (!jq_resize[str_throttle] && this[str_setTimeout]) {
				return false;
			}

			var elem = $(this);

			// Remove this element from the list of internal elements to monitor.
			elems = elems.not(elem);

			// Remove any data stored on the element.
			elem.removeData(str_data);

			// If this is the last element removed, stop the polling loop.
			if (!elems.length) {
				clearTimeout(timeout_id);
			}
		},

		// Called every time a 'resize' event callback is bound per element (new in
		// jQuery 1.4).
		add : function (handleObj) {
			// Since window has its own native 'resize' event, return false so that
			// jQuery doesn't modify the event object. Unless, of course, we're
			// throttling the 'resize' event for window.
			if (!jq_resize[str_throttle] && this[str_setTimeout]) {
				return false;
			}

			var old_handler;

			// The new_handler function is executed every time the event is triggered.
			// This is used to update the internal element data store with the width
			// and height when the event is triggered manually, to avoid double-firing
			// of the event callback. See the "Double firing issue in jQuery 1.3.2"
			// comments above for more information.

			function new_handler(e, w, h) {
				var elem = $(this),
				data = $.data(this, str_data);

				// If called from the polling loop, w and h will be passed in as
				// arguments. If called manually, via .trigger( 'resize' ) or .resize(),
				// those values will need to be computed.
				data.w = w !== undefined ? w : elem.width();
				data.h = h !== undefined ? h : elem.height();

				old_handler.apply(this, arguments);
			};

			// This may seem a little complicated, but it normalizes the special event
			// .add method between jQuery 1.4/1.4.1 and 1.4.2+
			if ($.isFunction(handleObj)) {
				// 1.4, 1.4.1
				old_handler = handleObj;
				return new_handler;
			} else {
				// 1.4.2+
				old_handler = handleObj.handler;
				handleObj.handler = new_handler;
			}
		}

	};

	function loopy() {

		// Start the polling loop, asynchronously.
		timeout_id = window[str_setTimeout](function () {

				// Iterate over all elements to which the 'resize' event is bound.
				elems.each(function () {
					var elem = $(this),
					width = elem.width(),
					height = elem.height(),
					data = $.data(this, str_data);

					// If element size has changed since the last time, update the element
					// data store and trigger the 'resize' event.
					if (width !== data.w || height !== data.h) {
						elem.trigger(str_resize, [data.w = width, data.h = height]);
					}

				});

				// Loop.
				loopy();

			}, jq_resize[str_delay]);

	};

})(jQuery, this);
;/****lang/day.js****/
(function($){

	jui2.lang.day = {
		en: {
			sun: {
				short: 'Sun',
				long: 'Sunday'
			},
			mon: {
				short: 'Mon',
				long: 'Monday'
			},
			tue: {
				short: 'Tue',
				long: 'Tuesday'
			},
			wed: {
				short: 'Wed',
				long: 'Wednesday'
			},
			thu: {
				short: 'Thu',
				long: 'Thursday'
			},
			fri: {
				short: 'Fri',
				long: 'Friday'
			},
			sat: {
				short: 'Sat',
				long: 'Saturday'
			}
		}
	}

}(jQuery));/****lang/month.js****/
(function($){

	jui2.lang.month = {
		en: {
			jan: {
				short: 'Jan',
				long: 'January'
			},
			feb: {
				short: 'Feb',
				long: 'February'
			},
			mar: {
				short: 'Mar',
				long: 'March'
			},
			apr: {
				short: 'Apr',
				long: 'April'
			},
			may: {
				short: 'May',
				long: 'May'
			},
			jun: {
				short: 'Jun',
				long: 'June'
			},
			jul: {
				short: 'Jul',
				long: 'July'
			},
			aug: {
				short: 'Aug',
				long: 'August'
			},
			sep: {
				short: 'Sep',
				long: 'September'
			},
			oct: {
				short: 'Oct',
				long: 'October'
			},
			nov: {
				short: 'Nov',
				long: 'November'
			},
			dec: {
				short: 'Dec',
				long: 'December'
			},
		}
	}

}(jQuery));
;/****js/method.js****/

jui2.method = {
	disable : function(el){
		self = el || this
		self.className += ' j-disable';
	},
	enable: function(el){
		self = el || this
		self.className = self.className.replace( /(?:^|\s)j-disable(?!\S)/g , '' )
	}
};;/****js/attrChange.js****/
(function($) {
	jui2.attrChange = {
		autocomplete: function(el, oldVal, newVal){
			$el = $(el);
			if(newVal != null){
				if(newVal=='on'){
					if (!localStorage.getItem('jui2list'+$el.attr('id'))) localStorage.setItem('jui2list'+$el.attr('id'), JSON.stringify([]));
					$el.children('input').attr('list', 'jui2list'+$el.attr('id'))
					var db = JSON.parse(localStorage.getItem("jui2list"+$el.attr('id')));
					$('#jui2list'+$el.attr('id')).remove();
					$('<datalist id="jui2list'+$el.attr('id')+'">').appendTo('body')
					$.each(db, function(i, val){
						if($el.attr('autocompletefilter')!=undefined){
							if(val[1] == $el.attr('autocompletefilter'))
								$('#jui2list'+$el.attr('id')).append('<option value="'+val[0]+'">')
						}
						else{
							$('#jui2list'+$el.attr('id')).append('<option value="'+val+'">')
						}
					})
				}
			}
			else{
				$el.children('input').removeAttr('list')
				$('#jui2list'+$el.attr('id')).remove();
			}
		},
		autocompletefilter: function(el, oldVal, newVal){
			$el = $(el);
			newVal = $el.attr('autocomplete')
			if(newVal != null){
				if(newVal=='on'){
					if (!localStorage.getItem('jui2list'+$el.attr('id'))) localStorage.setItem('jui2list'+$el.attr('id'), JSON.stringify([]));
					$el.children('input').attr('list', 'jui2list'+$el.attr('id'))
					var db = JSON.parse(localStorage.getItem("jui2list"+$el.attr('id')));
					$('#jui2list'+$el.attr('id')).remove();
					$('<datalist id="jui2list'+$el.attr('id')+'">').appendTo('body')
					$.each(db, function(i, val){
						if($el.attr('autocompletefilter')!=undefined){
							if(val[1] == $el.attr('autocompletefilter'))
								$('#jui2list'+$el.attr('id')).append('<option value="'+val[0]+'">')
						}
						else{
							$('#jui2list'+$el.attr('id')).append('<option value="'+val+'">')
						}
					})
				}
			}
			else{
				$el.children('input').removeAttr('list')
				$('#jui2list'+$el.attr('id')).remove();
			}
		},
		disabled: function(el, oldVal, newVal){
			if(newVal != null){
				jui2.method.disable(el);
				$el = $(el)
				var ev1 = 0, ev2 = 0, ev = 0
				if($el.data( "events" ) != undefined)
					ev1 = $el.data( "events" ).length;
				if(jQuery._data( $el[0], "events" ))
					ev2 = jQuery._data( $el[0], "events" ).length == undefined ? 1 : 0;
				ev = (ev1 ? ev1 : 0) + (ev2 ? ev2 : 0)
				if(['J-TABLE2', 'J-TABLE', 'J-GANTT'].indexOf($el.prop("tagName")) < 0 && ev > 0){
					$el.data( "_events", $.extend(true, {}, $el.data( "events" ), jQuery._data( $el[0], "events" )))
					$el.data( "events", [] )
					jQuery._data( $el[0], "events", [] )
					try {
						$el.unbind();
					}
					catch(err) {
					}
				}
			}
			else if(newVal == null){
				jui2.method.enable(el);
				$el = $(el)
				if(['J-TABLE2', 'J-TABLE', 'J-GANTT'].indexOf($el.prop("tagName")) < 0){
					$.each($el.data("_events"), function(i, val){
					  $.each(val, function(i2, val2){
						//if(val2.delegateCount == 1){
							//$el.delegate(val2.selector, val2.type, val2.handler );
						//}else
							$el.on(val2.type, val2.handler, val2.data, val2.selector );
					  })
					})

					$el.data( "events", $.extend(true, {}, $el.data( "_events" )))
					jQuery._data( $el[0], "events", $.extend(true, {}, $el.data( "_events" )))
				}
			}
		},
		icon: function(el, oldVal, newVal){
			if(el.iconPosition){
				$(el).children('.j-ui-icon').remove()
				if(newVal != null){
					if('J-COLORPICKER' == $(el).prop("tagName")){
						el.insertAdjacentHTML( el.iconPosition, '<i style="color:'+$(el).val()+'" class="j-ui-icon fa '+newVal+'"></i> ' );
					}
					else
						el.insertAdjacentHTML( el.iconPosition, '<i class="j-ui-icon fa '+newVal+'"></i> ' );
				}
			}
		},
		width: function(el, oldVal, newVal){
			if($(el).children('.j-input-field').length>0)
				$(el).children('.j-input-field').outerWidth(parseInt(newVal)-125)
			el.style.width = newVal;
		},
		height: function(el, oldVal, newVal){
			var $el = $(el);
			el.style.height = newVal;
			if(['J-TABLE2', 'J-TABLE', 'J-GANTT'].indexOf($el.prop("tagName")) >= 0)
				$el.triggerHandler('afterdraw.height')
		},
		title: function(el, oldVal, newVal){
			var $el = $(el)
			$el.find('.j-title').remove();
			var table = $(el).children('table');
			if(newVal != null)
				el.insertAdjacentHTML( 'afterbegin', '<div class="j-title">'+newVal+'</div>' );
			if(['J-TABLE2', 'J-TABLE', 'J-GANTT'].indexOf(el.tagName) >= 0){
				marginTop = 0
				table.prevAll().each(function(i, val){
					($(val).prop('tagName') == 'J-TOOLBAR') ? marginTop += 37 : marginTop += $(val).outerHeight(true)
					/*if($(val).prop('tagName') == 'J-TOOLBAR')
						marginTop += 37
					else
						marginTop += $(val).outerHeight(true)*/
				})
				table.css('margin-top', marginTop);
				/*$el.resize(function(){
					$el.children('.j-title').outerWidth($el.width())
				});
				$el.children('.j-title').outerWidth($el.width())*/
			}
		},
		resize: function(el, oldVal, newVal){
			var $el = $(el), tag = $el.next().prop('tagName');
			if(newVal.toLowerCase() == 'true'){
				if(tag == 'J-LAYOUT-NO-RESIZER'){
					$el.next().remove()
				}
				if(tag != 'J-LAYOUT-RESIZER'){
					$('<j-layout-resizer class="j-drag"></j-layout-resizer>').insertAfter($el)
				}
			}
			else{
				if(tag == 'J-LAYOUT-RESIZER'){
					$el.next().remove()
				}
				if(tag != 'J-LAYOUT-NO-RESIZER'){
					$('<j-layout-no-resizer></j-layout-no-resizer>').insertAfter($el)
				}
			}
		},
		cols: function(el, oldVal, newVal){
			var $el = $(el);
			(newVal != null) ? $el.find('textarea').attr('cols', newVal).css('width', 'auto') : $el.find('textarea').removeAttr('cols').css('width', '')
		},
		rows: function(el, oldVal, newVal){
			var $el = $(el);
			(newVal != null) ? $el.find('textarea').attr('rows', newVal) : $el.find('textarea').removeAttr('rows')
			/*if(newVal != null){
				$(el).find('textarea').attr('rows', newVal)
			}
			else{
				$(el).find('textarea').removeAttr('rows')
			}*/
		},
		readonly: function(el, oldVal, newVal){
			var $el = $(el)
			if(newVal != null){
				$el.children('input, textarea').attr('readonly', true)
			}
			else{
				$el.children('input, textarea').removeAttr('readonly')
			}
		},
		mandatory: function(el, oldVal, newVal){
			var $el = $(el)
			if(newVal != null){
				if(newVal.toLowerCase() == 'true')
					$el.children('input, textarea').on('blur.mandatory', function(){
						if($el.val().trim()=='')
							$el.children('input, textarea').addClass('j-border3').removeClass('j-border1')
					})
					$el.children('input, textarea').on('focus.mandatory', function(){
						$el.children('input, textarea').addClass('j-border1').removeClass('j-border3')
					})
			}
			else{
				$el.children('input, textarea').off('blur.mandatory')
				$el.children('input, textarea').off('focus.mandatory')
			}
		},
		placeholder: function(el, oldVal, newVal){
			var $el = $(el)
			if(newVal != null){
				$el.children('input').attr('placeholder', newVal)
			}
			else{
				$el.children('input').removeAttr('placeholder')
			}
		}
	};
}(jQuery))
;
;/****js/base.js****/

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

    this.juiid = $this.attr('id');

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
;/****js/button.js****/
/**
 * @classdesc Button custom web component
 * @class button
 * @property {string} color Available color is blue and red
 * @property {string} icon Button icon, using font awesome. Ex. fa-calendar etc. For icon list see <a href="http://fontawesome.github.io/Font-Awesome/icons/">http://fontawesome.github.io/Font-Awesome/icons/</a>
 * @example <caption>Basic button</caption>
 * <j-button>My Button</j-button>
 * @example <caption>Button with different color</caption>
 * <j-button color="blue">My Button</j-button>
 * @example <caption>Button with icon</caption>
 * <j-button icon="fa-calendar">My Button</j-button>
 */
(function($){
	/** @constructor */
	var proto = Object.create(HTMLElement.prototype)

	proto.createdCallback = function() {

		jui2.ui.base.proto.createdCallback.call(this, jui2.ui.button);

		var $self = $(this)

		this.iconPosition = 'afterBegin';

		$self.attr('tabindex', 0).addClass('j-transition1 j-border-box j-focus-highlight1 j-inline-block j-ui j-control j-control-click');

		if(this.innerHTML.trim() == '')
			this.innerHTML = ''

		/*if(this.getAttribute('icon'))
			this.innerHTML = '<i class="fa '+this.getAttribute('icon')+'"></i> '+this.innerHTML*/
		/*this.enabledAttrChange = $.unique(this.enabledAttrChange.concat(['disabled', 'icon']));

		for(i in this.attributes){
			var attrName = this.attributes[i].nodeName,
			newVal = this.attributes[i].nodeValue, attr = this.tagName.toLowerCase()+'_'+attrName;
			if(jui2.attrChange[attr])
				jui2.attrChange[attr](this, false, newVal);
			else if(jui2.attrChange[attrName] && this.enabledAttrChange.indexOf(attrName) > -1)
	        	jui2.attrChange[attrName](this, false, newVal);
		}*/

		$self.keyup(function(event){
		    if(event.keyCode == 13){
				event.preventDefault();
		        $self.click();
		    }
		});

		this.attrChangedCb(['disabled', 'icon'])

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
 	* Fires when button clicked
 	* @event click
 	* @memberof button
 	* @example
 	* <j-button id="myButton">My Button</j-button>
 	* <script>
 	* $('#myButton').on('click', function(value){
 	* 	console.log('Button clicked') //will print 'Button clicked' in javascript console
 	* })
 	* </script>
 	*/
	jui2.ui.button = {
		widget: document.registerElement('j-button',  {
			prototype: proto
		}),
		proto: proto
	}

}(jQuery))
;
;/****js/textField.js****/
/**
 * @classdesc TextField custom web component
 * @class textField
 * @property {string} icon Button icon, using font awesome. Ex. fa-calendar etc. For icon list see <a href="">http://fortawesome.github.io/Font-Awesome/icons/</a>
 * @example <caption>Basic usage: <br/><j-textfield>Username</j-textfield></caption>
 * <j-textfield>Username</j-textfield>
 * @example <caption>Textfield with icon: <br/><j-textfield icon="fa-user">Username</j-textfield></caption>
 * <j-textfield icon="fa-user">Username</j-textfield>
 */

(function ($) {
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

        if (self.setup) {
            self.setup();
        }

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

    jui2.attrChange['j-textfield_no-label'] = function (el, oldVal, newVal) {
        if (newVal != null) {
            $(el).children('label').remove()
        } else {

        }
    }

	jui2.ui.textField = {
		widget: document.registerElement('j-textfield', {
			prototype: proto
		}),
		proto: proto
	}

}(jQuery));
;/****js/progressBar.js****/

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
;/****js/table.js****/
/**
 * @classdesc Table custom web component
 * @class table
 * @example <caption>Basic table</caption>
 * <j-table>[["column1", "column2"], ["data1", "data2"]]</j-table>
 */
(function ($) {
    /** @constructor */
    var proto = Object.create(HTMLElement.prototype)

    proto.createdCallback = function () {

        jui2.ui.base.proto.createdCallback.call(this, jui2.ui.table);

        var $self = $(this),
            self = this,
            regxp = /<(.|\n)*?>(.|\n)*?<\/(.|\n)*?>/ig;
        this.aaData = [];

        $self.addClass('j-ui')

        this.jui2 = {
            events: {},
            calcMaxWidth: true,
            cellWidth: [],
            scrollbarWidth: 0,
            initial: true,
            headerOffset: 0
        }

        this.param = {
            sEcho: 0,
            rand: 0,
            iTotalRecords: 0,
            iDisplayLength: 10,
            iDisplayStart: 0,
            iSortCol: 0,
            sSearch: '',
            sSortDir: 'desc',
            totalPage: 0
        }

        var text = $('<div>' + this.innerHTML + '</div>');
        text.children().remove()

        if (text[0].innerHTML.trim().replace(regxp, '') == "")
            this.aaData = [];
        else
            this.aaData = JSON.parse(text[0].innerHTML.replace(regxp, ''));

        this.innerHTML = jui2.tmpl['tableBase']();
        this.headerMenu = $self.find('> .j-table > .j-table-head-pop').attr('related-to', $self.prop('id'))
        jui2.recylerItem.push(this.headerMenu);

        /*setup menu event*/
        this.headerMenu.find('.j-table-sort-asc').click(function () {
            self.sort(self.headerMenu[0].column, 'asc');
        })

        this.headerMenu.find('.j-table-sort-desc').click(function () {
            self.sort(self.headerMenu[0].column, 'desc');
        })

        $(this.headerMenu).appendTo('body')

        var $body = $self.children('.j-table').children('.j-table-body'),
            $head = $self.children('.j-table').children('.j-table-head');

        if (self.setup) {
            self.setup();
        }

        //adding header
        this.addHeader(this.aaData.shift());
        this.setHeaderMenu();

        this.generateData(this.aaData);

        //$head()

        this.attrChangedCb(['disabled', 'icon'])

        this.maxWidth = [];

        for (i in jui2.method) {
            this[i] = jui2.method[i];
        }

        $self.delegate('> .j-table > .j-table-head > .j-table-head-row > div', 'doubletap dblclick', function (e) {
            self.setColumnMaxWidth(this);
        });

        $self.on('doubletap dblclick', '> .j-table > .j-table-body > .j-table-body-row', function () {
            if (self.jui2.events.onItemDoubleClick)
                self.jui2.events.onItemDoubleClick(self.aaData[$(this).index()]);
        })

        $(window).off('scrollchange.table' + self.juiid)

        $(window).on('scrollchange.table' + self.juiid, function () {
            if ($('#' + self.juiid).length == 0) {
                $(window).off('scrollchange.table' + self.juiid)
            }
            self.setWidth();
        })

        var $element = $self;
        var $follow = $element.find('.j-table-head');
        var followHeight = $element.find('.j-table-head').outerHeight();

        $(window).off('scroll.table' + self.juiid)

        $(window).on('scroll.table' + self.juiid, function () {
            var height = $element.outerHeight(),
                window_height = $(window).height();
            if ($('#' + self.juiid).length == 0) {
                $(window).off('scroll.table' + self.juiid)
            }
            var pos = $(window).scrollTop();
            var top = $element.offset().top;

            // Check if element totally above or totally below viewport
            if (top + height - followHeight < pos || top > pos + window_height) {
                return;
            }

            var offset = parseInt($(window).scrollTop() + 60 - top);

            if (offset > 0) {
                $follow.css('transform', 'translateY(' + (offset) + 'px)');
                self.jui2.headerOffset = offset;
            } else {
                $follow.css('transform', 'translateY(0px)');
                self.jui2.headerOffset = 0;
            }

        });
    };

    proto.generateData = function (data) {
        var $self = $(this),
            $body = $self.children('.j-table').children('.j-table-body');

        this.aaData = data || this.aaData;

        this.generatedData = $.extend(true, {}, this.aaData)

        $self.triggerHandler('j-table.beforedraw');

        $body.empty().append(jui2.tmpl['tableItems']({
            rows: this.generatedData, //.splice(0, $self[0].getHeaderContainer().children().last().children().length)
        }));

        $body.find('> div').click(function () {
            $(this).parent().children().removeClass('selected-top-border')
            $(this).addClass('selected').siblings().removeClass('selected')
            $(this).addClass('selected').prev().addClass('selected-top-border')
        })

        this.setWidth();

        this.addResizer($self.children('.j-table').find('> .j-table-head > .j-table-head-row > div'))

        $body.children().children(':nth-child(n+' + ($self[0].getHeaderContainer().children().last().children().length + 1) + ')').hide()

        $self.triggerHandler('afterdraw');
        $self.triggerHandler('j-table.afterdraw');
        $body.css('padding-top', $self[0].getHeaderContainer().height())
    }

    proto.setColumnMaxWidth = function (el) {
        var $el = $(el),
            $elItems = $(this).find('>.j-table > .j-table-body > .j-table-body-row > .j-table-body-column-' + el.column),
            $elWidth = $('<div style="position: absolute;visibility: hidden;height: auto;width: auto;white-space: nowrap;padding: 8px;"></div>').appendTo('body'),
            width = $elWidth.html(el.innerHTML).outerWidth(true);
        $elItems.each(function (i, val) {
            var w = $elWidth.html(val.innerHTML).outerWidth(true);
            if (w > width) {
                width = w;
            }
        })

        $elItems.css("flex", "1 0 " + width + "px") //.outerWidth(width)
        $el.css("flex", "1 0 " + width + "px") //.outerWidth(width)
        $(el).parent().children().each(function (i, el) {
            el.resizer_popper.update()
        })
        $elWidth.remove()
        $el.children().find('> .j-table-body > .j-table-body-row, > .j-table-head > .j-table-head-row').width($el.parent().children().sumWidth())
    }

    proto.addHeader = function (arrHeader, boundTo) {
        var $el = $(this),
            self = this,
            $headerContainer = self.getHeaderContainer(),
            $header = $(jui2.tmpl['tableHeader']({
                columns: arrHeader
            }));

        $header.children().each(function (i, val) {
            val.column = boundTo != undefined ? boundTo[i] : i;
        })

        $headerContainer.append($header);

        return $header;
    }

    proto.addResizer = function (el) {
        var $table = $(this)
        $(el).each(function (index, el) {
            if (el.resizer == undefined) {
                var $resizer = $('<div class="j-table-column-resizer" ontouchstart=""></div>')

                $table.children('.j-table').append($resizer);

                el.resizer = $resizer[0];
                $resizer[0].target = el;

                el.resizer_popper = new Popper(el, $resizer[0], {
                    placement: 'top-end',
                    modifiers: {
                        offset: {
                            offset: '0px, -' + $(el).outerHeight(true) + 'px'
                        }
                    },
                    onCreate: function (data) {
                        /*$resizer[0].position = {
                        	start: {
                        		x: 0,
                        		y: 0,
                        		offset: $resizer.offsetRelative().left
                        	}
                        }*/
                    },
                    eventsEnabled: false,
                    onUpdate: function (data) {

                        var translate = 'translate3d(' + ($(data.instance.reference).prevAll().sumWidth() + $(data.instance.reference).outerWidth() - 5) + 'px, 0px, 0px)'
                        data.instance.popper.style.webkitTransform = translate
                        data.instance.popper.style.MozTransform = translate
                        data.instance.popper.style.msTransform = translate
                        data.instance.popper.style.OTransform = translate
                        data.instance.popper.style.transform = translate
                        $(data.instance.popper).css('transform', translate)
                    }
                });

                $resizer[0].position = {
                    start: {
                        x: 0,
                        y: 0,
                        offset: $resizer.offsetRelative().left
                    }
                }

                $resizer.on('mousedown touchstart', function (e) {
                    var $el = $(this)
                    $el.addClass('j-table-column-resizer-active')
                    $el.css('width', '2px')
                    var clientX = e.type != 'touchstart' ? e.originalEvent.clientX : e.originalEvent.changedTouches[0].clientX;
                    this.position.start.x = clientX
                    this.position.start.offset = $resizer.offsetRelative().left

                    $('body')[0].dragEl = this;
                    $el.parent().addClass('j-no-select')
                })

                $('body').on("mouseup touchend", function (e) {
                    if (this.dragEl) {
                        var $el = $(this.dragEl)
                        $el.removeClass('j-table-column-resizer-active')
                        $el.css('width', '1px')
                        var clientX = e.type != 'touchend' ? e.originalEvent.clientX : e.originalEvent.changedTouches[0].clientX;
                        var translate = 'translate3d(' + (this.dragEl.position.start.offset + (clientX - this.dragEl.position.start.x)) + 'px, 0px, 0px)',
                            resizer = this.dragEl
                        this.dragEl.style.webkitTransform = translate
                        this.dragEl.style.MozTransform = translate
                        this.dragEl.style.msTransform = translate
                        this.dragEl.style.OTransform = translate
                        this.dragEl.style.transform = translate

                        var self = $(this.dragEl).parent('.j-table').parent()[0],
                            $table = $(this.dragEl).parent('.j-table');
                        var elWidth = $(this.dragEl.target).outerWidth(true) + (clientX - this.dragEl.position.start.x),
                            allWidth = $table.find('> .j-table-body > .j-table-body-row, > .j-table-head').outerWidth(true) + (clientX - this.dragEl.position.start.x),
                            elNextWidth = $(this.dragEl.target).next().outerWidth(true) - (clientX - this.dragEl.position.start.x);

                        $target = $(this.dragEl.target)
                        $target.css("flex", "1 0 " + elWidth + "px") /*.outerWidth(elWidth)*/ /*.next().css("flex", "1 0 " + elNextWidth + "px")*/ //.outerWidth(elNextWidth)
                        self.jui2.cellWidth[$target.index()] = elWidth;

                        $table.removeClass('j-no-select')
                        $table.find('> .j-table-body > .j-table-body-row > .j-table-body-column-' + this.dragEl.target.column).css("flex", "1 0 " + elWidth + "px") /*.outerWidth(elWidth)*/ /*.next().css("flex", "1 0 " + elNextWidth + "px")*/ //.outerWidth(elNextWidth)
                        /*console.log($target.parent().children().sumWidth())
                        if(allWidth < $target.parent().children().sumWidth()){
                            $target.next().css("flex", "1 0 " + elNextWidth + "px");
                            $table.find('> .j-table-body > .j-table-body-row > .j-table-body-column-' + this.dragEl.target.column).next().css("flex", "1 0 " + elNextWidth + "px")
                        }*/
                        $table.find('> .j-table-body > .j-table-body-row, > .j-table-head > .j-table-head-row').width(allWidth)
                        $table.find('> .j-table-body > .j-table-body-row, > .j-table-head').width(allWidth)

                        $table.find('> .j-table-body > .j-table-body-row, > .j-table-head > .j-table-head-row').width($target.parent().children().sumWidth())
                        $table.find('> .j-table-body > .j-table-body-row, > .j-table-head').width($target.parent().children().sumWidth())

                        /*if(allWidth < $target.parent().children().sumWidth()){
                            $target.next().css("flex", "1 0 " + elNextWidth + "px");
                            $table.find('> .j-table-body > .j-table-body-row > .j-table-body-column-' + this.dragEl.target.column).next().css("flex", "1 0 " + elNextWidth + "px")
                        }*/

                        $target.parent().children().each(function (i, el) {
                            el.resizer_popper.update()
                        })
                    }
                    this.dragEl = undefined;
                })

                $('body').on("mousemove touchmove", function (e) {
                    if (this.dragEl != undefined) {
                        var table = $(this.dragEl).parent()[0];
                        var clientX = e.type != 'touchmove' ? e.originalEvent.clientX : e.originalEvent.changedTouches[0].clientX;
                        var translate = 'translate3d(' + (this.dragEl.position.start.offset + (clientX - this.dragEl.position.start.x) + table.scrollLeft) + 'px, 0px, 0px)'
                        this.dragEl.style.webkitTransform = translate
                        this.dragEl.style.MozTransform = translate
                        this.dragEl.style.msTransform = translate
                        this.dragEl.style.OTransform = translate
                        this.dragEl.style.transform = translate
                    }
                })
            }
        });
    }

    proto.getHeaderContainer = function () {
        var $el = $(this)
        return $el.find('.j-table > .j-table-head');
    }

    proto.getBodyContainer = function () {
        var $el = $(this)
        return $el.find('.j-table > .j-table-body');
    }

    proto.setWidth = function () {
        var self = this,
            $self = $(this),
            $header = this.getHeaderContainer(),
            $body = this.getBodyContainer();

        if (this.jui2.calcMaxWidth) {
            $header.children('.j-table-head-row').children().each(function (i, val) {
                self.jui2.cellWidth[i] = $(val).outerWidth(true);
            })
            $.each(this.jui2.cellWidth, function (i, val) {
                var width = Math.max.apply(null, $body.find('> div > div:nth-child(' + (i + 1) + ')').map(function () {
                    return $(this).outerWidth(true);
                }).get());
                self.jui2.cellWidth[i] = width > self.jui2.cellWidth[i] ? width : self.jui2.cellWidth[i];
            })
        }

        if (this.aaData.length > 0) {
            this.jui2.calcMaxWidth = false
        }

        var maxWidthKey = $.maxKey(self.jui2.cellWidth);

        var count = 0;
        for (var i = self.jui2.cellWidth.length; i--;) {
            count += self.jui2.cellWidth[i];
        }

        this.jui2.cellWidth[maxWidthKey] += $header.width() - count;

        var scrollWidth = 0;

        //console.log($(this).children().width() - $(this).children().children('.j-table-head').width())
        if (this.aaData.length > 0 && !this.jui2.initial) {
            $(this).children().children('.j-table-head').css('position', 'absolute')
            if ($('body').hasScrollBar()) {
                this.jui2.scrollbarWidth = scrollWidth = $.scrollbarWidth();
            } else if (this.jui2.scrollbarWidth != 0) {
                scrollWidth = -this.jui2.scrollbarWidth;
                this.jui2.scrollbarWidth = 0;
            }
        }
        /*else if($(this).children().width() - $(this).children().children('.j-table-head').width() == $.scrollbarWidth()){
            scrollWidth = 0;
        }*/

        //if(this.jui2.initial && $(this).children().width() < Math.round(count) && this.aaData.length > 0){
        if (count != $(this).children().width())
            self.jui2.cellWidth[self.jui2.cellWidth.length - 1] = self.jui2.cellWidth[self.jui2.cellWidth.length - 1] - scrollWidth;
        //}

        $.each(self.jui2.cellWidth, function (i, val) {
            $header.find('> div > div:nth-child(' + (i + 1) + ')').css("flex", "1 0 " + val + "px") //.outerWidth(val)
            $body.find('> div > div:nth-child(' + (i + 1) + ')').css("flex", "1 0 " + val + "px") //.outerWidth(val)
        })

        if ($(this).children().width() - $(this).children().children('.j-table-head').width() == $.scrollbarWidth()) {
            scrollWidth = -$.scrollbarWidth();
        }

        count = 0;
        for (var i = self.jui2.cellWidth.length; i--;) {
            count += self.jui2.cellWidth[i];
        }

        //var rowWidth = count//$header.children().eq(0).children().sumWidth() - scrollWidth

        $(this).children().find('> .j-table-body > .j-table-body-row, > .j-table-head > .j-table-head-row').width(count)

        $(this).children().find('> .j-table-body > .j-table-body-row, > .j-table-head').width(count)

        $body.find('> div > div').css('white-space', 'normal')

        $(this).children().find('> .j-table-body > .j-table-body-row, > .j-table-head > .j-table-head-row').children().each(function (i, el) {
            if (el.resizer_popper) {
                el.resizer_popper.update()
            }
        })

        if (this.aaData.length > 0 && this.jui2.initial) {
            $(this).children().children('.j-table-head').css('transform', 'translateY(0px)').css('position', 'absolute')
            this.jui2.initial = false
        }
    }

    proto._sort = function (column, sort) {
        if (sort == 'asc')
            this.aaData.sort(function (a, b) {
                return a[column] - b[column]
            })
        if (sort == 'desc')
            this.aaData.sort(function (a, b) {
                return b[column] - a[column]
            })
        this.sortColumn = column;
    }

    proto.sort = function (column, sort) {
        if (this.fnSort) {
            this.fnSort(column, sort)
        } else {
            this._sort(column, sort);
        }
        this.generateData();
    }

    proto.setHeaderMenu = function () {
        var self = this,
            $self = $(this),
            $header = this.getHeaderContainer(),
            $body = this.getBodyContainer();
        $('body').click(function (e) {
            if ($(e.target).closest('.j-table-head-action').length == 0 && $(e.target).parents('.j-pop').length == 0) {
                var $jtable = $('#' + $('body').find('> .j-table-head-pop:visible').attr('related-to'))
                $jtable.find('.j-table-head-action:visible').removeAttr('style');
                if ($jtable.length > 0) {
                    //$jtable.find('.j-table-head-action').hide()
                    $jtable.each(function (i, val) {
                        val.jui_popper_id = null;
                        val.headerMenu.hide()
                    })
                }
            }
        })

        $header.find('.j-table-head-action').click(function () {
            var $self = $(this).closest('j-table'),
                $headerMenu = $self[0].headerMenu,
                $headAction = $(this);
            $headerMenu[0].column = $(this).parent()[0].column;
            $headAction.parent().siblings().children('.j-table-head-action').removeAttr('style');
            $('j-table').find('.j-table-head-action:visible').not($headAction).removeAttr('style').closest('j-table').each(function (i, val) {
                val.jui_popper_id = null;
                val.headerMenu.hide()
            });
            $('body').find('> .j-table-head-pop:not([related-to=' + $headAction.closest('j-table').prop('id') + '])').hide()

            if ($self[0].jui_popper_id != this) {
                if ($self[0].jui_popper)
                    $self[0].jui_popper.destroy()
                $headerMenu.hide()
                $headerMenu.show()
                $headAction[0].jui_popper = new Popper(this, $headerMenu[0], {
                    placement: 'bottom-start',
                    onCreate: function (data) {
                        $header.find('> .j-table-head-action').css('display', '')
                        $headAction.css('display', 'block')
                        $(data.instance.popper).find('.j-pop-children').hide()

                        $(data.instance.popper).find('.j-pop-children').each(function (i, val) {

                            $(val).parent().on('mouseover', function (e) {
                                var $el = $(this)
                                if ($el.children('.j-pop-children')[0].jui_popper)
                                    $el.children('.j-pop-children')[0].jui_popper.destroy()
                                $el.children('.j-pop-children')[0].jui_popper = new Popper($el[0], $el.children('.j-pop-children')[0], {
                                    placement: 'right-start'
                                });

                                $el.children('.j-pop-children').show();

                                $el.siblings().on('mouseover', function (e) {
                                    $el.find('.j-pop-children').hide();
                                    e.stopPropagation()
                                })
                                e.stopPropagation()
                            })
                        })
                    }
                });
            } else {
                //$('.j-table-head-pop').is(':visible') ? ($('.j-table-head-pop').hide(), el.css('display', ''), $('.j-table-columns-pop').hide()) : ($('.j-table-head-pop').show(), //el.css('display', 'block'))
            }
            $self[0].jui_popper_id = this;
        })
    }

    proto.onItemDoubleClick = function (fn) {
        $(this).find('> .j-table > .j-table-body').css('cursor', 'pointer');
        this.jui2.events.onItemDoubleClick = fn;
    }

    proto.offItemDoubleClick = function (fn) {
        $(this).find('> .j-table > .j-table-body').css('cursor', '');
        this.jui2.events.onItemDoubleClick = null;
    }

    proto.getRow = function (index) {
        return $(this).find('> .j-table > .j-table-body > .j-table-body-row').eq(index);
    }

    proto.getRecord = function (index) {
        return this.aaData[index];
    }

    proto.attachedCallback = function () {
        /*for (i in this.attributes) {
        	var attrName = this.attributes[i].nodeName,
        		newVal = this.attributes[i].nodeValue;
        	if (jui2.attrChange[this.tagName.toLowerCase() + '_' + attrName])
        		jui2.attrChange[this.tagName.toLowerCase() + '_' + attrName](this, false, newVal);
        	else if (jui2.attrChange[attrName] && this.enabledAttrChange.indexOf(attrName) > -1)
        		jui2.attrChange[attrName](this, false, newVal);
        }*/
        //$(this).triggerHandler('afterdraw')
    }

    proto.attributeChangedCallback = function (attrName, oldVal, newVal) {
        if (jui2.attrChange[this.tagName.toLowerCase() + '_' + attrName])
            jui2.attrChange[this.tagName.toLowerCase() + '_' + attrName](this, false, newVal);
        else if (jui2.attrChange[attrName] && this.enabledAttrChange.indexOf(attrName) > -1)
            jui2.attrChange[attrName](this, false, newVal);
    }

    jui2.ui.table = {
        widget: document.registerElement('j-table', {
            prototype: proto
        }),
        proto: proto
    }

    jui2.attrChange['j-table_src-array'] = function (el, oldVal, newVal) {
        if (newVal != null) {
            if (el.generateData_ == undefined)
                el.generateData_ = el.generateData;
            el.generateData = function (data) {
                if (typeof data == 'array') {
                    el.generateData_(data);
                }
                if (!data) {
                    el.generateData_(eval(newVal));
                }
            }
        } else {

        }
    }

    jui2.attrChange['j-table_src-fn'] = function (el, oldVal, newVal) {
        if (newVal != null) {
            if (el.generateData_ == undefined)
                el.generateData_ = el.generateData;
            el.generateData = function (data) {
                if (typeof data == 'array' || typeof data == 'object') {
                    el.generateData_(data);
                }
                if (!data) {
                    el.generateData_(eval(newVal).call());
                }
            }
            el.generateData()
        } else {

        }
    }

    jui2.attrChange['j-table_src-ajax'] = function (el, oldVal, newVal) {
        var $el = $(el);
        if (newVal != null) {
            if (el.generateData_ == undefined)
                el.generateData_ = el.generateData;
            el.generateData = function (data) {
                if (typeof data == 'array') {
                    el.generateData_(data);
                }
                if (!data) {
                    $.getJSON(newVal, param, function (data) {
                        if (data.sEcho == el.param.sEcho) {
                            el.aaData = data.aaData;
                            el.param.iTotalRecords = data.iTotalRecords;
                            el.param.totalPage = Math.ceil(el.param.iTotalRecords / el.param.iDisplayLength)
                            el.generateData_(data.aaData);
                        }
                    })
                }
            }
        } else {

        }
    }

}(jQuery));
;/****js/pagination.js****/
(function ($) {

    jui2.attrChange['j-table_paging'] = function(el, oldVal, newVal){
        if (newVal != null) {
            var $el = $(el);
            $el.append('<j-toolbar class="j-table-pagination" style="align-items: baseline;"><j-button class="j-table-first"><i class="fa fa-fast-backward"></i></j-button> <j-button class="j-table-prev"><i class="fa fa-backward"></i></j-button> <j-textfield class="j-table-page" no-label="true" style="width: 60px;"></j-textfield> <j-button class="j-table-next"><i class="fa fa-forward"></i></j-button> <j-button class="j-table-last"><i class="fa fa-fast-forward"></i></j-button><j-spacer></j-spacer><span class="j-table-data-info"></span></j-toolbar>');

            $el.on('j-table.afterdraw', function(){
                var last = (el.param.iDisplayStart+el.param.iDisplayLength);
                if(last>el.param.iTotalRecords)
                    last = el.param.iTotalRecords
                $el.children('.j-table-pagination').children('.j-table-data-info').html((el.param.iDisplayStart+1)+'-'+last+'/'+el.param.iTotalRecords);
            })

            $el.children('.j-table-pagination').children('.j-table-page').on('afterdraw', function(){
                $el.children('.j-table-pagination').children('.j-table-page').val(1);
            })

            /*$el.children('.j-table-pagination').children('.j-table-page').val(1)

            console.log($el.children('.j-table-pagination').children('.j-table-page'))
            $el.children('.j-table-pagination').children('.j-table-page').setup = function(el){
                console.log('aaa')
                $el.children('.j-table-pagination').children('.j-table-page').val(1)
            }*/

            $el.children('.j-table-pagination').children('.j-table-first').click(function(){
                el.param.iDisplayStart = 0;
                el.generateData();
            })

            $el.children('.j-table-pagination').children('.j-table-prev').click(function(){
                el.param.iDisplayStart -= el.param.iDisplayLength;
                el.generateData();
                $el.children('.j-table-pagination').children('.j-table-page').val(Math.floor((el.param.iDisplayStart+el.param.iDisplayLength)/el.param.iDisplayLength))
            })

            $el.children('.j-table-pagination').children('.j-table-next').click(function(){
                el.param.iDisplayStart += el.param.iDisplayLength;
                el.generateData();
                $el.children('.j-table-pagination').children('.j-table-page').val(Math.floor((el.param.iDisplayStart+el.param.iDisplayLength)/el.param.iDisplayLength))
            })

            $el.children('.j-table-pagination').children('.j-table-last').click(function(){
                var mod = (el.param.iTotalRecords % el.param.iDisplayLength);
                mod = mod == 0 ? el.param.iDisplayLength : mod;
                el.param.iDisplayStart = el.param.iTotalRecords - mod;
                el.generateData();
                $el.children('.j-table-pagination').children('.j-table-page').val(Math.floor((el.param.iDisplayStart+el.param.iDisplayLength)/el.param.iDisplayLength))
            })
        }
        else{
            $el = $(el);
            $el.children('.j-table-pagination').remove();
        }
    }
}(jQuery));
;/****js/custom.js****/
(function ($) {

    jui2.attrChange['j-table_custom'] = function(el, oldVal, newVal){
        if (newVal != null) {
            var $el = $(el);
            $el.on('j-table.beforedraw', function(){
                for(var i=0; i<el.aaData.length; i++){
                    el.generatedData[i] = eval(newVal).call(this, el.aaData[i])
                }
            })
        }
        else{

        }
    }
}(jQuery));
;/****js/panel.js****/
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

		jui2.ui.base.proto.createdCallback.call(this, jui2.ui.panel);

		var $self = $(this)

		this.attrChangedCb(['disabled', 'icon'])

		for(i in jui2.method){
			this[i] = jui2.method[i];
		}
	};

	proto.attachedCallback = function() {
		/*for (i in this.attributes) {
			var attrName = this.attributes[i].nodeName,
				newVal = this.attributes[i].nodeValue;
			if (jui2.attrChange[this.tagName.toLowerCase() + '_' + attrName])
				jui2.attrChange[this.tagName.toLowerCase() + '_' + attrName](this, false, newVal);
			else if (jui2.attrChange[attrName] && this.enabledAttrChange.indexOf(attrName) > -1)
				jui2.attrChange[attrName](this, false, newVal);
		}
		console.log('a')*/
		$(this).triggerHandler('afterdraw')
	}

	proto.attributeChangedCallback = function(attrName, oldVal, newVal) {
		if (jui2.attrChange[this.tagName.toLowerCase() + '_' + attrName])
			jui2.attrChange[this.tagName.toLowerCase() + '_' + attrName](this, false, newVal);
		else if (jui2.attrChange[attrName] && this.enabledAttrChange.indexOf(attrName) > -1)
			jui2.attrChange[attrName](this, false, newVal);
	}

	jui2.ui.panel = {
		widget: document.registerElement('j-panel',  {
			prototype: proto
		}),
		proto: proto
	}

	jui2.attrChange['j-panel_collapsible'] = function(el, oldVal, newVal) {
		var $el = $(el);
		if(eval(newVal) === true){
			$el.children('.j-header').append('<j-spacer></j-spacer><i class="fa fa-chevron-up j-collapser"></i>');
		}
		else{
			$el.children('.j-header').children('.j-collapser').remove().prevAll('j-spacer').last().remove()
		}
	}

}(jQuery))
;
;/****js/collapsible.js****/
(function($){

	$(document).delegate('.j-collapser', 'click', function() {
		var el = $(this), $target = el.parents('[collapsible=true]')
		if (!$target.attr("collapsed")) {
			var height = el.parent().parent().height();
			$target.attr("collapsed", "")
			$target.animate({
				height: el.parent().outerHeight()
			}, 250, function() {
				$target.attr("collapsed", height)
				el.removeClass('fa-chevron-up').addClass('fa-chevron-down')
			})
		} else {
			var h = $target.attr("collapsed");
			$target.removeAttr("collapsed")
			$target.animate({
				height: h
			}, 250, function() {
				el.removeClass('fa-chevron-down').addClass('fa-chevron-up')
			})
		}
	})

}(jQuery))
;
