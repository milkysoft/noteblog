open WebSharper
open WebSharper.JavaScript

[<JavaScript>]
let InitTinymce() =
    JS.Window?initTinymce()

(*
<script type="text/javascript">
var initTinymce = function() {
    tinymce.init(/* ... */)
};
</script>
*)