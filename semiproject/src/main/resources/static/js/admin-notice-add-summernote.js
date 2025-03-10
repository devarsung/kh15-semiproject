$(function(){
    //상태 변수
    var status = {
            noticeTitle : false,
            noticeContent : false,
            ok : function(){
                return this.noticeTitle && this.noticeContent;
            },
        };
    $("[name=noticeContent]").summernote({
        height:300,//높이(px)
        minHeight:200, //최소높이(px)
        maxHeight:600, //최대높이(px)
        placeholder:"공지사항을 입력하세요",
        toolbar: [
            ["font", ["style", "fontname", "fontsize", "forecolor", "backcolor"]],
            ["style", ["bold", "italic", "underline", "strikethrough"]],
            ["attach", ["picture"]],
            ["tool", ["ol", "ul", "table", "hr", "fullscreen"]],

        ],
  
        callbacks: {
            onImageUpload: function(files){
                if(files.length == 0) return;
                
                var form = new FormData();//form을 대신할 도구
                for(var i=0; i < files.length; i++) {
                    form.append("attach", files[i]);
                }
                
                $.ajax({
                    processData: false,
                    contentType: false,
                    url:"",
                    method:"post",
                    data: form,
                    success:function(response){
                        for(var i=0; i < response.length; i++) {
                            var tag = $("<img>").attr("src", "/attachment/download?attachmentNo="+response[i])
                            .addClass("summernote-img")  //식별자 알아보기위한클래스
                            .attr("data-attachment-no", response[i]); //추출을위한
                            $("[name=noticeContent]").summernote("insertNode", tag[0]);
                        }
                    }
                });
            },
        },
    });
    $("[name=noticeTitle]").blur(function(){
        var isValid = $(this).val().length > 0;
        $(this).removeClass("fail").addClass(isValid ? "" : "fail");
        status.noticeTitle = isValid;
    });
    $("[name=noticeContent]").blur(function(){
        var isValid = $(this).val().length > 0;
        if(!isValid){
            $(".note-placeholder").css("color","#d63031");
            status.noticeContent = false;
        };
        status.noticeContent = isValid;
    });
    $(".form-check").submit(function(){
        $("[name]").trigger("blur");
        return status.ok();
    });
});

//페이지 이탈
$(function(){
	$("[name=noticeContent]").on("summernote.change", function(){
		checkInputState();		
	});
	$("[name=noticeTitle]").on("input", function(){
		checkInputState();
	});	
	$(".form-check").submit(function(){
		$(window).off("beforeunload");
		return true;
	});
	
	function checkInputState() {
		var titleEmpty = $("[name=noticeTitle]").val().length == 0;
		var contentEmpty = $("[name=noticeContent]").val().length == 0;
		var isEmpty = titleEmpty && contentEmpty;
		
		if(isEmpty) {
			$(window).off("beforeunload");
		}
		else {
			$(window).off("beforeunload");
			$(window).on("beforeunload", function(){ return false; });
		}
	}
});
