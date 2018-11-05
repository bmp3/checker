<?php

function get_http_data( $url ) {

    $ch = curl_init();

    curl_setopt($ch,CURLOPT_URL, $url);
    curl_setopt($ch,CURLOPT_RETURNTRANSFER, 1);

    $result = curl_exec($ch);

    curl_close($ch);
    return $result;

}


function get_info( $currency = 'USD', $mode = 'echo' ) {

    $currency = isset($_POST['currency']) ? $_POST['currency'] : 'USD';

    $cryptos = array('ETH', 'LTC', 'BTC');
    //$cryptos = array( 'ETH' );
    $result = array();

    foreach ($cryptos as $crypto) {
        $data = get_http_data('https://apiv2.bitcoinaverage.com/indices/global/ticker/' . $crypto . $currency);
        if ($data) {
            $data = json_decode($data);
            if ($data) {

                $result[$crypto] = $data;

            }
        }
    }

    if ( $mode == 'echo') {
        echo json_encode( $result );
        die();
    }
    else
        return $result;

}


if ( isset( $_POST['currency'] ) ) {
    get_info(  $_POST['currency'], 'echo' );
}


?>