
$('#submit-transaction-form').submit(function (event) {
  event.preventDefault();
  console.log("tá aqui")
  $.ajax({
      url: 'php/curl.php',
      type: 'POST',
      data: $('#submit-transaction-form').serialize(),
      beforeSend: function() {
          $('.loading-message').removeClass("hidden");
          $('#submit-button').val('Sending..');
      },
      success: function(valor){
        $('.toast-container').html(valor).fadeIn(3000);
        $('.loading-message').addClass("hidden");
        $('#submit-transaction-form').each(function () {
          this.reset();    
        })
        $('#submit-button').val('Submit Transaction');
        // document.getElementsByClassName('submit-button')[0].style.cursor = 'not-allowed';
        // document.getElementsByClassName('submit-button')[0].disabled = true;
      } 
  })
})
const submitButton = document.getElementsByClassName('submit-button')[0];
const toastContainer = document.getElementsByClassName('toast-container')[0];

/*
AddToastParameters = {
    type: 'success' | 'error',
    title: 'String',
    description: 'String'
}
*/
function AddToast(type, title, description){
    let previousContent = toastContainer.innerHTML;
    toastContainer.innerHTML = 
    `<div class="toast ${type === "success" ? 'success-toast' : 'error-toast'}">
        <header>
            ${type === "success" ? `<img src="./assets/images/success-icon.svg" alt="" class="toast-image">` : `<img src="./assets/images/error-icon.svg" alt="" class="toast-image">`}
            <div class="toast-title">${title}</div>
        </header>
        <div class="toast-description">${description}</div>
    </div>`;


    
}


// submitButton.addEventListener('click', function(e){
//     e.preventDefault();
//     const submitTransactionForm = new FormData(document.getElementById('submit-transaction-form'));
//     submitTransactionForm.append("gas_limit", 80000);
//     submitTransactionForm.append("fee", 2000);
    
//     // console.log(submitTransactionForm.values());
//     let data = {};
//     submitTransactionForm.forEach((value, key) => { 
//       if(key === "gas_limit" || key === "fee"){
//         data[key] = parseInt(value);
//       }else{
//         data[key] = value;
//       }
//     });
//     let JsonData = JSON.stringify(data);
//     console.log(JsonData);
//     fetch('http://38.242.133.24:26659/submit_pfb', {
//         method: 'POST',
//         body: JsonData,
//     })
//     .then(response => {
//       // validates if the request failed
//       if (!response.ok) {
//         console.log(response);

//         AddToast("error",'Error!','the server cannot be recive the transaction. Try again!');
//         document.getElementById('namespace_id').value = '';
//         document.getElementById('data').value = '';
//         // console.log('Toast de Erro do servidor');
//       }

//       // checking by status
//       else if (response.status !== 200) {
//         console.log(response.json())

//         AddToast("error",'Error!','Your transaction submission cannot be completed. Check the data and try again.');
//         document.getElementById('namespace_id').value = '';
//         document.getElementById('data').value = '';
//         // console.log('Toast de Erro no envio dos dados');
//         // return new Error('não encontrou qualquer resultado')
//       }
//       else if(response.status === 200){
//         console.log(response.json())
        
//         AddToast("success",'Success!',`your transaction has been sent. The data can be seen through <a target="_blank" href="https://testnet.mintscan.io/celestia-incentivized-testnet/txs/${response.data.txhash}">this link.</a>`);
//         document.getElementById('namespace_id').value = '';
//         document.getElementById('data').value = '';
//     }
//       // returns a promise with data in JSON
//     })
// 
