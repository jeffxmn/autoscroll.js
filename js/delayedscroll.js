/*
 * Created by Jeff Martin, Toronto October 2013
 */
$(function() {
    /* Amount of times the user needs to scroll to trigger an scroll */
    var SCROLL_COUNTER_LIMIT = 50;

    /* Scrolling speed in MS */
    var SCROLL_SPEED = 750;

    /* Keep track of a counter indicating when it is time to scroll */
    var scrollCounter = 0;

    /* The current page we're on. On load, it's page 1 */
    var page = 1;

    /* On load, make sure the first page is showing */
    scrollToPage(page);

    /* Detect user scrolling on Firefox */
    $(window).bind('DOMMouseScroll', function(e) {
        e.preventDefault();

        // Prevent scroll when it is not time yet
        if (++scrollCounter != SCROLL_COUNTER_LIMIT) {
            return false;
        }

        // When it is time to scroll, then scroll like the wind
        if (e.originalEvent.detail < 0) {
            scrollUp();
        } else {
            scrollDown();
        }
    });

    /* Detect user scrolling on Webkit, Opera, and IE */
    $(window).bind('mousewheel', function(e) {
        e.preventDefault();

        // Prevent scroll when it is not time yet
        if (++scrollCounter != SCROLL_COUNTER_LIMIT) {
            return false;
        }

        // When it is time to scroll, then scroll like the wind
        if (e.originalEvent.wheelDelta > 0) {
            scrollUp();
        } else {
            scrollDown();
        }
    });

    /* Detect arrow keys */
    $(document).keydown(function(e) {
        if (e.keyCode == 38) {
            e.preventDefault();
            scrollUp();
        } else if (e.keyCode == 40) {
            e.preventDefault();
            scrollDown();
        }
    });

    /* Scroll up */
    function scrollUp() {
        if (!$('.page-' + (page - 1))[0]) {
            scrollCounter = 0;
            return false;
        } else {
            scrollToPage(--page);
        }
    }

    /* Scroll down */
    function scrollDown() {
        if (!$('.page-' + (page + 1))[0]) {
            scrollCounter = 0;
            return false;
        } else {
            scrollToPage(++page);
        }
    }

    /* Scroll to the specified page */
    function scrollToPage(page) {
        $('html, body').animate({
            scrollTop: $('.page-' + page).offset().top
        }, SCROLL_SPEED, function() {
            scrollCounter = 0;
        });
    }
});
