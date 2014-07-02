/*!
 * clickstream v2.2.1
 * http://blivesta.github.io/clickstream/
 * Licensed under MIT
 * Copyright 2013-2014 blivesta
 * 
 */
(function($) {
  var namespace = "clickstream";
  var methods = {
    init: function(options) {
      options = $.extend({
        inClass: "clickstream-in",
        outClass: "clickstream-out",
        linkClass: "clickstream-link",
        touchSupport: true
      }, options);
      return this.each(function() {
        var _this = this;
        var $this = $(this);
        var data = $this.data(namespace);
        var inAnimate = $this.data("animate-in");
        var outAnimate = $this.data("animate-out");
        var bindingEvent = "click." + namespace;
        
        if (!data) {
          options = $.extend({}, options);
          $this.data(namespace, {
            options: options
          });
          $(window).load(function() {
            methods.pageIn.call(_this, inAnimate);
          });
          if (options.touchSupport) {
            bindingEvent += " touchstart." + namespace;
          }
          $("." + options.linkClass).on(bindingEvent, function(event) {
            event.preventDefault();
            var $self = $(this);
            methods.pageOut.call(_this, $self, outAnimate);
          });
        }
      });
    },
    pageIn: function(inAnimate) {
      var $this = $(this);
      var options = $this.data(namespace).options;
      var inDelay = $("." + options.inClass).css("animation-duration").replace(/s/g, "") * 1e3;
      $this.addClass(inAnimate);
      setTimeout(function() {
        $this.removeClass(inAnimate + " " + options.inClass).addClass(options.outClass).css({
          opacity: 1
        });
      }, inDelay);
    },
    pageOut: function($self, outAnimate) {
      var $this = $(this);
      var options = $this.data(namespace).options;
      var url = $self.attr("href");
      var outDelay = $("." + options.outClass).css("animation-duration").replace(/s/g, "") * 1e3;
      var stream = function() {
        location.href = url;
      };
      $this.addClass(outAnimate);
      setTimeout(function() {
        stream();
      }, outDelay);
    },
    destroy: function() {
      return this.each(function() {
        var $this = $(this);
        $(window).unbind("." + namespace);
        $this.removeData(namespace);
      });
    }
  };
  $.fn.clickstream = function(method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === "object" || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error("Method " + method + " does not exist on jQuery." + namespace);
    }
  };
})(jQuery);