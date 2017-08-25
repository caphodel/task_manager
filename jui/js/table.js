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

		var $self = $(this), regxp = /<(.|\n)*?>(.|\n)*?<\/(.|\n)*?>/ig;
		this.aaData = [];

		var text = $('<div>' + this.innerHTML + '</div>');
		text.children().remove()

		if (text[0].innerHTML.trim().replace(regxp, '') == "")
			this.aaData = [];
		else
			this.aaData = JSON.parse(text[0].innerHTML.replace(regxp, ''));

		this.innerHTML = jui2.tmpl['tableBase']();

		var $body = $self.children('.j-table').children('.j-table-body'), $head = $self.children('.j-table').children('.j-table-head');

		//adding header
		this.addHeader(this.aaData.shift());
		this.setHeaderMenu();

		this.generateData(this.aaData);

		//$head()

		this.attrChangedCb(['disabled', 'icon'])

		for(i in jui2.method){
			this[i] = jui2.method[i];
		}
	};

	proto.generateData = function(data){
		var $self = $(this), $body = $self.children('.j-table').children('.j-table-body');

		this.data = data || this.data;

		$body.empty().append(jui2.tmpl['tableItems']({rows: this.data}));

		$body.find('> div').click(function() {
			$(this).parent().children().removeClass('selected-top-border')
			$(this).addClass('selected').siblings().removeClass('selected')
			$(this).addClass('selected').prev().addClass('selected-top-border')
		})

		this.setWidth();

		$self.triggerHandler('afterdraw');
	}

	proto.addHeader = function(arrHeader){
		var $el = $(this), self = this, $headerContainer = self.getHeaderContainer(), header = jui2.tmpl['tableHeader']({columns: arrHeader});

		$headerContainer.append(header);

		return $(header);
	}

	proto.getHeaderContainer = function(){
		var $el = $(this)
		return $el.find('.j-table > .j-table-head');
	}

	proto.getBodyContainer = function(){
		var $el = $(this)
		return $el.find('.j-table > .j-table-body');
	}

	proto.setWidth = function(){
		var cellWidth = [], self = this, $self = $(this), $header = this.getHeaderContainer(), $body = this.getBodyContainer();

		$header.children('.j-table-head-row').children().each(function(i, val) {
			cellWidth[i] = $(val).width();
		})

		//console.log(cellWidth)

		$.each(cellWidth, function(i, val) {
			var width = Math.max.apply(null, $body.find('> div > div:nth-child(' + (i + 1) + ')').map(function() {
				return $(this).width();
			}).get());
			cellWidth[i] = width > cellWidth[i] ? width : cellWidth[i];
		})

		var maxWidthKey = $.maxKey(cellWidth);

		var count=0;
		for (var i=cellWidth.length; i--;) {
			count+=cellWidth[i];
		}

		cellWidth[maxWidthKey] += $header.width() - count;

		//console.log($header.width(), cellWidth, count )

		$.each(cellWidth, function(i, val) {
			$header.find('> div > div:nth-child(' + (i + 1) + ')').width(val)
			$body.find('> div > div:nth-child(' + (i + 1) + ')').width(val)
		})

		$body.find('> div > div').css('white-space', 'normal')
	}

	proto.setHeaderMenu = function(){
		var self = this, $self = $(this), $header = this.getHeaderContainer(), $body = this.getBodyContainer();
		$('body').click(function(e) {
			if ($(e.target).parents('.j-table-head-action').length == 0 && e.target.className.match(/j-table-head-action/) == null && $(e.target).parents('.j-pop').length == 0) {
				var $jtable = $('j-table');
				$jtable.find('> .j-table > .j-table-head .j-table-head-action').css('display', '');
				$jtable[0].jui_popper_id = null;
				$jtable.find('> .j-table > .j-table-head-pop').hide()
			}
		})

		$header.find('.j-table-head-action').click(function() {
			var $headerMenu = $self.find('> .j-table > .j-table-head-pop'), $headAction = $(this);
			if ($self[0].jui_popper_id != this) {
				if ($self[0].jui_popper)
					$self[0].jui_popper.destroy()
				$headerMenu.hide()
				$headerMenu.show()
				$headAction[0].jui_popper = new Popper(this, $headerMenu[0], {
					placement: 'bottom-start',
					onCreate: function(data) {
						$header.find('> .j-table-head-action').css('display', '')
						$headAction.css('display', 'block')
						$(data.instance.popper).find('.j-pop-children').hide()

						$(data.instance.popper).find('.j-pop-children').each(function(i, val) {

							$(val).parent().on('mouseover', function(e) {
								var $el = $(this)
								if ($el.children('.j-pop-children')[0].jui_popper)
									$el.children('.j-pop-children')[0].jui_popper.destroy()
								$el.children('.j-pop-children')[0].jui_popper = new Popper($el[0], $el.children('.j-pop-children')[0], {
									placement: 'right-start'
								});

								$el.children('.j-pop-children').show();

								$el.siblings().on('mouseover', function(e) {
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

	proto.attachedCallback = function() {
		/*for (i in this.attributes) {
			var attrName = this.attributes[i].nodeName,
				newVal = this.attributes[i].nodeValue;
			if (jui2.attrChange[this.tagName.toLowerCase() + '_' + attrName])
				jui2.attrChange[this.tagName.toLowerCase() + '_' + attrName](this, false, newVal);
			else if (jui2.attrChange[attrName] && this.enabledAttrChange.indexOf(attrName) > -1)
				jui2.attrChange[attrName](this, false, newVal);
		}*/
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

	jui2.attrChange['jtable_ajax-loader'] = function(el, oldVal, newVal) {
		var $el = $(el);
		if(newVal != null){
			el.param = {
				sEcho: 0,
				rand: 0,
				iTotalRecords: 0,
				iDisplayLength: el.getAttribute('size') || 10,
				iDisplayStart: 0,
				iSortCol: 0,
				sSearch: '',
				sSortDir: 'desc',
				totalPage: 0
			}
			el.generateData_ = el.generateData;
			el.generateData = function(data){
				if(typeof data == 'array'){
					el.generateData_(data);
				}
				if(!data){
					$.getJSON(newVal, param, function(data){
						if(data.sEcho == el.param.sEcho){
							el.aaData = data.aaData;
							el.param.iTotalRecords = data.iTotalRecords;
							el.param.totalPage = Math.ceil(el.param.iTotalRecords/el.param.iDisplayLength)
							el.generateData_(data.aaData);
						}
					})
				}
			}
		}
		else{

		}
	}

}(jQuery))
;
