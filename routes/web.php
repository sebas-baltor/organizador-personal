<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\WebController;
use App\Http\Controllers\PostWebController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DeleteWebController;
// use App\Http\Controllers\TaskController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// WEB ONTROLLER GET
// WEB ROUTES
Route::get('/',[WebController::class,"index"] );

// AUTH ROUTES
Route::get('/login',[WebController::class,"indexLogin"] );
Route::get('/registrar',[WebController::class,"indexRegister"] );

// TASK CATEGORIES TYPES ROUTES
Route::get("/crear",[WebController::class,"create"]);

// TASK ROUTES
Route::get("/tareas",[WebController::class,"indexTask"]);
Route::get("/crear/tarea",[WebController::class,'createTask']);
Route::get("/api/login",function()
{    
    return view("web.login");
});


// POST CONTROLLER
// TASK ROUTES
Route::post("/tareas",[PostWebController::class,"getTask"]);
Route::post("/tareas/by-type",[PostWebController::class,"getTaskByType"]);
Route::post("/tareas/by-category",[PostWebController::class,"getTaskByCategory"]);
Route::post("/tareas/by-state",[PostWebController::class,"getTaskByState"]);

Route::post("/obtener/todo",[PostWebController::class,"getAllCategoriesTypesStates"]);

// CREAR
Route::post("/crear/tarea",[PostWebController::class,"storeTask"]);
Route::post("/crear/categoria",[PostWebController::class,"storeCategory"]);
Route::post("/crear/tipo",[PostWebController::class,"storeType"]);
Route::post("/crear/estado",[PostWebController::class,"storeState"]);

// AUTH CONTROLLER
Route::post("/login",[AuthController::class,"login"]);
Route::post("/registrar",[AuthController::class,"register"]);


// DELETE CONTROLLER
// ELIMINAR
Route::post("/eliminar/categoria/",[DeleteWebController::class,"destroyCategory"]);
Route::post("/eliminar/tipo",[DeleteWebController::class,"destroyType"]);
Route::post("/eliminar/estado",[DeleteWebController::class,"destroyState"]);
Route::post("/eliminar/tarea",[DeleteWebController::class,"destroyTask"]);