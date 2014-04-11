(function($) {
  var namespace = 'clickstream';
  var methods = {
    init: function(options){
      options = $.extend({
        inSpeed:          800,
        outSpeed:         800,
        inDelay :         100,
        outDelay :        100,
        inactiveClass :   'clickstream-inactive',
        inEffect:         'fade',
        outEffect:        'fade',
        inEasing:         'easeOutExpo',
        outEasing:        'easeOutExpo',
        defaultOpacity:   0,
        outOpacity:       0,
        defaultPositinX:  '10%',
        defaultPositinY:  '10%',
        outPositinX:      '10%',
        outPositinY:      '10%'
      }, options);
      return this.each(function(){
        var _this = this;
        var $this = $(this);
        var data = $this.data(namespace);
        if (!data) {        
          options = $.extend({
          }, options);
          $this.data(namespace, {
            options: options
          });          

          methods.initPosition.apply(_this);

          $(window).bind('load',function() {
            methods.pageIn.apply(_this);
          });
                    
          var $link = $('a:not(.'+options.inactiveClass+',[target*=_blank],[href^=#])');                    
          $link.off().on('click',function(e) {
            e.preventDefault();
            var url = $(this).attr('href');                        
            var stream = function(){
              location.href = url;
            };
            switch(options.outEffect) {
              case 'fade':
                $this.delay(options.outDelay).animate({
                  'opacity': options.outOpacity
                }, options.outSpeed, options.outEasing, function(){
                  stream.call($this, options);
                });
              break;
              case 'leftToRight':
                $this.delay(options.outDelay).animate({
                  'opacity': options.outOpacity,
                  'marginLeft':options.outPositinX
                }, options.outSpeed, options.outEasing, function(){
                  stream.call($this, options);
                });
              break;
              case 'rightToLeft':
                $this.delay(options.outDelay).animate({
                  'opacity': options.outOpacity,
                  'marginRight':options.outPositinX
                }, options.outSpeed, options.outEasing, function(){
                  stream.call($this, options);
                });
              break;
              case 'topToBottom':
                $this.delay(options.outDelay).animate({
                  'opacity': options.outOpacity,
                  'marginTop':options.outPositinY
                }, options.outSpeed, options.outEasing, function(){
                  stream.call($this, options);
                });
              break;
              case 'bottomToTop':
                $this.delay(options.outDelay).animate({
                  'opacity': options.outOpacity,
                  'marginTop':'-'+options.outPositinY
                }, options.outSpeed, options.outEasing, function(){
                  stream.call($this, options);
                });
              break;
            }
          });
        }
      }); // end each
    },
    initPosition: function(){
      var $this = $(this);
      options = $this.data(namespace).options;
      switch(options.inEffect) {
        case 'fade':
          $this.css({
            'opacity': 0
          });
        break;
        case 'rightToLeft':
          $this.css({
            'opacity': options.defaultOpacity,
            'marginLeft':options.defaultPositinX
          });
        break;
        case 'leftToRight':
          $this.css({
            'opacity': options.defaultOpacity,
            'marginRight':options.defaultPositinX
          });
        break;
        case 'bottomToTop':
          $this.css({
            'opacity': options.defaultOpacity,
            'marginTop':options.defaultPositinY
          });
        break;
        case 'topToBottom':
          $this.css({
            'opacity': options.defaultOpacity,
            'marginTop':'-'+options.defaultPositinY
          });
        break;
      }
    },
    pageIn: function(){
      var $this = $(this);
      options = $this.data(namespace).options;
      $this.delay(options.inDelay).animate({
        'opacity': 1,
        'margin':0
      }, options.inSpeed, options.inEasing);
    },
    destroy: function(){
      return this.each(function(){
        var $this = $(this);
        $(window).unbind('.'+namespace);
        $this.removeData(namespace);
      });
    }
  };
  $.fn.clickstream = function(method){
    if ( methods[method] ) {
      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.'+namespace);
    }
  };
})(jQuery);