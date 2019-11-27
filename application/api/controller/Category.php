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
            ->where(['del' => 0])
            ->field(['id', 'title', 'create_time', 'update_time'])
            ->select();
        if (!$data) {
            return $this->buildError('暂无标签');
        } else {
            return $this->buildSuccess($data);
        }

    }

    public function deleteCategory() {
        if (!$this->request->isPost() || !$this->Auth()) {
            return $this->buildError('非法操作');
        }
        $id = $this->request->param('id/d', 0);
        $result = $this->Model->save(['del' => 1],['id' => $id]);
        if ($result) {
            $ret = [
                'id' => $id
            ];
            return $this->buildSuccess($ret,'删除分类成功');
        } else {
            return $this->buildError('删除分类失败');
        }
    }

    public function insertCategory() {
        if (!$this->request->isPost() || !$this->Auth()) {
            return $this->buildError('非法操作');
        }
        $title = $this->request->param('title/d', '');
        $this->Model->title = $title;
        $result = $this->Model->save();
        if ($result) {
            $ret = [
                'id' => $this->Model->id,
                'title' => $this->Model->title,
            ];
            return $this->buildSuccess($ret,'新增分类成功');
        } else {
            return $this->buildError('新增分类失败');
        }
    }

    public function updateCategory() {
        if (!$this->request->isPost() || !$this->Auth()) {
            return $this->buildError('非法操作');
        }
        $id = $this->request->param('id/d', 0);
        $title = $this->request->param('title/s', '');
        $result = $this->Model->save(['title' => $title], ['id' => $id]);
        if ($result === true) {
            return $this->buildSuccess($this->Model, '更新成功！');
        } else {
            return $this->buildError('更新失败！');
        }
    }

}