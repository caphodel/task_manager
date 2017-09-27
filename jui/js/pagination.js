(function ($) {

    jui2.attrChange['j-table_paging'] = function(el, oldVal, newVal){
        if (newVal != null) {
            $el = $(el);
            $el.append('<j-toolbar class="j-table-pagination"><i class="fa fa-step-backward"></i> <i class="fa fa-caret-left"></i> <i class="fa fa-caret-right"></i> <i class="fa fa-step-forward"></i></j-toolbar>')
        }
        else{
            $el = $(el);
            $el.children('.j-table-pagination').remove();
        }
    }
}(jQuery));
