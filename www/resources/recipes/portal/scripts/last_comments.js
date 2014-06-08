$(function(){
    var comments_count = $("#edtCommentsCount").val();
    if (comments_count > 0)
        $('#td-view-all').show();
    else
        $('#td-view-all').hide();
});

