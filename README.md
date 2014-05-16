clickstream
==================
clickstream is a simple and easy jQuery plugin used to add page transition on css animations.

##Example
http://blivesta.github.io/clickstream

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
<!-- clickstream css -->
<link rel="stylesheet" href="dist/css/clickstream.min.css">

<!-- vendor js -->
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>

<!-- clickstream js -->
<script src="dist/js/clickstream.min.js"></script>

<script>
$(document).ready(function() {
  $(".clickstream").clickstream();
}); 
</script>

<body 
  class="clickstream clickstream-in" 
  data-animate-in="fade-in" 
  data-animate-out="fade-out-down"
>

<a class="clickstream-link" href="./">clickstream link</a>

</body>
~~~

##License

Released under the MIT license.
