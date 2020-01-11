$(function(){
  function buildHTML(message){
    if ( message.image ) {

    
      var html = `<div class='chat__main--contents_name_created_at' data-message-id=${message.id}>
                    <div class='chat__main--contents_member_name'>
                      ${message.user_name}
                    </div>
                    <div class='chat__main--contents_created_at'>
                      ${message.created_at}
                    </div>
                  </div>
                  <div class='chat__main--contents_message'>
                    <p class='lower-message__content'>
                      ${message.content}
                    </p>
                    <img src=${message.image}>
                  </div>`
                  return html;
    } else {
      var html = `<div class='chat__main--contents_name_created_at' data-message-id=${message.id}>
                    <div class='chat__main--contents_member_name'>
                      ${message.user_name}
                    </div>
                    <div class='chat__main--contents_created_at'>
                      ${message.created_at}
                    </div>
                  </div>
                  <div class='chat__main--contents_message'>
                    <p class='lower-message__content'>
                      ${message.content}
                    </p>
                  </div>`
                  return html;
    };
  }
  $("#new_message").on("submit",function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.chat__main--contents').append(html);
      $('.chat__main--contents').animate({ scrollTop: $('.chat__main--contents')[0].scrollHeight});
      $('form')[0].reset();
      $(".send-btn").prop("disabled",false);
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
    })
  });
});