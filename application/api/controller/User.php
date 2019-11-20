<?php


namespace app\api\controller;

use app\api\model\User as UserModel;
use app\common\controller\Base;
use think\App;
use think\facade\Session;


class User extends Base
{
    protected $uid = null;

    public function __construct(App $app = null)
    {
        parent::__construct($app);
        $this->Model = new UserModel();
    }


    public function getUserInfo () {
        if (Session::has('uid')) {
            $this->uid = Session::get('uid');
            $user = $this->Model
                ->where(['id' => $this->uid])
                ->field(['id', 'username', 'nickname', 'email'])
                ->find();
            return $this->buildSuccess($user);
        } else {
            if ($this->request->param()) {
                $username = $this->request->param('username/s', '');
                $password = $this->request->param('password/s', '');

                if ($username === '') {
                    return $this->buildError('用户名不为空！');
                }
                if ($password === '') {
                    return $this->buildError('密码不为空！');
                }
                $user = $this->Model
                    ->where('username',  '=', $username)
                    ->whereOr('email', '=', $username)
                    ->whereOr('phone', '=', $username)
                    ->select();

                if (count($user) === 0) {
                    return $this->buildError('用户不存在！');
                }

                foreach ($user as $val) {
                    $salt = $val['salt'];
                    $pwd = $this->encryptPassword($password, $salt);
                    if ($pwd === $val['password']) {
                        $data = [
                            'uid' => $val['id'],
                            'username' => $val['username'],
                            'nickname' => $val['nickname'],
                            'email' => $val['email']
                        ];
                        Session::set('uid', $val['id']);
                        return $this->buildSuccess($data);
                    }
                }
                return $this->buildError('用户名或密码错误！');
            } else {
                return $this->buildError('请先登录！');
            }
        }
    }

    private function encryptPassword($string, $salt = '') {
        $string = md5($string.$salt, false);
        return sha1($string.$salt, false);
    }

    private function getSalt() {
        $string = md5(time());
        return substr($string, 0,4);
    }

}