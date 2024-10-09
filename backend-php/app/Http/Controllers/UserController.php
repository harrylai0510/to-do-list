<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use MongoDB\BSON\ObjectId;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{
    public function createUser(Request $req) {
        $res = [
            'msg' => "def",
            'status' => "ok"
        ];

        try {
            $validated = $req->validate([
                'userName' => 'required',
            ]);

            $formData = $req->collect();
            $user = new User;
            $user->userName = $formData["userName"];
            $user->save();

            $res["msg"] = "created 1 user.";
        }
        catch(\Exception $e) {
            $res['msg'] = $e->getMessage();
            $res['status'] = 'failed';
        }
        
        return $res;
    }

    public function getAllUsers() {
        $users = new User;
        $users = $users::all();
        return $users;
    }

    public function getIdUsers() {
        $users = new User;
        $users = $users::all();

        $tmpUsers = [];
        foreach($users as $user) {
            $tmpUsers[ $user['id'] ] = $user['userName'];
            // array_push($tmpUsers, [ $user['id'] => $user['userName'] ]);
        }

        return $tmpUsers;
    }

    public function getUser($id) {
        $user = new User;
        $user = $user::where("id", "=", $id)->first();
        if (!isset($user) || empty($user)) {
            $user = '{}';
        }

        return $user;
    }

    public function updateUser($id, Request $req) {
        if (!isset($id) || empty($id)) {
            return ' { "status" : "bad" } ';
        }

        try {
            $validated = $req->validate([
                'userName' => 'required',
            ]);

            $formData = $req->collect();
            $prepare_user = new User;
            $prepare_user = $prepare_user::where("id", "=", $id)->first();
            if (isset($prepare_user)) {
                if ( isset($formData["userName"]) && !empty($formData["userName"]) ) {
                    $prepare_user->userName = $formData["userName"];
                }
    
                $prepare_user->save();
            }

        } catch (ValidationException $e) {
            echo $e;
        }


        return '{ "status": "ok" }';
    }

    public function deleteUser($id, Request $req) {
        $objId = new ObjectId($id);
        $prepare_user = new User();
        $user = $prepare_user::where("_id", "=", $objId)->first();
        $user->delete();

        return '{ "status": "ok" }';
    }

}