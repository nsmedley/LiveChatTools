$(document).ready(function() {
    //Set a deault storageItem for pluginVersion on first visit
    if (localStorage.getItem("pluginUpdate") === null) {
        localStorage.setItem('pluginUpdate', "0.1");
    }

    pluginUpdate();
    codeGenerator();
    buttonGenerator();
    hideGenerator();
    guides();
});


//Check if a new version of wordpress plguin has been uploaded and download
function pluginUpdate() {
    var pluginVersion = "1"

    //Check to see if a localStorage item is set if not prompt update notifcation 
    if (localStorage.getItem("pluginUpdate") < pluginVersion) {
        $('.nav__update').addClass('nav__update--update');
    }

    //If the "x" is clicked then hide the update notifcation and set a storageItem
    $('.nav__update span').click(function() {
        localStorage.setItem('pluginUpdate', pluginVersion); 
    });

    //On window click download file and set storageItem
    $('.nav__item--download').click(function(e) {
        e.preventDefault();  //stop the browser from following
        window.location.href = 'plugin/wp/mplivechat_(1.0.0).zip';
        localStorage.setItem('pluginUpdate', pluginVersion); 
        $('.nav__update').removeClass('nav__update--update');
    });
};

//Change styling and start the code generator form
function codeGenerator() {

    //Add active class to hidden Code Modal to display and fade in form
    $('.nav__item--code').click(function() {
        $('.code').removeClass('code--close');
        $('.code').addClass('code--active');
        $('.code__wrapper').addClass('code__wrapper--active');
    });

    //On close icon click reset classes ready for reopen
    $('.code__close').click(function() {
        $('.code').addClass('code--close');
        $('.code').removeClass('code--active');
        $('.code__wrapper').removeClass('code__wrapper--active');
    });

    //On select of GA or UA button add active class and add active class to next step
    $('.code__uaBtns .btn').click(function() {
        $('.code__uaBtns .btn').removeClass('btn--active');
        $(this).addClass('btn--active');
        $('.code__uaID').addClass('code__uaID--active');
    });

    //On input change of UA ID field set the var and add active class to next step
    $('#uaid').on('input', function() {
        var uaCode = $(this).val();

        //Check to ensure that the analytics id is formatted correctly
        if ((uaCode.indexOf('ua') >= 0) || (uaCode.indexOf('UA') >= 0)) {
            $('.code__tracking').addClass('code__tracking--active');
            $('.code__widget').addClass('code__widget--active');
            $('.code__uaID .error').slideUp('fast');
        } else {
            $('.code__uaID .error').slideDown('fast');
        }
    });

    //On text input of the widget id field make Reset & Generate buttons clickable
    $('#widgetid').on('input', function() {
        $('.code__Btns').addClass('code__Btns--active');
    });

    //On Reset button click reset all data fields and active classes
    $('.code__Btns .reset').click(function() {
        $('#uaid, #widgetid').val('');
        $('.code__uaBtns .btn').removeClass('btn--active');
        $('.code__uaID').removeClass('code__uaID--active');
        $('.code__tracking').removeClass('code__tracking--active');
        $('.code__widget').removeClass('code__widget--active');
        $('.code__Btns').removeClass('code__Btns--active');
        $('.code__output').removeClass('code__output--active');
        $('.code__copy').removeClass('code__copy--active');
    });

    //On Generate Btn click show loading spinner and paste code to <pre> area
    $('.code__Btns .gen').click(function() {
        var widgetCode = $('#widgetid').val();
        var uaCode = $('#uaid').val();
        $('.code__output .spinner').fadeIn('fast');
        setTimeout(function(){
            $('.code__output .spinner').fadeOut('fast');
            $('.code__output').addClass('code__output--active');
            $('.code__copy').addClass('code__copy--active');
        }, 1500);
        $(".prettyprint").text(function () {
            $('.prettyprint .widget').text(widgetCode);
            $('.prettyprint .ua').text(uaCode);
        });
        PR.prettyPrint();
    });

    //Copy code to clipboard
    $(".code__copy").click(function(){
        $(this).html('Code Copied');
    });
    var clipboard = new ClipboardJS('.code__copy');
    clipboard.on('success', function(e) {
        console.log(e);
    });
    clipboard.on('error', function(e) {
        console.log(e);
    });
};

//Create custom buttons for LiveChat using HTML2Canvas
function buttonGenerator() {
    var getCanvas; // global variable

    //Add active class to hidden button Modal to display and fade in form
    $('.nav__item--btn').click(function() {
        $('.generator').removeClass('generator--close');
        $('.generator').addClass('generator--active');
        $('.generator__wrapper').addClass('generator__wrapper--active');
    });

    //On close icon click reset classes ready for reopen
    $('.generator__close').click(function() {
        $('.generator').removeClass('generator--active');
        $('.generator').addClass('generator--close');
        $('.generator__wrapper').removeClass('generator__wrapper--active');
    });

    $('.save__update').on('click', function () {
        var element = $(".preview")[0];
        html2canvas(element, {
            scale: 2,
            onrendered: function (canvas) {
            $(".save__preview").append(canvas);
            getCanvas = canvas;
            }
        });
    });
    
    //Save image on "save" click
	$('.save__download').on('click', function () {
        var imgageData = getCanvas.toDataURL("image/png");
        // Now browser starts downloading it instead of just showing it
        var newData = imageData.replace(/^data:image\/png/, "data:application/octet-stream");
        $("#download").attr("download", "image.png").attr("href", newData);
    });
    

    //Icon picker
    $('.icp').iconpicker();
    
    $('#width').change(function() {
        var width = $('#width').val();
        $(".preview").css("width", width );
    });
    
    $('#height').change(function() {
        var height = $('#height').val();
        $(".preview").css("height", height );
        $(".preview").css("line-height", height + 'px' );
    });
    
    $('#bgColor').change(function() {
        var bgColor = $('#bgColor').val();
        $(".preview").css("background", bgColor );
    });
    
    $('#borderWidth').change(function() {
        var borderWidth = $('#borderWidth').val();
        $(".preview").css("border-width", borderWidth );
    });
    
    $('#borderColor').change(function() {
        var borderColor = $('#borderColor').val();
        $(".preview").css("border-color", borderColor );
    });
    
    $('#borderRadius').change(function() {
        var borderRadius = $('#borderRadius').val();
        $(".preview").css("border-radius", borderRadius + 'px' );
    });
    
    $('#buttonText').change(function() {
        var buttonText = $('#buttonText').val();
        $(".preview").html(buttonText);
    });
    
    $('#fontSize').change(function() {
        var fontSize = $('#fontSize').val();
        $(".preview").css("font-size", fontSize + 'px' );
    });
    
    $('#fontFamily').change(function() {
        var fontFamily = $('#fontFamily').val();
        $(".preview").css("font-family", fontFamily );
    });
    
    $('#fontColor').change(function() {
        var fontColor = $('#fontColor').val();
        $(".preview").css("color", fontColor );
    });
    
    $('#textAlign').change(function() {
        var textAlign = $('#textAlign').val();
        $(".preview").css("text-align", textAlign );
    });
    
    $('#padding').change(function() {
        var padding = $('#padding').val();
        $(".preview").css("padding-left", padding + 'px' );
        $(".preview").css("padding-right", padding + 'px' );
    });
    
    $('#textStyle').change(function() {
        var textStyle = $('#textStyle').val();
        $(".preview").css("text-transform", textStyle );
    });
    
    $('#icon').change(function() {
        if($(this).val() == 'yes'){
            $('.btn-group').show();
            var val = $('.iconpicker-component').html();
            var val2 = $('.preview').html();
            $('.preview').html(val2 + val);
        } else {
            $('.btn-group').hide();
        }
    });
}

function hideGenerator() {
    //Add active class to hidden button Modal to display and fade in form
    $('.nav__item--hide').click(function() {
        $('.hide').removeClass('hide--close');
        $('.hide').addClass('hide--active');
        $('.hide__wrapper').addClass('hide__wrapper--active');
    });

    //On close icon click reset classes ready for reopen
    $('.hide__close').click(function() {
        $('.hide').removeClass('hide--active');
        $('.hide').addClass('hide--close');
        $('.hide__wrapper').removeClass('hide__wrapper--active');
    });

}

function guides() {
    $('.navGuides').slick({
        slidesToShow: 5,
        infinite: true,
        prevArrow: '<div class="guidesArrow prev"><i class="fal fa-chevron-circle-left"></i></div>',
        nextArrow: '<div class="guidesArrow next"><i class="fal fa-chevron-circle-right"></i></div>'
    });

    $('.navGuides__item').click(function() {
        $('.overlay').fadeIn(400);
        $('.close').fadeIn(400);

        var data_id = $(this).attr("id");
        console.log(data_id);
        $('.guide[data-guide=' + data_id + ']').fadeIn(300);
    });

    $('.close').click(function() {
        $('.overlay').hide();
        $('.close').hide();
        $('.guide').hide();
    });

    $(document).keyup(function(e) {
        if (e.keyCode == 27) { // escape key maps to keycode `27`
            $('.overlay').hide();
            $('.close').hide();
            $('.guide').hide();
       }
   });
}