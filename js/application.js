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
      player = new YT.Player('player', {
                height: '195',
                width: '360',
                videoId: video_id,
                events: {
                  //'onReady': onPlayerReady,
                  //'onStateChange': onPlayerStateChange
                }
              }); 
       
   });
   
   
   
  
      
      $(document).on('click','button#remove', function() {
      // console.log('button clicked');

      (confirm('are you sure you want to delete this cue point?')) ? $(this).closest('li').remove() : null  ;      
               
       
   
   });
      
      $(document).on('click', 'button#add_next', addNextCuepoint); 
    
 
   $(document).on('focus', 'input', function() {
      
      $(this).addClass('highlighted');
       
       
   });
   
   
   
   $(document).on('blur', 'input', function() {

        $(this).removeClass('highlighted');


     });
   
   $(document).on('click', 'a#seek_point', function() {
       
       var seconds = +$(this).text();
       player.seekTo(seconds, true);
       
       
   });

   
   function addCuepoint () {

         console.log(player.getCurrentTime());
        // var currentTime = '<li>'+player.getCurrentTime()+'<input class="cuepoint_text" ></input><button class="remove">remove</button><button class="add_next">add next</button></li>'
        //$('#timer').append($(currentTime));

        //$('#timer').add('li').add('input').addClass('.cuepoint_text'); 
        var cuepoint_text = $('<li class="cuepoints"><a id="seek_point">'+player.getCurrentTime()+'</a><input class="cuepoint_text" ></input><span class="remove"><button id="remove">remove</button></span><span class="add_next"><button id="add_next">add next</button></span></li>'); 
        $('#timer').append(cuepoint_text);  

      };
      
   function addNextCuepoint () {

       console.log(player.getCurrentTime());
      // var currentTime = '<li>'+player.getCurrentTime()+'<input class="cuepoint_text" ></input><button class="remove">remove</button><button class="add_next">add next</button></li>'
      //$('#timer').append($(currentTime));

      //$('#timer').add('li').add('input').addClass('.cuepoint_text'); 
      var cuepoint_text = $('<li class="cuepoints">'+player.getCurrentTime()+'<input class="cuepoint_text" ></input><span class="remove"><button id="remove">remove</button></span><span class="add_next"><button id="add_next">add next</button></span></li>'); 
      $(this).after(cuepoint_text);  
      console.log($(this));

    };

   
   function append (mytext,mytag) {
       
       $(this).after.$(mytag).text(mytext);
       
   };
    
   $('button#cuepoint_time').on('click', addCuepoint);
   
 
   
    
});

