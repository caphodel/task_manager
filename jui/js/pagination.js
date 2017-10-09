(function ($) {

    jui2.attrChange['j-table_paging'] = function(el, oldVal, newVal){
        if (newVal != null) {
            var $el = $(el);

            $el.append(jui2.tmpl['pagination']());

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

            $el.children('.j-table-pagination').children('.j-table-refresh').click(function(){
                el.generateData();
            })
        }
        else{
            $el = $(el);
            $el.children('.j-table-pagination').remove();
        }
    }
}(jQuery));
