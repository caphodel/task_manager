<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Projects extends CI_Controller {

    public function _remap($method)
    {
        if(isset($_SERVER['HTTP_X_REQUESTED_WITH']))
            $ajax = ($_SERVER['HTTP_X_REQUESTED_WITH']==='XMLHttpRequest')? true : false;
        else
            $ajax = false;
        if($ajax){
            if($this->uri->total_segments()==2){
                $this->show($this->uri->segment(2));
            }
            if($this->uri->total_segments()==3){
                $this->{$this->uri->segment(3)}($this->uri->segment(2));
            }
        }
        else{
			$this->load->view('base/base_layout');
        }
    }

	public function index($parameter1=null)
	{
		$this->load->view('project/index');
	}

	public function show($parameter1=null)
	{
        $data = array('identifier' => $parameter1);
		$this->load->view('project/show', $data);
	}

	public function issues($parameter1=null)
	{
        $data = array('identifier' => $parameter1);
		$this->load->view('issue/index', $data);
	}
}
