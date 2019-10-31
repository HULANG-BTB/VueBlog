<?php


namespace app\api\controller;

use app\api\model\Route as RouteModel;
use app\common\controller\Base;
use think\App;

class Route extends Base
{
    public function __construct(App $app = null)
    {
        parent::__construct($app);
        $this->Model = new RouteModel();
    }

    public function getRouteList() {
        if ($this->request->isGet()) {
            return $this->error("123");
        }
    }
}