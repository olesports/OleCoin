//geth --rpc --rpcaddr "localhost" --rpcport "8545" --rpcapi "web3,eth,net,personal" --rpccorsdomain "*" --datadir "./private"

// web3 
// projeto https://github.com/ethereum/web3.js
//documentação https://github.com/ethereum/wiki/wiki/JavaScript-API

//load
window.addEventListener('load', function() {
    //var urlNode = 'http://127.0.0.1:8545';
    //var urlNode = 'http://localhost:8545';
    //window.web3 = new Web3(new Web3.providers.HttpProvider(urlNode));
    // conect with metamask
    window.web3 = new Web3(web3.currentProvider)
    checkWeb3()

    carregarToken();
});

//Check the web3 connection
function checkWeb3(){
    // Set the connect status on the app
    if (web3 && web3.isConnected()) {
        console.info('Connected');
        $('#no_status').text("Conectado");
        // Set version
        setWeb3Version();
        checkNodeStatus();
    } else {
        console.info('Not Connected');
        $('#no_status').text("Desconectado");
    }
}

//Get web3 version
function setWeb3Version() {
    var versionJson = {};
    // Asynchronous version
    web3.version.getNode(function(error, result){
        if(error){
            console.info(error);
        } else {
            $('#versionGeth').text(result);
            console.info(result);
        }
    });
}

//check if the client is listening and peer count
function checkNodeStatus()  {
    // it is Asynch
    web3.net.getListening(function(error, result){
        if(error) {
            console.info('get_peer_count ' + error);
        } else {
            // get the peer count
            web3.net.getPeerCount(  function(  error,  result ) {
                if(error){
                    console.info('get_peer_count ' + error);
                } else {
                    $('#nodes').text(result);
                    console.info('Peer Count: ' + result);
                }
            });
        listAccounts();
        }
    });
}

function listAccounts() {
    //Asynch
    
    web3.eth.getAccounts(function (error, result) {
        if (error) {
            console.info('accounts ' + error);
            
        } else {
            $('#conecxao').hide();
            //var accounts = result;
            $('#sizeAccounts').text(result.length);
            console.info('accounts length =' + result.length);

            var accounts_ul = $('#accounts_ul');
            // clear the accounts_ul
            accounts_ul.empty;
            // Add the accounts as list items
            /*for (var i = 0; i < result.length; i++) {
                accounts_ul.append('<li>'+result[i]+'</li>');
            }*/
            accounts_ul.append(result[0]);
            $('#addressAccount').val(result[0]);
                                               
            /*for (var i = 0; i < result.length; i++) {
                accounts_ul.append(result[i]);
            }
            */
            var coinbase = web3.eth.coinbase;
            if(coinbase){

            }
            coinbase = coinbase.substring(0,25)+'...'
            console.info('==coinbase==='+ coinbase);
            var defaultAccount = web3.eth.defaultAccount;
            console.info('==defaultAccount==='+ defaultAccount);  
            
        }
    });
    
}


$( "#btnBalance" ).click(function() {
    var account = $('#account').val();
    console.info(account);
    web3.eth.getBalance(account, web3.eth.defaultBlock, function(error, result){
        console.info(result);
        var balance = web3.fromWei(result, 'ether').toFixed(2);
        $('#accountBalance').val(balance);
    });
});


$( "#btnUnlock" ).click(function() {
    var accountUnlock = $("#accountUnlock").val();
    var password = $("#password").val();
    console.info(accountUnlock);
    web3.personal.unlockAccount(accountUnlock, password, function(error, result)  {
        if(error){
            alert(error);
        } else {
            if(result){
                alert('Account unlock');
            } else {
                alert("It wasn't possible to unlock the account.");
            }   
        }
    });
});

$( "#btnSendEther" ).click(function() {
    var sender = $("#from").val();
    var receiver = $("#to").val();
    var amount = $("#valueToSend").val();

    web3.eth.sendTransaction({
        "from": sender,
        "to": receiver,
        "value": web3.toWei(amount, 'ether'),
        "gas": 300000},
        function(error, result)  {
        if(error){
            alert(error);
        } else {
            if(result){
                $('#labelResultSendEther').text(result);
            } else {
                alert("It wasn't possible to send transaction.");
            }   
        }
    });
});

$( "#btnTransaction" ).click(function() {
    var transaction = $("#transaction").val();

    web3.eth.getTransaction(transaction, function(error, result)  {
        if(error){
            alert(error);
        } else {
            if(result){
                console.info(result);
                $('#resultTransaction').val(JSON.stringify(result, null, '\t'));
            } else {
                alert("It wasn't possible to view the transaction.");
            }   
        }
    });
});


var abiToken = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"qtd","type":"uint256"}],"name":"comprarTokens","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"INITIAL_SUPPLY","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"kill","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"tokenPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_priceToken","type":"uint256"}],"name":"setPrice","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"saque","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":true,"stateMutability":"payable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"comprador","type":"address"}],"name":"tokenComprado","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"adr","type":"address"}],"name":"tokenBought","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"}];
var enderecoToken = "0x65ff0b637BCfD601C1f4C38DcBbCF0b5C657210F";
function getInstanceToken() {
    let PersonContract = web3.eth.contract(abiToken);
    let personInstance = PersonContract.at(enderecoToken);
    return personInstance;
}

var abiCrowd = [{"constant":true,"inputs":[],"name":"rate","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"rate_","type":"uint256"}],"name":"setRate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"weiRaised","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"wallet","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"OwnerCrowd","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_beneficiary","type":"address"}],"name":"buyTokens","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"token","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"rate","type":"uint256"},{"name":"wallet","type":"address"},{"name":"token","type":"address"}],"payable":true,"stateMutability":"payable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"purchaser","type":"address"},{"indexed":true,"name":"beneficiary","type":"address"},{"indexed":false,"name":"value","type":"uint256"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"TokensPurchased","type":"event"}];
var enderecoCrowd = "0xe96819dad6517aEa5a7Ca83e32793Cc673479843";
function getInstanceCrowd() {
    let PersonContractCrowd = web3.eth.contract(abiCrowd);
    let personInstanceCrowd = PersonContractCrowd.at(enderecoCrowd);
    return personInstanceCrowd;
}

function carregarToken() {
    let instance  = getInstanceToken();

    web3.eth.getAccounts(function (error, contaMetamask) {

        instance.balanceOf(contaMetamask, function(error, result) {

            instance.symbol(function(error, retornoSymbol) {
                
                instance.decimals(function (error, retornoDecimals){
                    $view = (result / Math.pow(10, retornoDecimals))
                    $("#quantidade").val($view + " " + retornoSymbol)
                });
            });
        });
    });

    instance.tokenPrice(function(error, result) {
        instance.decimals(function (error, retornoDecimals){
            $("#valorToken").val(result / Math.pow(10, retornoDecimals))
        });
    });

}

function transferirTokens() {
    let endereco = $("#transferirPara").val();
    
    
    let instance  = getInstanceToken();

    let quantidade = ($("#quantidadeTransferir").val()) * Math.pow(10, 18);

    instance.transfer.sendTransaction(endereco, quantidade, function(error, result){
        
        if (error) {
            alert("Ocorreu um erro " + error);
        } else {
            console.info(result);
        }
        
    });
}

function consultarTokens() {
    let endereco = $("#enderecoPessoa").val();
    
    let instance  = getInstanceToken();

    instance.balanceOf(endereco, function(error, result) {
        instance.decimals(function (error, retornoDecimals){
            $("#quantidadePessoa").val(result / Math.pow(10, retornoDecimals) + " OLE")
        });
        //$("#quantidadePessoa").val(result / Math.pow(10, instance.decimals) );
    });/*
    instance.tokenPrice(function(error, result) {
        $("quantidadeTransferir").val(result);
    });*/
}
/*
function comprarTokens() {
    let quantidadeComprar = $("#quantidadeComprar").val();
    let instance  = getInstanceToken();
    let valorToken = 1000000000000000;
    
        
    //let valorToken = $("#valorToken").val(getInstanceToken.valorToken);
    //valorToken = instance.tokenPrice;
    console.info(valorToken);
    
    var tx = {
        value: (quantidadeComprar * valorToken),
        //gas: "470000",
        data: "OleCoinPreIco"
    };

    instance.comprarTokens.sendTransaction(quantidadeComprar, tx, function(error, result){
        if (error) {
            alert("Ocorreu um erro " + error);
        } else {
            console.info(result);
        }
    });    
}
*/
function comprarTokens() {
    let addressAccount =$("#addressAccount").val()
    let quantidadeComprar = $("#quantidadeComprar").val();
    let instanceCrowd  = getInstanceCrowd();
    let valorToken = 1000000000000000;
        
    //let valorToken = $("#valorToken").val(getInstanceToken.valorToken);
    //valorToken = instance.tokenPrice;
    console.info(valorToken);
    
    var tx = {
        value: (quantidadeComprar * valorToken),
        //gas: "470000",
        data: "OleCoinPreIco"
    };

    instanceCrowd.buyTokens(addressAccount, tx, function(error, result){
        if (error){
            alert("Ocorreu erro " + error)
        }
        else{
            console.info(result)
        }
    })
}