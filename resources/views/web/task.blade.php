@extends("layout.app")

@section("content")
<div id="task"></div>
@viteReactRefresh
@vite("resources/js/import/task.js")
@endsection
