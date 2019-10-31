<?php


namespace app\api\controller;

USE app\api\model\Tag as TagModel;
use app\common\controller\Base;
use think\App;

class Tag extends Base
{
    public function __construct(App $app = null)
    {
        parent::__construct($app);
        $this->Model = new TagModel();
    }

    public function getTagList() {
        if (!$this->request->isGet()) {
            return $this->buildError('非法操作');
        }
        $data = $this->Model
            ->field(['id', 'name', 'count'])
            ->select();
        if (!$data) {
            return $this->buildError('暂无标签');
        } else {
            return $this->buildSuccess($data);
        }

    }

}