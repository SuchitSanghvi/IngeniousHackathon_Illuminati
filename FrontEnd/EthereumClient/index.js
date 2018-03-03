var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
web3.eth.defaultAccount = web3.eth.accounts[0];

//Contract Intance
var helloContract = web3.eth.contract([{"constant":false,"inputs":[],"name":"get","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"x","type":"bytes32"}],"name":"set","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]);

//Connection with contract
var hello = helloContract.at('0x248420767d98bf63ebbae2a4d8a430d86423740d');

//--------------------------------------------------------------------------------------------------

var NewsTitle;
var AuthorName;
var NewsDescription;
var NewsTags;

$(function() {


	$('#submitButton').click(function(){

		NewsTitle = $('#newsTitle').val();
		AuthorName = $('#authorName').val();
		NewsDescription =  $('#newsDescription').val()
		NewsTags = $('#newsTags').val();

		console.log(NewsTitle);
		console.log(AuthorName);
		console.log(NewsDescription);
		console.log(NewsTags);

		$('#newsTitle').val("");
		$('#authorName').val("");
		$('#newsDescription').val("");
		$('#newsTags').val("");

	});
	
});