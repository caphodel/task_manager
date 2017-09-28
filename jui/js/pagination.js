(function ($) {

    jui2.attrChange['j-table_paging'] = function(el, oldVal, newVal){
        if (newVal != null) {
            var $el = $(el);
            $el.append('<j-toolbar class="j-table-pagination" style="align-items: baseline;"><j-button class="j-table-first"><i class="fa fa-fast-backward"></i></j-button> <j-button class="j-table-prev"><i class="fa fa-backward"></i></j-button> <j-textfield class="j-table-page" no-label="true" style="width: 60px;"></j-textfield> <j-button class="j-table-next"><i class="fa fa-forward"></i></j-button> <j-button class="j-table-last"><i class="fa fa-fast-forward"></i></j-button></j-toolbar>');

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
                $el.children('.j-table-pagination').children('.j-table-page').val(Math.floor((el.param.iDisplayStart+el.param.iDisplayLength)/el.param.iDisplayLength))
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
