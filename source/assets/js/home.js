
require(['layout', 'backbone', 'jQuery'], function(layout, Backbone, $) {

  "use strict";

    $(document).ready(function() {

      var App = Backbone.View.extend({
          initialize: function() {
              $('button').click(function() {
                  alert("jQuery alert!");
              });
          }
      });

      new App();

    });

});
