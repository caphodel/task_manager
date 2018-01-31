<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class FrontView {
    private $CI;

    function __construct() {
        $this->CI = &get_instance();
		/*$this->CI->_ci_view_paths = array(
            APPPATH . 'libraries\\base\\view\\' => TRUE
        );*/
    }

    function view($html, $data){
		$view = $this->CI->load->view("../libraries/base/view/FrontView", array(), true);
        return $html = $html . $view;
    }
}
?>
