$(document).ready(function() {
  // 2. This code loads the IFrame Player API code asynchronously.
          var tag = document.createElement('script');

          tag.src = "https://www.youtube.com/iframe_api";
          var firstScriptTag = document.getElementsByTagName('script')[0];
          firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    
  // $('h1').text('y esto funciona?'); 
  // embed full url example http://www.youtube.com/embed/S9dqJRyk0YM
   $('#video_url').val("http://www.youtube.com/watch?v=cRmbwczTC6E");
   var video_id = $('#video_url').val();
     
   
   $('button#submit_video').on('click', function() {
      
      var video_id = youtube_parser($('#video_url').val());
      
      //var video_url_embed = $('#video_url').val();
      //$('#video').html('<iframe id="player" origin="http://localhost.php-apps" width="560" height="315" src="'+video_url_embed+'" frameborder="0" allowfullscreen></iframe>');
      //$('#video').html(iframe);     
    function onYouTubeIframeAPIReady() { 
      player = new YT.Player('player', {
                height: '390',
                width: '580',
                videoId: video_id,
                events: {
                  'onReady': onPlayerReady,
                  //'onStateChange': onPlayerStateChange
                }
              }); 
    };
    
    function onPlayerReady(event) {
            event.target.playVideo();
            };
    onYouTubeIframeAPIReady();
   });
      
   function youtube_parser(url){
       var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
       var match = url.match(regExp);
       if (match&&match[7].length==11){
           return match[7];
       }else{
           alert("Url incorrecta");
       }
   };

   var get_cuepoint_item = function (time) {
     
     time = time || player.getCurrentTime();
     console.log(time);
       var cuepointtext = $('input#type_text').val();
       return $('<tr class="cuepoints" data-cuepointtime="'+ time +'" data-cuepointtext="'+cuepointtext+'"><td><a id="seek_point">'+formatTimestamp(time)+'</a></td><td><form action=""><textarea id="submit_text" class="cuepoint_item" type="text" placeholder="enter text" >'+cuepointtext+'</textarea></form><td><button id="remove" class="small alert button">remove</button><button id="add_next" class="small button">add next</button><button id="save_cuepoint" class="small button" style="display:none">save cuepoint</button></td></tr>'); 
       
   };
   
   function addCuepoint (time) {

        console.log(player.getCurrentTime());
        console.log(time);
        var cuepoint_item = get_cuepoint_item(time);
        $('tbody#timer').append(cuepoint_item);  

   };
      
   function addNextCuepoint () {

       console.log(player.getCurrentTime());

       var cuepoint_item = get_cuepoint_item();
       $(this).closest('tr').after(cuepoint_item);  
       console.log($(this));

   };
    
   function saveCuepoint() {
        var $tr = $(this).closest('tr');        
        var text = $tr.find('textarea').val();
    
    
        $($tr).data('cuepointtext',text);
        console.log("grabado"+$tr.data('cuepointtext'));
   };

    // Takes a number of seconds and returns a #h##m##s string.
   function formatTimestamp(timestamp) {
          var hours = Math.floor(timestamp / 3600);
          var minutes = Math.floor((timestamp - (hours * 3600)) / 60);
          var seconds = timestamp % 60;

          var formattedTimestamp = (seconds < 10 ? '0' : '') + seconds + 's';
          if (minutes > 0) {
            formattedTimestamp = (minutes < 10 ? '0' : '') + minutes + 'm' + formattedTimestamp;
          }
          if (hours > 0) {
            formattedTimestamp = hours + 'h' + formattedTimestamp;
          }

          return formattedTimestamp;
   };
   
   function generateSrt() {
       
     $('.cuepoints').each(function() {
         
         $(this).data('cuepointtext',$(this).find('textarea').val()); 
         console.log($(this).data('cuepointtime') + "," + $(this).data('cuepointtext'));
         
         
     });
     
     // for ( var i = 0; i < $('.cuepoints').length; i++) {
     //     
     //     //var li = $($('.cuepoints')[i]);
     //     var li = $('.cuepoints').eq(i);
     //     li.data('cuepointtext',li.find('textarea').val()); 
     //     console.log(li.data('cuepointtime') + "," + li.data('cuepointtext'));
     //     
     // };     
       
   };
   
   var time_init_typing;
   
   $('input#type_text').on('keypress', function(e) {
       time_init_typing = time_init_typing || player.getCurrentTime();
       if(e.which == 13) {
               addCuepoint(time = time_init_typing);
               $('input#type_text').val("");
               time_init_typing = null;
           };
       });
    
   $('button#add_cuepoint').on('click', addCuepoint);
    
   $('button#generate_srt').on('click', generateSrt);
   
   $(document).on('click','button#remove', function() {
        // console.log('button clicked');

        (confirm('are you sure you want to delete this cue point?')) ? $(this).closest('tr').remove() : null  ;      

   });

   $(document).on('click', 'button#add_next', addNextCuepoint);  
    
   $(document).on('click', 'button#save_cuepoint', saveCuepoint);

   $(document).on('focus', 'textarea', function() {

       $(this).addClass('highlighted');

   });


   $(document).on('blur', 'input', function() {

       $(this).removeClass('highlighted');

   });

   $(document).on('click', 'a#seek_point', function() {

       var seconds = +$(this).closest('tr').data('cuepointtime');
       player.seekTo(seconds, true);

   });
     
   
    
});

