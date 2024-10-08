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

    public function getUser() {

    }

    public function updateUser() {

    }

    public function deleteUser() {

    }

}