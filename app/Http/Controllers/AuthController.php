<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Controllers\Controller;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Auth;

use App\Models\User;
use App\Models\Type;
use App\Models\State;
use App\Models\Category;


use Illuminate\Support\Facades\DB;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        // definimos que campos vamos validar y como 
        $validation = $request->validate([
            'user_name' => 'required|string|max:255',
            'user_lastname' => 'required|string|max:255',
            'user_email' => 'required|string|email|max:255|unique:users',
            'user_password' => 'required|string|min:6',
        ]);

        // validamos los datos
        if ($validation) {
            // creamos el usuario
            $user = User::create([
                'user_name' => $request->user_name,
                'user_lastname' => $request->user_lastname,
                'user_email' => $request->user_email,
                'user_password' => bcrypt($request->user_password),
            ]);
            // creamos el token
            $token = $user->createToken($user->user_email."_Token")->plainTextToken;
            // añadimos el token al usuario
            $user->remember_token = $token;
            // creamos las categorias estaado y tipo por defecto
            UserController::createDefaultCategoryTypeStateByUser($user->user_id);

            $user->save();
            return response()->json(["status" => 200, "message" => "User created successfully","status"=>"loged","token"=>$token]);
        }
    }
    public function login(Request $request)
    {
        // los datos del usuario que se quiere logear
        $credentials = [
            'user_email' => $request->user_email,
            'password' => $request->user_password
        ];
        // definimos que campos vamos validar y como 
        $validation = $request->validate([
            'user_email' => 'required',
            'user_password' => 'required',
        ]);
        // validamos que los campos sean llenados
        if ($validation) {
            // si existe ya un usaurio en nuestra base de datos con ese email
            if (Auth::attempt($credentials)) {
                // buscamos el ususario
                $loginUser = DB::table('users')->where(['user_email' =>$request->user_email],"AND",["user_password"=>$request->user_password])->first();
                $token = $loginUser->remember_token;
                return response()->json(["message" => "login successfully","status"=>"loged","token"=>$token]);
            }
            return response()->json(["message" => "usuario o contraseña incorrectos","status"=>404]);
        }
    }
}
