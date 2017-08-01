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
