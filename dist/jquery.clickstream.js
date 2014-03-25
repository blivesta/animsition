/*!
 * clickstream v1.0.0
 * Copyright 2014 blivesta
 * Licensed under MIT
 * http://blivesta.com/clickstream/
 */
!function($) {
  var namespace = "clickstream", methods = {
    init: function(options) {
      return options = $.extend({
        inSpeed: 800,
        outSpeed: 800,
        inDelay: 100,
        outDelay: 100,
        inactiveClass: "clickstream-inactive",
        inEffect: "fade",
        outEffect: "fade",
        inEasing: "easeOutExpo",
        outEasing: "easeOutExpo",
        defaultOpacity: 0,
        outOpacity: 0,
        defaultPositinX: "10%",
        defaultPositinY: "10%",
        outPositinX: "10%",
        outPositinY: "10%"
      }, options), this.each(function() {
        var _this = this, $this = $(this), data = $this.data(namespace);
        if (!data) {
          options = $.extend({}, options), $this.data(namespace, {
            options: options
          }), methods.defaultPosition.apply(_this), $(window).bind("load", function() {
            methods.pageIn.apply(_this);
          });
          var $internalLink = $("a:not(." + options.inactiveClass + ",[target*=_blank],[href^=#])");
          $internalLink.off().on("click", function(e) {
            e.preventDefault();
            var url = $(this).attr("href"), goStream = function() {
              location.href = url;
            };
            switch (options.outEffect) {
             case "fade":
              $this.delay(options.outDelay).animate({
                opacity: options.outOpacity
              }, options.outSpeed, options.outEasing, function() {
                goStream.call($this, options);
              });
              break;

             case "leftToRight":
              $this.delay(options.outDelay).animate({
                opacity: options.outOpacity,
                marginLeft: options.outPositinX
              }, options.outSpeed, options.outEasing, function() {
                goStream.call($this, options);
              });
              break;

             case "rightToLeft":
              $this.delay(options.outDelay).animate({
                opacity: options.outOpacity,
                marginRight: options.outPositinX
              }, options.outSpeed, options.outEasing, function() {
                goStream.call($this, options);
              });
              break;

             case "topToBottom":
              $this.delay(options.outDelay).animate({
                opacity: options.outOpacity,
                marginTop: options.outPositinY
              }, options.outSpeed, options.outEasing, function() {
                goStream.call($this, options);
              });
              break;

             case "bottomToTop":
              $this.delay(options.outDelay).animate({
                opacity: options.outOpacity,
                marginTop: "-" + options.outPositinY
              }, options.outSpeed, options.outEasing, function() {
                goStream.call($this, options);
              });
            }
          });
        }
      });
    },
    defaultPosition: function() {
      var $this = $(this);
      switch (options = $this.data(namespace).options, options.inEffect) {
       case "fade":
        $this.css({
          opacity: 0
        });
        break;

       case "rightToLeft":
        $this.css({
          opacity: options.defaultOpacity,
          marginLeft: options.defaultPositinX
        });
        break;

       case "leftToRight":
        $this.css({
          opacity: options.defaultOpacity,
          marginRight: options.defaultPositinX
        });
        break;

       case "bottomToTop":
        $this.css({
          opacity: options.defaultOpacity,
          marginTop: options.defaultPositinY
        });
        break;

       case "topToBottom":
        $this.css({
          opacity: options.defaultOpacity,
          marginTop: "-" + options.defaultPositinY
        });
      }
    },
    pageIn: function() {
      var $this = $(this);
      options = $this.data(namespace).options, $this.delay(options.inDelay).animate({
        opacity: 1,
        margin: 0
      }, options.inSpeed, options.inEasing);
    },
    destroy: function() {
      return this.each(function() {
        var $this = $(this);
        $(window).unbind("." + namespace), $this.removeData(namespace);
      });
    }
  };
  $.fn.clickstream = function(method) {
    return methods[method] ? methods[method].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof method && method ? void $.error("Method " + method + " does not exist on jQuery." + namespace) : methods.init.apply(this, arguments);
  };
}(jQuery);