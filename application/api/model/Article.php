<?php

namespace app\api\model;

use think\Model;

class Article extends Model
{
    protected $autoWriteTimestamp = true;
    //
    public function getCategoryAttr($val) {
        $category = new Category();
        return $category->get($val)->title;
    }
    public function getTagsAttr($val) {
        $list = explode(',', $val);
        $Tag = new Tag();
        $result = $Tag
            ->where('id', 'in', $list)
            ->field(['id', 'name'])
            ->select();
        return $result;
    }
}
