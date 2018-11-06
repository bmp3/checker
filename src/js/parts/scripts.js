jQuery(document).ready( function() {

    function populateItem( el, rowdata ) {

        var el, data, coin, mode, symbol, priceSymbol;

        data = rowdata;

        priceSymbol = $('.selection-box a.current').attr('data-symbol');
        el = $(el);
        coin = el.attr('data-coin');
        mode = el.attr('data-mode');
        if ( mode == 'price' )
            symbol = $('.selection-box a.current').attr('data-symbol');
        else
            symbol = '%';
        console.log(data[coin]['last']);
        el.find('.price-value').html( priceSymbol + data[coin]['last']);
        el.find('.hour .change-value').html( data[coin]['changes'][mode]['hour'] + symbol );
        el.find('.day .change-value').html( data[coin]['changes'][mode]['day'] + symbol );
        el.find('.week .change-value').html( data[coin]['changes'][mode]['week'] + symbol );
        el.find('.month .change-value').html( data[coin]['changes'][mode]['month'] + symbol );

    }

    $('.select-box a').on( 'click', function( e ) {
        e.preventDefault();
        var currency = $(e.target).attr('href');

        $('.selection-box a').removeClass('current');
        $(e.target).addClass('current loading');

        $.ajax({
            url : 'info.php',
            data : { 'currency' : currency },
            type : 'POST',
            success:function( rowdata )
            {
                var data = JSON.parse( rowdata );
                loadedData = data;
                $('.c-item').each( function( i, el ) {
                    populateItem( el, loadedData );
                });
                $(e.target).removeClass('loading');
            },
            error:function( jqXHR, textStatus, errorThrown )
            {

            }
        });
    });

    $('.switch .reciever').on( 'click', function( e ) {
        if ( $(e.target).hasClass('reciever-on') ) {
            $(e.target).parents('.switch').removeClass('off').addClass('on');
            $(e.target).parents('.c-item').attr( 'data-mode', 'percent' );
        }
        else {
            $(e.target).parents('.switch').removeClass('on').addClass('off');
            $(e.target).parents('.c-item').attr( 'data-mode', 'price' );
        }
        populateItem( $(e.target).parents('.c-item'), loadedData );
    });

});