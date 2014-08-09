(function($) {
  var namespace = 'dropdown';
  var methods = {

    init: function(options){
      options = $.extend({
        toggle:     'dropdown-toggle',
        body:       'dropdown-menu',
        open:       'open',
        close:      'close'
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
        }
        
        var $toggle = $this.find('.'+options.toggle);
        var $other = $("body").not($this);

        $other.on('click.'+namespace, function(){
          methods.close.apply(_this);
        });

        $toggle.on('click.'+namespace, function(event){
          event.stopPropagation();
          methods.toggle.call(_this);
        });

      }); // end each
    },
        
    toggle: function(){
      var $this = $(this);
      options = $this.data(namespace).options;
      var statusOpen = $this.hasClass(options.open);
      if(statusOpen){
        methods.close.call(this);
      }else{
        methods.open.call(this);      
      }
    },
    
    open: function(){
      var $this = $(this);
      options = $this.data(namespace).options;
      methods.allClose.call(this); 
      $this
      .removeClass(options.close)
      .addClass(options.open);
    },

    close: function(){
      var $this = $(this);
      options = $this.data(namespace).options;
      $this
      .removeClass(options.open)
      .addClass(options.close);
    },

    allClose: function(){
      var $this = $(this);
      options = $this.data(namespace).options;
      $("."+ namespace)
      .removeClass(options.open)
      .addClass(options.close);
    },
    
    destroy: function(){
      return this.each(function(){
        var $this = $(this);
        $(window).unbind('.'+namespace);
        $this.removeData(namespace);
      });
    },
    
  };
  $.fn.dropdown = function(method){
    if ( methods[method] ) {
      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.'+namespace);
    }    
  };
})(jQuery);