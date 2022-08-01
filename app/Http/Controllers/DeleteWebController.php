<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\State;
use App\Models\Type;
use App\Models\Task;
use Illuminate\Support\Facades\DB;
use PhpParser\Builder\Param;

class DeleteWebController extends Controller
{
    public function destroyCategory(Request $request)
    {
        // $taskRelatedTo = UserController::taskRelatedToCategoriesByUser($request->remember_token, $request->category_id);
        $categoryToDelete = Category::where("category_id",$request->category_id);
        $taskRelatedToCategory = Task::where("category_id",$request->category_id)->count();
        if($taskRelatedToCategory>0 ){
            if($request->confirm_action==1){
                // $categoryToDelete->delete();
                return response()->json(["message" => "Categoria eliminada"]); 
            }
            else{
                return response(["message"=>`tienes ${$taskRelatedToCategory} tareas relacionadas a esta categoria si decides eliminarla tambien se eliminaran tus tareas. Estas de acuerdo?`]);
            } 
        }
        return response()->json(["message" => "Categoria eliminada"]);
        
    }
    public function destroyTask(Request $request){
        $taskToDelete = Task::where("task_id",$request->task_id);
        $taskToDelete->delete();
        return response()->json(["message" => "Tarea eliminada"]);
    }
    public function destroyState(Request $request)
    {
        $taskRelatedTo = UserController::taskRelatedToStatesByUser($request->remember_token, $request->state_id);

        // $state = State::where("state_id",$req->state_id);
        // // $state->delete();
        // dump($state);

        return response()->json(["message" => "State deleted", "state" => $taskRelatedTo]);
    }
    public function destroyType(Request $request)
    {
        $taskRelatedTo = UserController::taskRelatedToTypesByUser($request->remember_token, $request->category_id);

        // DB::delete("delete from types where type_id = ?",[$req->type_id]);
        // $type->delete();
        // $type = DB::table("types")->where("types.type_id","=",$request->type_id)->select(["*"])->get();

        return response()->json(["message" => "Type deleted", "type" => $taskRelatedTo]);
    }
}
