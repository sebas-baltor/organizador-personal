<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class WebController extends Controller
{
    public function index(){
    
        return view("web/home");
    }
    public function create(){
        
        return view("web/create");
    }
    public function indexTask()
    {
        return view('web/task');
    }
    public function createTask(){
        return view("web/createTask");
    }
    public function indexLogin(){
        return view("web/login");
    }
    public function indexRegister(){
        return view("web/register");
    }
}
