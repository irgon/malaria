$(document).ready(function() {
    /* IE6 */
    if ($.browser.msie && $.browser.version.substr(0,1) < 7) {
        $('img[src$=".png"]').each(function() {
            $(this).width($(this).width());
            $(this).height($(this).height());
            $(this).css('filter', 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + $(this).attr('src') + '",sizingMethod="crop");');
            $(this).attr('src', 'img/pix.gif');
        });
    }
    
    /* FORM */
    $('dl.form > dt:not(.free) + dd > input[class^="text"], dl.form > dt:not(.free) + dd > textarea').blur(function(e) {
        if($(this).val() == '' || ($(this).attr('id').match(/^.?email$/) && !$(this).val().match(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b/i))) {
            $(this).parent().addClass('invalid' + ($(this).is('textarea') ? '-textarea' : ($(this).parent().hasClass('below') ? '-below' : '' )));
        } else {
            $(this).parent().removeClass('invalid').removeClass('invalid-textarea').removeClass('invalid-below');
        }
    });
    
    $('form').submit(function(e) {
        var valid = true;
        $(this).find('dl.form > dt:not(.free) + dd > input[class^="text"], dl.form > dt:not(.free) + dd > textarea').each(function(i) {
            if($(this).val() == '' || ($(this).attr('id').match(/^.?email$/) && !$(this).val().match(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b/i))) {
                valid = false;
            $(this).parent().addClass('invalid' + ($(this).is('textarea') ? '-textarea' : ($(this).parent().hasClass('below') ? '-below' : '' )));
            } else {
                $(this).parent().removeClass('invalid').removeClass('invalid-textarea').removeClass('invalid-below');
            }
        });
        if(!valid) {
            e.preventDefault();
        }
    });
    
    /* SELECT */
    $('div.select > select').change(function() {
        $(this).parent().children('span').text($(this).children('option[value="' + $(this).val() + '"]').text());
    });
    $('div.select > select').change();

    
    /* FIELD AUTOCOMPLETE */
    $('input.autocomplete, textarea.autocomplete').addClass('default-value').each(function() {
        $(this).data('defaultValue', $(this).val())
    }).focus(function(e) {
        $(this).removeClass('default-value');
        if($(this).val() == $(this).data('defaultValue')) {
            $(this).val('');
        }
    }).blur(function(e) {
        if($(this).val() == '') {
            $(this).addClass('default-value');
            $(this).val($(this).data('defaultValue'));
        }
    });
    
    /* POLAND */
    $('#poland map area').click(function(e) {
        e.preventDefault();
        $('#poland #region').val($(this).attr('href').replace('#', '')).change();
    })
    
    if($('img.map').is('img')) {
        $('.map').maphilight({fade: false, fill: true, fillColor: '85816d', fillOpacity: 0.5, stroke: false})
    }
    
    $('#poland #region').change(function(e) {
        if($(this).val() == '') {
            $('#city option').show();
        } else {
            $('#city option:not([value=]):not(.' + $(this).val() + ')').hide();
            $('#city option.' + $(this).val()).show();
        }
        if($(this).data('auto') == '1') {
            $(this).data('auto', '0');
        } else {
            $('#poland #city').val('').change();
        }
    });
    $('#poland #city').change(function(e) {
        if($(this).val() != '') {
            $('#poland #region').data('auto', '1');
            $('#poland #region').val($(this).find('option[value=' + $(this).val() + ']').attr('class')).change();
        }
    });
    
}); 