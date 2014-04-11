clickstream
==================
###jquery plugin for add an effect to a page transition

ページのINとOUTにエフェクトを加えるjQuery  
アニメーションでjQuery Easingを利用。 
 
jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/ 
 
##Example
http://blivesta.github.io/clickstream

##Usage
~~~ go
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
<script src="../jquery.easing.1.3.js"></script>
<script src="../clickstream.min.js"></script>

$(document).ready(function() {
    
    $("body").clickstream({
        
        //遷移時のスピード。
    		inSpeed:          800,
    		outSpeed:         800,
    		
    		//遷移時のディレイ時間。
    		inDelay :         100,
    		outDelay :        100,
    		
    		//アニメーションさせずに遷移させたい場合に、そのaタグに付けるクラス名。
    		inactiveClass :   'clickstream_inactive',
    		
    		//アニメーションの種類。
    		inEffect:         'fade', // or 'leftToRight','rightToLeft','topToBottom','bottomToTop'
    		outEffect:        'fade', // or 'leftToRight','rightToLeft','topToBottom','bottomToTop'
    		
    		//アニメーションのイージングの種類。
    		//jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
    		inEasing:         'easeOutExpo',
    		outEasing:        'easeOutExpo',
    		
    		//画面IN直前とOUT直前の透過量
    		defaultOpacity:   0,
    		outOpacity:       0,
    		
    		//画面IN直前のポジション（fade選択時以外の時に適応）
    		defaultPositinX:  '10%',
    		defaultPositinY:  '10%',
    		
    		//画面OUT直前のポジション（fade選択時以外の時に適応）
    		outPositinX:      '10%',
    		outPositinY:      '10%',
    		
    });
    
});	
~~~
