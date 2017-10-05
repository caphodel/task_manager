<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Users extends CI_Controller {

    public function _remap($method)
    {
        if(isset($_SERVER['HTTP_X_REQUESTED_WITH']))
            $ajax = ($_SERVER['HTTP_X_REQUESTED_WITH']==='XMLHttpRequest')? true : false;
        else
            $ajax = false;
        if($ajax){
            if($this->uri->total_segments()>1){
                $this->show($this->uri->segment(2));
            }
        }
        else{
			$this->load->view('base/base_layout');
        }
    }

	public function index($parameter1=null)
	{
        if($parameter1==null){
            $parameter1 = '';
        }
        $data = array('identifier' => $parameter1);
		$this->load->view('base/base_layout', $data);
	}

	public function show($parameter1=null)
	{
        if($parameter1==null){
            $parameter1 = '';
        }
        $data = array('identifier' => $parameter1);
		$this->load->view('user/show', $data);
	}
}
