$(".play-video-btn").click(function(){
    $(this).siblings(".development__item-video").css("z-index", "1")
    $(this).siblings(".video-poster").css("z-index", "0")
    $(this).css("z-index", "0")
    $(this).siblings(".development__item-video").trigger('play')
})

$(".development__item-video").click(function(){
    $(this).css("z-index", "0")
    $(this).trigger('pause')
    $(this).siblings(".video-poster").css("z-index", "2")
    $(this).siblings(".play-video-btn").css("z-index", "3")
})