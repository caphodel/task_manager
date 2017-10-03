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
