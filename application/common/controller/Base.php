<?php


namespace app\common\controller;


use think\Controller;
use think\facade\Session;

class Base extends Controller
{
    protected $Model = null;

    protected function buildSuccess($data = null, $msg = '') {
        $ret = [
            'code' => 1,
            'status' => true,
            'msg' => $msg,
            'data' => $data
        ];
        return json($ret);
    }
    protected function buildError($msg = '', $data = null) {
        $ret = [
            'code' => 0,
            'status' => false,
            'msg' => $msg,
            'data' => $data
        ];
        return json($ret);

    }

    protected function Auth() {
        return Session::has('uid');
    }

}