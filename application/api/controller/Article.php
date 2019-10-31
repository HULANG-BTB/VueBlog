<?php


namespace app\api\controller;


use app\common\controller\Base;
use app\api\model\Article as ArticleModel;
use think\App;
use think\route\Dispatch;

class Article extends Base
{

    public function __construct(App $app = null)
    {
        parent::__construct($app);
        $this->Model = new ArticleModel();
    }

    public function getArticleListByPaginator() {

        if (!$this->request->isPost()) {
            return $this->buildError('非法操作');
        }

        $page = $this->request->post('page', '1');
        $limit = $this->request->post('limit', '10');

        $data = $this->Model
            ->where(['del' => 0, 'top' => 0, 'status' => 0])
            ->page($page, $limit)
            ->order(['id' => 'desc'])
            ->select();

        $count = $this->Model
            ->where(['del' => 0, 'top' => 0, 'status' => 0])
            ->count();

        $ret['data'] = [
            'data' => $data,
            'total' => $count,
            'page' => $page,
            'limit' => $limit
        ];

        if ($data) {
            return $this->buildSuccess($ret);
        } else {
            return $this->buildError('查询数据失败!');
        }
    }

    public function getArticleListByTag() {
//        if (!$this->request->isPost()) {
//            return $this->buildError('非法操作');
//        }

        $keyword = $this->request->param('tag', 0);
        $page = $this->request->post('page', 1);
        $limit = $this->request->post('limit', 10);

        $Tag = new \app\api\model\Tag();
        $tag = $Tag->where(['name' => $keyword])
            ->find();
        $tag = $tag ? $tag->id : 0;

        $data = $this->Model
            ->where(['del' => 0, 'top' => 0, 'status' => 0])
            ->where('find_in_set(:tag,tags)',['tag'=>$tag])
            ->page($page, $limit)
            ->order(['id' => 'desc'])
            ->select();

        $count = $this->Model
            ->where(['del' => 0, 'top' => 0, 'status' => 0])
            ->where('find_in_set(:id,tags)',['id'=>$keyword])
            ->count();

        $ret['data'] = [
            'data' => $data,
            'total' => $count,
            'page' => $page,
            'limit' => $limit
        ];

        if ($data) {
            return $this->buildSuccess($ret);
        } else {
            return $this->buildError('查询数据失败!');
        }
    }

    public function getArticleInfo() {
        if (!$this->request->isPost()) {
            return $this->buildError('非法操作');
        }
        $pid = $this->request->param('id', 0);
        $article = $this->Model
            ->get($pid);
        if (!$article) {
            return $this->buildError('文章不存在');
        } else {
            return $this->buildSuccess($article);
        }
    }

}