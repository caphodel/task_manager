
/**
 * @classdesc Datefield custom web component
 * @class dateField
 * @property {string} format Date formatting for datefield value, format conventions using momentjs formatting conventions see <a href="http://momentjs.com/docs/#/displaying/">http://momentjs.com/docs/#/displaying/</a>
 * @example <caption>Datefield widget basic usage</caption>
 * <j-datefield id="date">Date</j-datefield>
 * @example <caption>Datefield formatting</caption>
 * <j-datefield format="DD MMM YYYY">Date</j-datefield>
 * @augments textField
 */
//TODO: clearing and trimming code
(function($){

	var proto = Object.create(HTMLElement.prototype)

	proto.createdCallback = function(type) {
		jui2.ui.base.proto.createdCallback.call(this, jui2.ui.dateField);

		var $self = $(this), $table, self = this, id = this.juiid, tag = $self.prop('tagName'), defFormat = "MMMM YYYY"

		this.setAttribute("icon", "fa-calendar");

		jui2.ui.textField.proto.createdCallback.call(this, '')

		if(!$self.attr('format')){
			$self.attr('format', 'DD/MM/YYYY')
		}

		var initDate = moment($self.val(), $self.attr('format')).format(defFormat)
		if(initDate == 'Invalid date')
			initDate = moment().format(defFormat)
		if(type)
			$self.append(jui2.tmpl[type]({day: jui2.lang.day.en, month: initDate}));
		else
			$self.append(jui2.tmpl['calendar']({day: jui2.lang.day.en, month: initDate}));

		$table = $self.children('table')

		$table.find('.fa-chevron-left').parent().click(function(){
			self.prevMonth($table, $self.attr('format'), $self)
		})

		$table.find('.fa-chevron-right').parent().click(function(){
			self.nextMonth($table, $self.attr('format'), $self)
		})

		$table.find('tfoot j-button').click(function(){
			var format = $self.attr('format'), fromDate = $self.attr('from') != undefined ? moment($self.attr('from'), format) : null,
			toDate = $self.attr('to') != undefined ? moment($self.attr('to'), format) : null,
			today = moment(moment().format('YYYY-MM-DD'), 'YYYY-MM-DD');

			if(today.isBetween(fromDate, toDate, null, '[]') || today.isSame(fromDate) || today.isSame(toDate)){
				$self.val(moment().format($self.attr('format')))
				$table.detach().appendTo($self);
				$('#j-dateField-'+id).remove();
				$table.hide();
				/**
				 * Fires when date selected
				 * @event select
				 * @param {object} event Event object
				 * @param  {String} value Selected value
				 * @memberof dateField
				 * @example
				 * <j-datefield id="myDatefield1">Date</j-datefield>
				 * <script>
				 * $('#myDatefield1').on('select', function(e, value){
				 * 	console.log(value) // will print value you selected from datefield in javascript console
				 * })
				 * </script>
				 */
				$self.triggerHandler('select', [$self.val()]);
			}
			else{

			}
		})
		//self.timestamp = 0

		$(document).off('click.out.'+id).on('click.out.'+id, function(event){
			if(event.target != $self[0] && $(event.target).parents('#'+$self.attr('id')).length == 0 && $(event.target).parents('[belongto=j-dateField]').length == 0/* && self.timestamp != event.timestamp*/){
				$table.detach().appendTo($self);
				$('#j-dateField-'+id).remove();
				$table.hide();
			}
		})

		/*$self.unbind('clickout').bind( "clickout", function(event){
			if(event.target != $self[0] && $(event.target).parents('#'+$self.attr('id')).length == 0 && $(event.target).parents('[belongto=j-dateField]').length == 0){
				$table.detach().appendTo($self);
				$('#j-dateField-'+id).remove();
				$table.hide();
			}
		});*/

		$table.delegate('tbody td:not(.j-disable)', 'click', function(e){
			e.stopPropagation();
			var elNum = parseInt(this.innerHTML), $this = $(this);

			if($this.index()<7 && $this.parent().parent().parent().parent().hasClass('j-modal-body')){
				var $dateText = $table.find('thead tr:first-child th:nth-child(2)');
				if($this.parent().index()==0){
					if($this.nextAll().filter(function( index ) {
						return parseInt(this.innerHTML) < elNum
					}).length > 0){
						$dateText.text(moment($dateText.text(), defFormat).subtract(1, 'month').format(defFormat))
					}
				}
				else if($this.parent().index()==($this.parent().siblings().length-1)){
					if($this.prevAll().filter(function( index ) {
						return parseInt(this.innerHTML) > elNum
					}).length > 0){
						$dateText.text(moment($dateText.text(), defFormat).add(1, 'month').format(defFormat))
					}
				}
				$self.val(moment(('00'+elNum).slice(-2)+' '+$dateText.text(), 'DD MMMM YYYY').format($self.attr('format')))
				$table.detach().appendTo($self);
				$('#j-dateField-'+id).remove();
				$table.hide();
				/**
				 * Fires when date selected
				 * @event select
				 * @param {object} event Event object
				 * @param  {String} value Selected value
				 * @memberof dateField
				 * @example
				 * <j-datefield id="myDatefield1">Date</j-datefield>
				 * <script>
				 * $('#myDatefield1').on('select', function(e, value){
				 * 	console.log(value) // will print value you selected from datefield in javascript console
				 * })
				 * </script>
				 */
				$self.triggerHandler('select', [$self.val()]);
			}
		})

		$self.delegate($self.children().not('table'), 'click', function(e){

			if($(e.target).parents('table')[0] != $table[0] && e.target != $table[0]){
				$table.toggle();
				if($table.is(':visible')){
					if($('#j-dateField-'+id).length==0)
						$('body').append('<j-modal belongto="j-dateField" snapto="#'+$self.attr('id')+' > input" snappos="topleft to bottomleft" id="j-dateField-'+id+'" height="250px"></j-modal>');
					setTimeout(function(){
						var $modal = $('#j-dateField-'+id)
						if($modal.touchBottom()){
							$modal.attr('snappos', 'bottomleft to topleft')
							setTimeout(function(){
								if($modal.touchTop())
									$modal.attr('snappos', 'topleft to bottomleft')
							}, 250);
						}
					}, 250)
					if($('#j-dateField-'+id+' .j-modal-body').length>0)
						$table.detach().appendTo('#j-dateField-'+id+' .j-modal-body')
					else
						$table.detach().appendTo('#j-dateField-'+id)

					var date = [], lastDate, startDate, w = [], i = 0, format = $self.attr('format'), fromDate, toDate;
					//$table.css('z-index', z == '-Infinity' ? 100 : z);

					//m = moment($self.val(), $self.attr('format'))

					lastDate = moment($self.val(), format).endOf('month').endOf('week').add(1, 'day')
					if(lastDate == 'Invalid date' || lastDate.format(format) == 'Invalid date')
						lastDate = moment().endOf('month').endOf('week').add(1, 'day')
					startDate = moment($self.val(), format).startOf('month').startOf('week')
					if(startDate == 'Invalid date' || startDate.format(format) == 'Invalid date')
						startDate = moment().startOf('month').startOf('week')

					fromDate = $self.attr('from') != undefined ? moment($self.attr('from'), format) : null
					toDate = $self.attr('to') != undefined ? moment($self.attr('to'), format) : null

                    console.log($self.val())

					var today = $self.val().trim() == '' ? moment() : moment($self.val(), format), formatToday = today.format('DD/MM/YYYY'), thisMonth = false;

					while(startDate.format('DD/MM/YYYY') != lastDate.format('DD/MM/YYYY')){
						w[w.length] = {date: startDate.format('D'), class: (startDate.isBetween(fromDate, toDate, null, '[]') ? '': 'j-disable')}
						i++;
						if(startDate.format('DD/MM/YYYY')==formatToday)
							thisMonth = true
						startDate.add(1, 'day');
						if(i==7){
							i=0;
							date[date.length] = w;
							w = [];
						}
					}

					w[w.length] = startDate.format('D')
					startDate.add(1, 'day');

					if(w.length > 0)
						date[date.length] = w;
					$table.find('> tbody').empty().append(jui2.tmpl['calendarBody']({date: date}));

					if(thisMonth){
						var dy = $table.find('> tbody').find('td').filter(function(){ return this.innerHTML == today.format('D')})
						if(parseInt(today.format('D'))<15)
							dy.first().css('background', '#d6e8f6');
						else {
							dy.last().css('background', '#d6e8f6');
						}
					}
					$self.triggerHandler('calendarshow', [$table]);
				}
				else{
					$table.detach().appendTo($self);
					$('#j-dateField-'+id).remove();
				}
			}
		});

		jui2.keycodes.bind(this, "tab")
		/*--*
		 * Fires after dateField created
		 * @event afterdraw
		 * @instance
		 * @memberof dateField
		 * @example
		 * <j-datefield id="myDatefield2">Date</j-datefield>
		 * <script>
		 * $('#myDatefield2').on('afterdraw', function(value){
		 * 	console.log('Datefield created')
		 * })
		 * </script>
		 --*/
		//$self.triggerHandler('afterdraw')

		if(this.value || this.value == ''){
			if(this.value.trim()!=''){
				var tmpValue = this.value
				$(this).val(tmpValue);
			}
			delete this.value;
		}

		$self.on('keydown', function(e){
			if(e.keyCode == 8){
				$self.val('');
				$table.detach().appendTo($self);
				$('#j-dateField-'+id).remove();
				$table.hide();
			}
		})

		this.enabledAttrChange = $.unique(this.enabledAttrChange.concat(['disabled', 'icon', 'placeholder', 'readonly']));

    for(i in this.attributes){
			var attrName = this.attributes[i].nodeName,
			newVal = this.attributes[i].nodeValue;
      if(jui2.attrChange[this.tagName.toLowerCase()+'_'+attrName])
  			jui2.attrChange[this.tagName.toLowerCase()+'_'+attrName](this, false, newVal);
      else if(jui2.attrChange[attrName] && this.enabledAttrChange.indexOf(attrName) > -1)
        jui2.attrChange[attrName](this, false, newVal);
		}

	};

/**
 * Go to previous month
 * @method prevMonth
 * @memberof dateField
 * @instance
 */
	proto.prevMonth = function(table, format, $self){
		var date = [], lastDate, startDate, w = [], i = 0, $table = table, defFormat = "MMMM YYYY", fromDate, toDate, $self = $(this);
		lastDate = moment(table.find('tr:first-child th:nth-child(2)').text(), defFormat).subtract(1, 'month').endOf('month').endOf('week').add(1, 'day')
		startDate = moment(table.find('tr:first-child th:nth-child(2)').text(), defFormat).subtract(1, 'month').startOf('month').startOf('week')

		fromDate = $self.attr('from') != undefined ? moment($self.attr('from'), format) : null
		toDate = $self.attr('to') != undefined ? moment($self.attr('to'), format) : null

		while(startDate.format('DD/MM/YYYY') != lastDate.format('DD/MM/YYYY')){
			w[w.length] = {date: startDate.format('D'), class: (startDate.isBetween(fromDate, toDate, null, '[]') ? '': 'j-disable')}
			i++;
			startDate.add(1, 'day');
			if(i==7){
				i=0;
				date[date.length] = w;
				w = [];
			}
		}
		w[w.length] = startDate.format('D')
		startDate.add(1, 'day');
		if(w.length > 0)
			date[date.length] = w;

		$table.find('thead tr:first-child th:nth-child(2)').text(moment(table.find('tr:first-child th:nth-child(2)').text(), defFormat).subtract(1, 'month').format(defFormat))
		$table.find('> tbody').empty().append(jui2.tmpl['calendarBody']({date: date}));
	}
/**
 * Go to next month
 * @method nextMonth
 * @memberof dateField
 * @instance
 */
	proto.nextMonth = function(table, format, $self){
		var date = [], lastDate, startDate, w = [], i = 0, $table = table, defFormat = "MMMM YYYY", $self = $(this);
		lastDate = moment(table.find('tr:first-child th:nth-child(2)').text(), defFormat).add(1, 'month').endOf('month').endOf('week').add(1, 'day')
		startDate = moment(table.find('tr:first-child th:nth-child(2)').text(), defFormat).add(1, 'month').startOf('month').startOf('week')

		fromDate = $self.attr('from') != undefined ? moment($self.attr('from'), format) : null
		toDate = $self.attr('to') != undefined ? moment($self.attr('to'), format) : null

		while(startDate.format('DD/MM/YYYY') != lastDate.format('DD/MM/YYYY')){
			w[w.length] = {date: startDate.format('D'), class: (startDate.isBetween(fromDate, toDate, null, '[]') ? '': 'j-disable')}
			i++;
			startDate.add(1, 'day');
			if(i==7){
				i=0;
				date[date.length] = w;
				w = [];
			}
		}
		w[w.length] = startDate.format('D')
		startDate.add(1, 'day');
		if(w.length > 0)
			date[date.length] = w;

		$table.find('thead tr:first-child th:nth-child(2)').text(moment(table.find('tr:first-child th:nth-child(2)').text(), defFormat).add(1, 'month').format(defFormat))
		$table.find('> tbody').empty().append(jui2.tmpl['calendarBody']({date: date}));
	}

	proto.attributeChangedCallback = function(attrName, oldVal, newVal){
		var tagName = this.tagName, attrChange = jui2.attrChange, key = tagName.toLowerCase()+'_'+attrName;
		if(attrChange[key])
			attrChange[key](this, oldVal, newVal);
	    else if(attrChange[attrName] && this.enabledAttrChange.indexOf(attrName) > -1)
	      attrChange[attrName](this, oldVal, newVal);
	}

	jui2.ui.dateField = {
		widget: document.registerElement('j-datefield',  {
			prototype: proto
		}),
		proto: proto
	}

}(jQuery))
;
