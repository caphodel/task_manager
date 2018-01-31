<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class LatestProject extends CI_Controller {

	function LatestProject(){
		parent::__construct();
	}

	function index(){
		$this->load->view('widget/latestProject');
	}

}
?>
