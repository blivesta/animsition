animsition
==================

Animsition is a simple and easy jQuery plugin used to add page transition on css animations.

*changed the name to "animsition" from "clickstream".

##Example
http://blivesta.github.io/animsition

##18 different animation class
####Fade
`fade-in` `fade-out` `fade-in-up` `fade-out-up` `fade-in-down` `fade-out-down` `fade-in-left` `fade-out-left` `fade-in-right` `fade-out-right`  
####Rotate
`rotate-in` `rotate-out`
####Flip
`flip-in-x` `flip-out-x` `flip-in-y` `flip-out-y`
####Zoom
`zoom-in` `zoom-out`

##Installation
####Step 1: Link required files
~~~ html
<!-- animsition css -->
<link rel="stylesheet" href="dist/css/animsition.min.css">

<!-- vendor js -->
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>

<!-- animsition js -->
<script src="dist/js/animsition.min.js"></script>
~~~

####Step 2: HTML markup
~~~ html
<div class="animsition">

  <a href="./page1" class="animsition-link">animsition link 1</a>

  <a href="./page2" class="animsition-link">animsition link 2</a>

</div>
~~~

####If you want to set for each "linkElement" a different animation. 
~~~ html
<a 
  href="./page1" 
  class="animsition-link" 
  data-animsition-out="flip-out-y"
  data-animsition-out-duration="2000"
>
  animsition link 1
</a>

<a 
  href="./page2" 
  class="animsition-link" 
  data-animsition-out="rotate-out"
  data-animsition-out-duration="500"
>
  animsition link 2
</a>
~~~

####If you want to set for each page a different animation.</h4>  
~~~ html
<div 
  class="animsition" 
  data-animsition-in-class="zoom-in"
  data-animsition-in-duration="1000"
  data-animsition-out-class="zoom-out"
  data-animsition-out-duration="800"
>
  ...
</div>
~~~

####Step 3: Call the animsition
~~~ js
$(document).ready(function() {
  $(".animsition").animsition({
    inClass        :'fade-in',
    outClass       :'fade-out',
    inDuration     : 1500,
    outDuration    : 800,
    linkElement    :'.animsition-link', //e.g.'a:not([target="_blank"]):not([href^=#])', 
    touchSupport   : true, 
    unSupportCss   :[
                    'animation-duration',
                    '-webkit-animation-duration',
                    '-o-animation-duration'
                    ]
  });
}); 
~~~

##Wordpress plugin
#####[Page Transition](http://wordpress.org/plugins/page-transition/ "Page Transition")
Authors

- numixtech
- gauravpadia
- asalamwp

##License
Released under the MIT license.
