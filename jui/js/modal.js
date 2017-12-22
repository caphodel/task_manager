(function ($) {
	jui2.modal = function (options) {
		var defaults = {
			el: $(''),
			width: '350px',
			height: '150px',
			id: jui2.random(8, 'aA#')
		}

		var settings = $.extend({}, defaults, options);

		var tmpl = $(jui2.tmpl['modal']()).attr('id', settings.id);

		var $content = tmpl.children('.j-modal-dialog');
		$content.append(settings.el).css({
			'width': settings.width,
			'height': settings.height
		})

		tmpl.appendTo('body');

		return tmpl;
	}
}(jQuery));
