<?php


namespace app\api\controller;

use app\api\model\Category as CategoryModel;
use app\common\controller\Base;
use think\App;

class Category extends Base
{
    public function __construct(App $app = null)
    {
        parent::__construct($app);
        $this->Model = new CategoryModel();
    }

    public function getCategoryList() {
        if (!$this->request->isGet()) {
            return $this->buildError('非法操作');
        }
        $data = $this->Model
            ->field(['id', 'title', 'create_time', 'update_time'])
            ->select();
        if (!$data) {
            return $this->buildError('暂无标签');
        } else {
            return $this->buildSuccess($data);
        }

    }

}