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
		$this->load->view('base/login');
	}

	public function not_found()
	{
        if(isset($_SERVER['HTTP_X_REQUESTED_WITH']))
            $ajax = ($_SERVER['HTTP_X_REQUESTED_WITH']==='XMLHttpRequest')? true : false;
        else
            $ajax = false;
        if($ajax)
            $this->load->view('base/not_found');
        else
		  $this->load->view('base/base_layout');
	}

	public function load($parameter1)
	{
        $url = explode('/', $parameter1);
        if ($this->input->is_ajax_request()) {
            if($url[0]=="login"){
                $this->login();
            }
            else {
                $this->load->helper('load_controller');
                if(count($url)>1)
                    load_controller($url[0], $url[1]);
                else
                    load_controller($url[0]);
            }
        }
        else {
		  $this->load->view('base/base_layout');
        }
	}
}
