<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Issues extends CI_Controller {

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
                $this->update($this->uri->segment(3));
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
		$this->load->view('issue/index', $data);
	}

	public function show($parameter1=null)
	{
        if($parameter1==null){
            $parameter1 = '';
        }
        $data = array('identifier' => $parameter1);

        $this->load->helper('directory');

        $libraries = directory_map(APPPATH."libraries/issues/show", TRUE);
        $autoload = array();

        foreach($libraries as $library)
        {
            if( ! is_array($library))
            {
                //var_dump(pathinfo($library));
                $pathinfo = pathinfo($library);
                if($pathinfo['extension']=='php'){
                    $autoload[] = 'issues/show/' . strtolower($pathinfo['filename']);
                    $libs[] = strtolower($pathinfo['filename']);
                }
                //$autoload[] = strtolower($library);
            }
        }

        $this->load->library($autoload);

        //$data['script'] = array();

		$view = $this->load->view('issue/show', $data, true);

        foreach($libs as $library){
            if(method_exists($this->{$library},'view')){
                $view = $this->{$library}->view($view, $data);
            }
        }

        print $view;
	}

	public function update($parameter1=null)
	{
        if($parameter1==null){
            $parameter1 = '';
        }
        $data = array('identifier' => $parameter1);
		$this->load->view('issue/update', $data);
	}
}
