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

			$data = array();

			/*plugin system*/
			$this->load->helper('directory');

			$libraries = directory_map(APPPATH."libraries/base", 1, TRUE);

			$autoload = array();

			foreach($libraries as $library)
			{
				if( ! is_array($library))
				{
					//var_dump(pathinfo($library));
					$pathinfo = pathinfo($library);
					if(isset($pathinfo['extension']))
						if($pathinfo['extension']=='php'){
							$autoload[] = 'base/' . strtolower($pathinfo['filename']);
							$libs[] = strtolower($pathinfo['filename']);
						}
					//$autoload[] = strtolower($library);
				}
			}

			$this->load->library($autoload);
			/*end of plugin system*/

			$view = $this->load->view('base/base_layout', $data, true);

			/*plugin system*/
			foreach($libs as $library){
				if(method_exists($this->{$library}, 'view')){
					$view = $this->{$library}->view($view, $data);
				}
			}

			print $view;
			/*end of plugin system*/
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
