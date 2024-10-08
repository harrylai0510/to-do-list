<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;
use MongoDB\BSON\ObjectId;
use Illuminate\Validation\ValidationException;
use MongoDB\Builder\Accumulator;
use MongoDB\Builder\Expression;

class TaskController extends Controller
{
    public function createTask(Request $req)
    {
        try {
            $validated = $req->validate([
                'taskName' => 'required',
            ]);

            $formData = $req->collect();
            $prepare_task = new Task();
            $prepare_task->taskName = $formData["taskName"];
            $prepare_task->dueDate = $formData["dueDate"] ?? null;
            $prepare_task->assign = $formData["assign"] ?? null;
            $prepare_task->status = $formData["status"] ?? "Not Yet";
            $prepare_task->save();
        } catch (ValidationException $e) {
            echo $e;
        }

        return '{ "status": "ok" }';
    }

    public function getAllTasks()
    {
        $tasks = new Task;
        $tasks = $tasks::all();

        return $tasks;
    }

    public function getAllTasksByStatus()
    {
        $tasks = Task::aggregate()->group(
            _id: '$status',
            record: Accumulator::addToSet('$$ROOT')
        )->get();

        return $tasks;
    }

    public function getTask($id)
    {
        $task = new Task;
        $task = $task::where("id", "=", $id)->first();

        if (!isset($task) || empty($task)) {
            $task = '{}';
        }

        return $task;
    }

    public function updateTask($id, Request $req)
    {
        if (!isset($id) || empty($id)) {
            return ' { "status" : "bad" } ';
        }

        // try {
        //     $objId = new ObjectId($id);
        //     $prepare_task = new Task();
        //     $task = $prepare_task::where("_id", "=", $objId)->first();

        //     // $task->title = $req["title"];
        //     $task->save();
        // } catch (ValidationException $e) {
        //     echo $e;
        // }

        try {
            $validated = $req->validate([
                'taskName' => 'required',
            ]);

            $formData = $req->collect();
            $prepare_task = new Task();

            if ( isset($formData["taskName"]) && !empty($formData["taskName"]) ) {
                $prepare_task->taskName = $formData["taskName"];
            }
            if ( isset($formData["dueDate"]) && !empty($formData["dueDate"]) ) {
                $prepare_task->dueDate = $formData["dueDate"];
            }
            if ( isset($formData["assign"]) && !empty($formData["assign"]) ) {
                $prepare_task->assign = $formData["assign"];
            }
            if ( isset($formData["status"]) && !empty($formData["status"]) ) {
                $prepare_task->status = $formData["status"];
            }

            $prepare_task->save();
        } catch (ValidationException $e) {
            echo $e;
        }


        return '{ "status": "ok" }';
    }

    public function deleteTask($id, Request $req)
    {
        $objId = new ObjectId($id);
        $prepare_task = new Task();
        $task = $prepare_task::where("_id", "=", $objId)->first();
        $task->delete();

        return '{ "status": "ok" }';
    }
}
