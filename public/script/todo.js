$('input').keydown(function(e) {
    if (e.keyCode == 13) {
        $(this).closest('form').submit();
    }
});
$("ul").on("click","li",function(){
    $(".pro",this).toggleClass("completed");
 });
 $("ul").on("click","span",function(event){
     $(this).parent().fadeOut(500,function(){
 $(this).remove();
     });
     event.stopPropagation();
 });
 $(".fa-plus").click(function(){
$("input[type='text']").fadeToggle();

 });