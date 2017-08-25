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
