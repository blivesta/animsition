animsition
==================

animsition is a simple and easy jQuery plugin used to add page transition on css animations.

*changed the name to "animsition" from "clickstream".

##Example
http://blivesta.github.io/animsition

##Animations class
####Fade
`fade-in` `fade-out` `fade-in-up` `fade-out-up` `fade-in-down` `fade-out-down` `fade-in-left` `fade-out-left` `fade-in-right` `fade-out-right`  
####Rotate
`rotate-in` `rotate-out`
####Flip
`flip-in-x` `flip-out-x` `flip-in-y` `flip-out-y`
####Zoom
`zoom-in` `zoom-out`

##Setup
~~~ go
<!-- animsition css -->
<link rel="stylesheet" href="dist/css/animsition.min.css">

<!-- vendor js -->
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>

<!-- animsition js -->
<script src="dist/js/animsition.min.js"></script>

<script>
$(document).ready(function() {
  $(".animsition").animsition({
	  inClass: "animsition-in-duration",
	  outClass: "animsition-out-duration",
	  linkElement: ".animsition-link"
  });
}); 
</script>

<div 
  class="animsition animsition-in-duration" 
  data-animsition-in="fade-in" 
  data-animsition-out="fade-out-down"
>

<a href="./page1" class="animsition-link" data-animsition-out="flip-out-y">
  animsition link 1
</a>

<a href="./page2" class="animsition-link" data-animsition-out="rotate-out">
  animsition link 2
</a>

</div>
~~~

##License

Released under the MIT license.
