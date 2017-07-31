<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Base extends CI_Controller {

	public function index()
	{
		if(isset($_REQUEST['load'])){
			$this->load->view('base/base_layout', array(
				'load'=>$_REQUEST['load']
			));
		}
		else{
			$this->load->view('base/base_layout');
		}
	}

	public function login()
	{
		if(isset($_REQUEST['from_base'])){
			$this->load->view('base/login');
		}
		else{
			$this->load->helper('url');
			redirect('../?load=base/login');
		}
	}
}
