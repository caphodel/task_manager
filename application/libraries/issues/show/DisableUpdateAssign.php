<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class DisableUpdateAssign {
    private $CI;

    function __construct() {
        $this->CI = &get_instance();
    }

    function fn_view($html, $data){
        return $html = $html . file_get_contents(APPPATH."libraries/issues/show/DisableUpdateAssign.html");
    }
}
?>
