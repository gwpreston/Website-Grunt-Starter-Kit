
define(['modernizr', 'jQuery'], function(Modernizr, $) {

    "use strict";

    $(document).ready(function() {

        $('head link').each(function() {
            loadStyleSheet($(this).data('deferred'));
        });

    });

});
