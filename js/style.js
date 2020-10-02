
$(document).ready(function(){
$(".menu_burger").click(function(){
$(".menu_bg").toggleClass('active');
$(".nav").toggleClass('active');
$(".menu_burger").toggleClass('active');
$(".nav_link").toggleClass('active');
$("body").toggleClass('lock');
});
});

$(document).ready(function(){
$(".nav_link").click(function(){
$(".menu_bg").removeClass('active');
$(".nav").removeClass('active');
$(".menu_burger").removeClass('active');
$(".nav_link").removeClass('active');
$("body").removeClass('lock');
});
});

$(window).scroll(function(){
if ($(this).scrollTop()>500) {
$(".arrow").addClass('active');	
}else{
$(".arrow").removeClass('active');
}
});

$('.arrow').click(function(e){
e.preventDefault();
$('html').animate({scrollTop:0},1000);
});
