@extends("layout.app")

@section("content")
<div id="home"></div>
@viteReactRefresh
@vite("resources/js/import/home.js")
@endsection

@section("script")
    <script src="https://cdnjs.cloudflare.com/ajax/libs/holder/2.9.8/holder.min.js" integrity="sha512-O6R6IBONpEcZVYJAmSC+20vdsM07uFuGjFf0n/Zthm8sOFW+lAq/OK1WOL8vk93GBDxtMIy6ocbj6lduyeLuqQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
@endsection