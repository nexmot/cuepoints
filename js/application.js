$(document).ready(function() {
  // 2. This code loads the IFrame Player API code asynchronously.
          var tag = document.createElement('script');

          tag.src = "https://www.youtube.com/iframe_api";
          var firstScriptTag = document.getElementsByTagName('script')[0];
          firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    
  // $('h1').text('y esto funciona?'); 
  // embed full url example http://www.youtube.com/embed/S9dqJRyk0YM
   $('#video_url').val("S9dqJRyk0YM");
   var video_id = $('#video_url').val();
     
   
   $('button#submit_video').on('click', function() {
      
      //var video_url_embed = $('#video_url').val();
      //$('#video').html('<iframe id="player" origin="http://localhost.php-apps" width="560" height="315" src="'+video_url_embed+'" frameborder="0" allowfullscreen></iframe>');
      //$('#video').html(iframe);     
    function onYouTubeIframeAPIReady() { 
      player = new YT.Player('player', {
                height: '195',
                width: '360',
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
      
 

    var get_cuepoint_item = function () {
     
       return $('<li class="cuepoints" data-cuepointtime="'+player.getCurrentTime()+'"><a id="seek_point">'+formatTimestamp(player.getCurrentTime())+'</a><form action=""><input id="submit_text" class="cuepoint_item" type="text" value="enter text" ></form><button id="remove">remove</button><button id="add_next">add next</button><button id="save_cuepoint">save cuepoint</button></li>'); 
       
    };
   
    function addCuepoint () {

        console.log(player.getCurrentTime());

        var cuepoint_item = get_cuepoint_item();
        $('#timer').append(cuepoint_item);  

    };
      
    function addNextCuepoint () {

       console.log(player.getCurrentTime());

       var cuepoint_item = get_cuepoint_item();
       $(this).closest('li').after(cuepoint_item);  
       console.log($(this));

    };
    
    function saveCuepoint() {
        var li = $(this).closest('li');        
        var text = li.find('input').val();
    
    
        $(li).data('cuepointtext',text);
        console.log("grabado"+li.data('cuepointtext'));
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
         
         $(this).data('cuepointtext',$(this).find('input').val()); 
         console.log($(this).data('cuepointtime') + "," + $(this).data('cuepointtext'));
         
         
     });
     
     // for ( var i = 0; i < $('.cuepoints').length; i++) {
     //     
     //     //var li = $($('.cuepoints')[i]);
     //     var li = $('.cuepoints').eq(i);
     //     li.data('cuepointtext',li.find('input').val()); 
     //     console.log(li.data('cuepointtime') + "," + li.data('cuepointtext'));
     //     
     // };
     
       
    };
    
    $('button#add_cuepoint').on('click', addCuepoint);
    
    $('button#generate_srt').on('click', generateSrt);
   
    $(document).on('click','button#remove', function() {
        // console.log('button clicked');

        (confirm('are you sure you want to delete this cue point?')) ? $(this).closest('li').remove() : null  ;      



     });

     $(document).on('click', 'button#add_next', addNextCuepoint); 


    
     function testAlert() { 
        alert("testing alert");

    };

     
     $(document).on('click', 'button#save_cuepoint', saveCuepoint);

     $(document).on('focus', 'input', function() {

        $(this).addClass('highlighted');


     });



     $(document).on('blur', 'input', function() {

          $(this).removeClass('highlighted');


       });

     $(document).on('click', 'a#seek_point', function() {

         var seconds = +$(this).closest('li').data('cuepointtime');
         player.seekTo(seconds, true);


     });
     
   
    
});

