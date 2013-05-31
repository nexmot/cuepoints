$(document).ready(function() {
  // 2. This code loads the IFrame Player API code asynchronously.
          var tag = document.createElement('script');

          tag.src = "https://www.youtube.com/iframe_api";
          var firstScriptTag = document.getElementsByTagName('script')[0];
          firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    
  // $('h1').text('y esto funciona?'); 
  // embed full url example http://www.youtube.com/embed/S9dqJRyk0YM
    $('#video_url').val("http://www.youtube.com/watch?v=cRmbwczTC6E").css("display:none");
    var video_id = $('#video_url').val();
    var ytplayer; 
    var $cuepoint_duration = $('input#cuepoint_duration');
    $cuepoint_duration.val(3) ;
    var cuepoint_duration = parseFloat($cuepoint_duration.val());
   
   $('button#submit_video').on('click', function() {
      console.log('pressed submit');
      var video_id = youtube_parser($('#video_url').val());
 //     console.log(video_id);
      
      //var video_url_embed = $('#video_url').val();
      //$('#video').html('<iframe id="player" origin="http://localhost.php-apps" width="560" height="315" src="'+video_url_embed+'" frameborder="0" allowfullscreen></iframe>');
      //$('#video').html(iframe);     
    function onYouTubeIframeAPIReady() { 
              console.log(video_id);

              if (ytplayer != null) { ytplayer.destroy();}
      ytplayer = new YT.Player('player', {
                height: '390',
                width: '580',
                videoId: video_id,
                events: {
                  //'onReady': onPlayerReady,
                  'onStateChange': onPlayerStateChange,
                  //'onError': alert("oops YouTube is not ready, please try again")
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
           alert("video URL is not correct");
       }
   };

   function get_cuepoint_item (time_start, time_end) {
     
       var cuepoint_time_start = time_start || ytplayer.getCurrentTime();
       var cuepoint_time_end = time_end || time_start + cuepoint_duration;
       //console.log(time);
       var cuepoint_text = $('input#type_text').val();

       //var cuepoint_time_end = cuepoint_time_start + cuepoint_duration;

       //var next_cuepoint_time_start = parseFloat($(this).closest('tr').next('tr').data('cuepoint_time_start'));
       
       //console.log($cuepoint_duration.val());
       return $('<tr class="cuepoints" data-cuepoint_time_start="'+ cuepoint_time_start +'" data-cuepoint_time_end="'+ cuepoint_time_end + '" data-cuepoint_text="'+cuepoint_text+'"><td><a id="seek_point">'+formatTimestamp(cuepoint_time_start)+'</a></td><td><a id="seek_point">'+formatTimestamp(cuepoint_time_end)+'</a></td><td><form action=""><textarea id="submit_text" class="cuepoint_item" type="text" placeholder="enter text" >'+cuepoint_text+'</textarea></form><td><button id="remove" class="small alert button">remove</button><button id="add_next" class="small button">add next</button><button id="save_cuepoint" class="small button" style="display:none">save cuepoint</button></td></tr>'); 
       
   };
    
   function addCuepoint (time_start, time_end) {
     //   console.log(ytplayer.getCurrentTime());
     //   console.log(time);
     
        var cuepoint_time_start = time_start || parseFloat($('.cuepoints').last('tr').data('cuepoint_time_end')) || 0;
        var cuepoint_time_end = time_end || (cuepoint_time_start + cuepoint_duration);
        var cuepoint_item = get_cuepoint_item(cuepoint_time_start, cuepoint_time_end);
        $('tbody#timer').append(cuepoint_item);  

   };
      
   function addNextCuepoint () {

      // console.log(ytplayer.getCurrentTime());
       var cuepoint_time_start = parseFloat($(this).closest('tr').data('cuepoint_time_end'));

       var next_cuepoint_time_start = $(this).closest('tr').next('tr').data('cuepoint_time_start');

      // console.log("this is the next point start" + next_cuepoint_time_start);
       if (next_cuepoint_time_start > 0) { console.log("more than 0");
       var cuepoint_time_end = (cuepoint_time_start + cuepoint_duration > next_cuepoint_time_start) ? next_cuepoint_time_start : cuepoint_time_start + cuepoint_duration;
       } else {
          var cuepoint_time_end = cuepoint_time_start + cuepoint_duration; 
       };

       var cuepoint_item = get_cuepoint_item(cuepoint_time_start, cuepoint_time_end);
       $(this).closest('tr').after(cuepoint_item);  
       console.log($(this));

   };
   
   function removeCuepoint() {
 
           (confirm('are you sure you want to delete this cue point?')) ? $(this).closest('tr').remove() : null  ;      

     };
     
    
   function saveCuepoint() {
        var $tr = $(this).closest('tr');        
        var text = $tr.find('textarea').val();
    
    
        $($tr).data('cuepoint_text',text);
        console.log("grabado"+$tr.data('cuepoint_text'));
   };

    // Takes a number of seconds and returns a #h##m##s string.
   function formatTimestamp(timestamp) {
          var hours = Math.floor(timestamp / 3600);
          var minutes = Math.floor((timestamp - (hours * 3600)) / 60);
          var seconds = (timestamp % 60).toFixed(2);

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
         
         $(this).data('cuepoint_text',$(this).find('textarea').val()); 
         console.log($(this).data('cuepoint_time_start') + "," + $(this).data('cuepoint_text'));
         
         
     });
     
     // for ( var i = 0; i < $('.cuepoints').length; i++) {
     //     
     //     //var li = $($('.cuepoints')[i]);
     //     var li = $('.cuepoints').eq(i);
     //     li.data('cuepoint_text',li.find('textarea').val()); 
     //     console.log(li.data('cuepoint_time_start') + "," + li.data('cuepoint_text'));
     //     
     // };     
       
   };
   
   var time_init_typing;
   var live_time_start_toggle = true;
   
   $('input#type_text').on('keypress', function(e) {
       time_init_typing = time_init_typing || ytplayer.getCurrentTime();
       live_time_start_toggle = false
       if(e.which == 13) {
               addCuepoint(time_init_typing, ytplayer.getCurrentTime());
               console.log(time_init_typing + " " + ytplayer.getCurrentTime() ) ;
               $('input#type_text').val("");
               time_init_typing = null;
               live_time_start_toggle = true;
           };
       });
    
   $('button#add_cuepoint').on('click', function() {
       
       var time = ytplayer.getCurrentTime();
       addCuepoint(time);
   });
   
   $('button#add_cuepoint_all').on('click', function() {
       
       var number_cuepoints = Math.floor(ytplayer.getDuration() / cuepoint_duration);
       console.log(number_cuepoints);
       
       var cuepoint_time_start = 0;
       var cuepoint_time_end;
       
       for (var i = 0; i < number_cuepoints; i++) {
       
       cuepoint_time_end = cuepoint_time_start + cuepoint_duration;
       
       addCuepoint(cuepoint_time_start, cuepoint_time_end);   
       
       cuepoint_time_start += cuepoint_duration;  
           
       };
       
       
   });
   
   $('button#remove_cuepoint_all').on('click', function() {
          var $cuepoints = $('.cuepoints');
          var number_cuepoints = $cuepoints.length;
          console.log(number_cuepoints);
          if (confirm('are you sure you want to delete ALL the cue points?')) {
          
              
                for (var i = 0; i < number_cuepoints; i++) {

                $cuepoints.eq(i).remove();    

                };
              
              
          };
          


      });
   
    
   $('button#generate_srt').on('click', generateSrt);
   
   $(document).on('click','button#remove',removeCuepoint);
   
   
   $(document).on('click', 'button#add_next', addNextCuepoint);  
    
   $(document).on('click', 'button#save_cuepoint', saveCuepoint);

   $(document).on('focus', 'textarea', function() {

       $(this).addClass('highlighted');

   });


   $(document).on('blur', 'textarea', function() {

       $(this).removeClass('highlighted');

   });

   $(document).on('click', 'a#seek_point', function() {

       var seconds = +$(this).closest('tr').data('cuepoint_time_start');
       ytplayer.seekTo(seconds, true);

   });
   
   $(document).on('change', 'input#cuepoint_duration', function() {
       //alert('cuepoint duration changed');
       cuepoint_duration = parseFloat($('input#cuepoint_duration').val()) ;
       
   });
     
   
   //http://stackoverflow.com/questions/7298341/timer-along-with-youtube-clip-with-js-to-show-divs-at-different-times


   function onPlayerStateChange(event) {    
       
       if(event.data == YT.PlayerState.PLAYING){ // playing
            startWatch();
            console.log("playing");
       }
       else if(YT.PlayerState.ENDED || YT.PlayerState.PAUSED){ //ended or paused
            stopWatch();   
       }            
   }

   var overlays = [
       {text:"Steve Chen",from:1,to:6},
       {text:"Geoff Stearns",from:8,to:14}]

   var watchId;

   var $cuepoints;
   
   function startWatch(){
       watchId = setInterval( function(){
          // showOrHideOverlay(ytplayer.getCurrentTime());
          updatePlayerInfo();
       },250);
       $cuepoints = $('.cuepoints');
   }

   function stopWatch(){
     clearTimeout(watchId);
   }
   
   function updatePlayerInfo(){
      // console.log(ytplayer.getCurrentTime());
       showOrHideOverlay(ytplayer.getCurrentTime());
       if (live_time_start_toggle == true) {
       $('#live_time_start').text(ytplayer.getCurrentTime());
       }
       $('#live_time_end').text(ytplayer.getCurrentTime());
   }

   function showOrHideOverlay(time){
       // find overlays which should be visible at "time"
       var shownOverlays = false;
       for(var i=0;i<$cuepoints.length;i++){
           cuepoint_text = $('.cuepoints').eq(i).closest('tr').data('cuepoint_text');
           cuepoint_time_start = $('.cuepoints').eq(i).closest('tr').data('cuepoint_time_start');
           cuepoint_time_end = $('.cuepoints').eq(i).closest('tr').data('cuepoint_time_end');
           if(cuepoint_time_start < time && cuepoint_time_start + cuepointDuration(cuepoint_time_start, cuepoint_time_end) > time){
               $('#prompter').text(cuepoint_text);
               shownOverlays = true;
           }           
       }
       if(!shownOverlays)
           $('#prompter').text("");

   };
   
   function cuepointDuration (time_start, time_end) {
       
       return time_end - time_start;
       
       
   };
   
   // the popcorn type of functionality var elem = $($('#extra-info').children('img')).attr('src','img/extras/s_1.jpg')
    
});

