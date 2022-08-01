<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Type;
use App\Models\State;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    // obtenemos el id del ususario por su token
    public static function getUserIdByToken($token)
    {
        $user = DB::table('users')->where(['remember_token' => $token])->first();
        return $user->user_id;
    }
    // obtenemos el nombre del usuario por su token
    public static function getNameByToken($token)
    {
        $user = DB::table('users')->where(['remember_token' => $token])->first();
        return $user->user_name;
    }
    // obtenemos todos los tipos que esten relacinados a un usuario por medio de su nombre
    public static function getAllTypesByUserId($id)
    {
        $types = DB::table('types')
            ->join("users", "users.user_id", "=", "types.user_id")
            ->where("users.user_id", "=", $id)
            ->select("types.type_task", "types.type_id")->distinct()->get();
        return $types;
    }
    // obtenemos todos las categorias que esten relacinados a un usuario por medio de su nombre
    public static function getAllCategoriesByUserId($id)
    {
        $categories = DB::table('categories')
            ->join("users", "categories.user_id", "=", "users.user_id")
            ->where("users.user_id", "=", $id)
            ->select("categories.category_type", "categories.category_id")->distinct()->get();
        return $categories;
    }
    // obtenemos todos los estados que esten relacinados a un usuario por medio de su nombre
    public static function getAllStatesByUserId($id)
    {
        $states = DB::table('states')
            ->join("users", "users.user_id", "=", "states.user_id")
            ->where("users.user_id", "=", $id)
            ->select("states.state_type", "states.state_id")->distinct()->get();
        return $states;
    }
    // obtenemos todos las tareas que esten relacinados a un usuario por medio de su nombre
    public static function getAllTasksByUserId($id)
    {
        $tasks = DB::table('tasks')->join('users', 'tasks.user_id', '=', 'users.user_id')
            ->join('states', 'tasks.state_id', '=', 'states.state_id')
            ->join('types', 'tasks.type_id', '=', 'types.type_id')
            ->join('categories', 'tasks.category_id', '=', 'categories.category_id')
            ->join('dates', 'dates.task_id', '=', 'tasks.task_id')
            ->where('users.user_id', '=', $id)
            ->select('tasks.task_id', 'tasks.task_description', 'task_title', 'states.state_type', 'types.type_task', 'categories.category_type', 'dates.date_start', 'dates.date_end', 'dates.date_reminder')
            ->get();
        return $tasks;
    }
    // obtenemos toda la informacion de las tareas por usuario y por tipo
    public static function getAllTasksByUserIdAndTypeId($userId,$typeId)
    {
        $tasks = DB::table('tasks')->join('users', 'tasks.user_id', '=', 'users.user_id')
            ->join('states', 'tasks.state_id', '=', 'states.state_id')
            ->join('types', 'tasks.type_id', '=', 'types.type_id')
            ->join('categories', 'tasks.category_id', '=', 'categories.category_id')
            ->join('dates', 'dates.task_id', '=', 'tasks.task_id')
            ->where('users.user_id', '=', $userId)
            ->where('tasks.type_id', '=', $typeId)
            ->select('types.type_id','tasks.task_id', 'tasks.task_description', 'task_title', 'states.state_type', 'types.type_task', 'categories.category_type', 'dates.date_start', 'dates.date_end', 'dates.date_reminder')
            ->get();
        return $tasks;
    }
     // obtenemos toda la informacion de las tareas por usuario y por categoria
     public static function getAllTasksByUserIdAndCategoryId($userId,$catId)
     {
         $tasks = DB::table('tasks')->join('users', 'tasks.user_id', '=', 'users.user_id')
             ->join('states', 'tasks.state_id', '=', 'states.state_id')
             ->join('types', 'tasks.type_id', '=', 'types.type_id')
             ->join('categories', 'tasks.category_id', '=', 'categories.category_id')
             ->join('dates', 'dates.task_id', '=', 'tasks.task_id')
             ->where('users.user_id', '=', $userId)
             ->where('tasks.category_id', '=', $catId)
             ->select('types.type_id','tasks.task_id', 'tasks.task_description', 'task_title', 'states.state_type', 'types.type_task', 'categories.category_type', 'dates.date_start', 'dates.date_end', 'dates.date_reminder')
             ->get();
         return $tasks;
     }
     // obtenemos toda la informacion de las tareas por usuario y por estado
     public static function getAllTasksByUserIdAndStateId($userId,$stateId)
     {
         $tasks = DB::table('tasks')->join('users', 'tasks.user_id', '=', 'users.user_id')
             ->join('states', 'tasks.state_id', '=', 'states.state_id')
             ->join('types', 'tasks.type_id', '=', 'types.type_id')
             ->join('categories', 'tasks.category_id', '=', 'categories.category_id')
             ->join('dates', 'dates.task_id', '=', 'tasks.task_id')
             ->where('users.user_id', '=', $userId)
             ->where('tasks.state_id', '=', $stateId)
             ->select('types.type_id','tasks.task_id', 'tasks.task_description', 'task_title', 'states.state_type', 'types.type_task', 'categories.category_type', 'dates.date_start', 'dates.date_end', 'dates.date_reminder')
             ->get();
         return $tasks;
     }

    public static function createDefaultCategoryTypeStateByUser($user_id)
    {
        // creamos categorias tipos y estados por defecto para cada usuario
        Category::create(['category_type' => 'Escuela', 'user_id' => $user_id]);
        Category::create(['category_type' => 'Trabajo', 'user_id' => $user_id]);
        Category::create(['category_type' => 'Personal', 'user_id' => $user_id]);
        Category::create(['category_type' => 'Tarea', 'user_id' => $user_id]);

        Type::create(['type_task' => 'Nota Rapida', 'user_id' => $user_id]);
        Type::create(['type_task' => 'Lista', 'user_id' => $user_id]);
        Type::create(['type_task' => 'Recordatorio', 'user_id' => $user_id]);
        Type::create(['type_task' => 'Nota', 'user_id' => $user_id]);

        State::create(['state_type' => 'Pendiente', 'user_id' => $user_id]);
        State::create(['state_type' => 'Por Redactar', 'user_id' => $user_id]);
        State::create(['state_type' => 'Terminada', 'user_id' => $user_id]);
    }
    public static function taskRelatedToStatesByUser($token,$stateId){
        $taskRelated = DB::table("tasks")
        ->join("users","tasks.user_id","=","users.user_id")
        ->join("states","states.user_id","=","users.user_id")
        ->where("states.state_id","=","tasks.state_id","AND","users.remember_token","=",$token,"AND","states.state_id","=",$stateId)
        ->get();
        return $taskRelated;
    }
    public static function taskRelatedToTypesByUser($token,$typeId){
        $taskRelated = DB::table("tasks")
        ->join("users","tasks.user_id","=","users.user_id")
        ->join("types","types.user_id","=","users.user_id")
        ->where("types.type_id","=","tasks.type_id","AND","users.remember_token","=",$token,"AND","types.type_id","=",$typeId)
        // ->select(["*"])
        ->get();
        return $taskRelated;
    }
    public static function taskRelatedToCategoriesByUser($token,$categoryId){
        $taskRelated = DB::table("tasks")
        ->join("users","tasks.user_id","=","users.user_id")
        ->join("categories","categories.user_id","=","users.user_id")
        // ->where("categories.category_id","=","tasks.category_id","and","users.remember_token","=",$token,"and","categories.category_id","=",$categoryId)
        ->where("categories.category_id","=","tasks.category_id")->get();
        // ->select("task_id")
        // ->get();
        return $taskRelated;
    }
}
