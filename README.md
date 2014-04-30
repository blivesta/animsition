clickstream
==================

clickstream.js is a simple and easy jQuery plugin used to add transition & easing effects to your page load. 
  
##Example
http://blivesta.github.io/clickstream

##Usage
jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/ 

~~~ go
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
<script src="//cdn.jsdelivr.net/jquery.easing/1.3/jquery.easing.1.3.js"></script>
<script src="../dist/clickstream.min.js"></script>

$(document).ready(function() {
    
  $("body").clickstream({

    // Class of the link that want to disable the 'clickstream' 
    inactiveClass :   'clickstream-inactive',
  
    // Animation type
    inAnimation:         'fade', // or 'leftToRight','rightToLeft','topToBottom','bottomToTop'
    outAnimation:        'fade', // or 'leftToRight','rightToLeft','topToBottom','bottomToTop'
  
    // Easing type
    //jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
    inEasing:         'easeOutExpo',
    outEasing:        'easeOutExpo',

    // Animation speed
    inSpeed:          800,
    outSpeed:         800,

    // Delay time
    inDelay :         100,
    outDelay :        100,
  
    // Opacity setting of start and end 
    inOpacity:        0,
    outOpacity:       0,
  
    // Animation start position of X adn Y
    inPositinX:       '10%',
    inPositinY:       '10%',
  
    // Animation end position of X adn Y
    outPositinX:      '10%',
    outPositinY:      '10%'
        
  });
    
}); 
~~~
