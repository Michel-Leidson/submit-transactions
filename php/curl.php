<?php
    error_reporting(E_ALL ^ E_NOTICE);  
    // error_reporting = E_ALL & ~E_NOTICE
    $namespace_id = strip_tags(trim($_POST['namespace_id']));
    $datahex = strip_tags(trim($_POST['data']));
    $curl = curl_init();
    $data = array(
        'namespace_id' => $namespace_id,
        'data' => $datahex,
        'gas_limit' => 80000,
        'fee' => 2000
    );
    $postdata = json_encode($data);

    curl_setopt_array($curl, [
        CURLOPT_RETURNTRANSFER => 1,
        CURLOPT_URL => 'http://38.242.133.24:26659/submit_pfb',
        CURLOPT_POST => 1,
        CURLOPT_POSTFIELDS => $postdata 
    ]);

    $response = curl_exec($curl);
    // echo($response);
    $info = curl_getinfo($curl);
    // echo($info["http_code"]);
    curl_close($curl);
    $usable_data = json_decode($response);
    $txhash = $usable_data -> txhash;
    // echo($txhash);
     if($info["http_code"] == 200){
         echo "
         <div class='toast success-toast'>
             <header>
                 <img src='./assets/images/success-icon.svg' alt='' class='toast-image'>
                 <div class='toast-title'>Success!</div>
             </header>
             <div class='toast-description'>your transaction has been sent. The data can be seen through <a target='_blank' href='https://testnet.mintscan.io/celestia-incentivized-testnet/txs/" . $txhash . "'>this link.</a></div>
         </div>
         ";
     }elseif($info["http_code"] == 400){
        echo "
         <div class='toast error-toast'>
             <header>
                 <img src='./assets/images/error-icon.svg' alt='' class='toast-image'>
                 <div class='toast-title'>Error!</div>
             </header>
             <div class='toast-description'>Your transaction submission cannot be completed. Check the data and try again.</div>
         </div>
         "; 
     }elseif($info["http_code"] == 500){
        echo "
        <div class='toast error-toast'>
            <header>
                <img src='./assets/images/error-icon.svg' alt='' class='toast-image'>
                <div class='toast-title'>Error!</div>
            </header>
            <div class='toast-description'>the server cannot be recive the transaction. Try again!</div>
        </div>
        "; 
     }

?>