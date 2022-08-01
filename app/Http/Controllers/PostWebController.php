<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\UserController;
use App\Models\Category;
use App\Models\State;
use App\Models\Type;
use App\Models\Task;
use App\Models\Date;

class PostWebController extends Controller
{
    // obtenemos toda la informacion necesaria de las tareas para la vista tareas
    public function getTask(Request $request)
    {
        $id = UserController::getUserIdByToken($request->remember_token);
        $tasks = UserController::getAllTasksByUserId($id);
        $category = UserController::getAllCategoriesByUserId($id);
        $state = UserController::getAllStatesByUserId($id);
        $type = UserController::getAllTypesByUserId($id);
        return response()->json(["tasks" => $tasks, "category" => $category, "state" => $state, "type" => $type]);
    }
    // obtenemos toda la informacion necesaria de las tareas por tipo para la vista tareas
    public function getTaskByType(Request $request){
        $userId =  UserController::getUserIdByToken($request->remember_token);
        $typeId = $request->type_id;
        $tasks = UserController::getAllTasksByUserIdAndTypeId($userId, $typeId);
        return response()->json(["tasks" => $tasks]);
    }
     // obtenemos toda la informacion necesaria de las tareas por categoria para la vista tareas
     public function getTaskByCategory(Request $request){
        $userId =  UserController::getUserIdByToken($request->remember_token);
        $catId = $request->category_id;
        $tasks = UserController::getAllTasksByUserIdAndCategoryId($userId, $catId);
        return response()->json(["tasks" => $tasks]);
    }
    // obtenemos toda la informacion necesaria de las tareas por state para la vista tareas
    public function getTaskByState(Request $request){
        $userId =  UserController::getUserIdByToken($request->remember_token);
        $stateId = $request->state_id;
        $tasks = UserController::getAllTasksByUserIdAndStateId($userId, $stateId);
        return response()->json(["tasks" => $tasks]);
    }
    public function getAllCategoriesTypesStates(Request $request){
        // obtenemos el nombre a travez del token
        $id = UserController::getUserIdByToken($request->remember_token);
        // obtenemos los datos de acuerdo al nombre
        $categories = UserController::getAllCategoriesByUserId($id);
        $types = UserController::getAllTypesByUserId($id);
        $states = UserController::getAllStatesByUserId($id);
        // retornamos los datos
        return response()->json(["categories"=>$categories, "types"=>$types, "states"=>$states]);
    }
    // almacenamos una catogaria
    public function storeCategory(Request $request){
        // obtenemos el id del usuario a travez del token
        $userId = UserController::getUserIdByToken($request->remember_token);
        // creamos una nueva categoria relacionada al usuario
        $category = Category::create(["category_type"=>$request->category_type, "user_id"=>$userId]);
        $category->save();

        return response()->json(["category"=>$category]);
    }
    // almacenamos un tipo
    public function storeType(Request $request){
        // obtenemos el id del usuario a travez del token
        $userId = UserController::getUserIdByToken($request->remember_token);
        // creamos un nuevo tipo relacionado al usuario
        $type = Type::create(["type_task"=>$request->type_task, "user_id"=>$userId]);
        $type->save();
        return response()->json(["type"=>$type]);
    }
    // almacenamos un estado
    public function storeState(Request $request){
        // obtenemos el id del usuario a travez del token
        $userId = UserController::getUserIdByToken($request->remember_token);
        // creamos un nuevo estado relacionado al usuario
        $state = State::create(["state_type"=>$request->state_type,"user_id"=>$userId]);
        $state->save();
        return response()->json(["state"=>$state]);
    }

    public function storeTask(Request $request){
        // obtenemos el id del usuario a travez del token
        $userId = UserController::getUserIdByToken($request->remember_token);
        // echo $userId;
        // creamos una nueva tarea con su respectiva fecha
        $task=Task::create(["task_title"=>$request->task_title,"task_description"=>$request->task_description,"category_id"=>$request->category_id,"type_id"=>$request->type_id,"state_id"=>$request->state_id,"user_id"=>$userId]);
        $date=Date::create(["task_id"=>$task->task_id,"date_start"=>now(),"date_end"=>$request->date_end,"date_reminder"=>$request->date_reminder]);
        return response()->json(["task"=>$task,"date"=>$date]);
    }
}
