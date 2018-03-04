web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
web3.eth.defaultAccount = web3.eth.accounts[0];

var defaultBlock = web3.eth.defaultBlock;
var newscontractContract = web3.eth.contract([
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "voters",
		"outputs": [
			{
				"name": "voterAddress",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getlength",
		"outputs": [
			{
				"name": "temp",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "titlesearch",
				"type": "bytes32"
			}
		],
		"name": "getVotes",
		"outputs": [
			{
				"name": "_posVote",
				"type": "uint256"
			},
			{
				"name": "_negVote",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "News_array",
		"outputs": [
			{
				"name": "title",
				"type": "bytes32"
			},
			{
				"name": "storedData",
				"type": "bytes32"
			},
			{
				"name": "authorName",
				"type": "bytes32"
			},
			{
				"name": "Tag",
				"type": "bytes32"
			},
			{
				"name": "negVote",
				"type": "uint256"
			},
			{
				"name": "posVote",
				"type": "uint256"
			},
			{
				"name": "fakenews",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "Getnews",
		"outputs": [
			{
				"name": "_title",
				"type": "bytes32[]"
			},
			{
				"name": "_authorName",
				"type": "bytes32[]"
			},
			{
				"name": "_data",
				"type": "bytes32[]"
			},
			{
				"name": "_tag",
				"type": "bytes32[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "titlesearch",
				"type": "bytes32"
			}
		],
		"name": "GetOnenews",
		"outputs": [
			{
				"name": "_title",
				"type": "bytes32"
			},
			{
				"name": "_authorName",
				"type": "bytes32"
			},
			{
				"name": "_data",
				"type": "bytes32"
			},
			{
				"name": "_tag",
				"type": "bytes32"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_title",
				"type": "bytes32"
			},
			{
				"name": "_storedData",
				"type": "bytes32"
			},
			{
				"name": "_authorName",
				"type": "bytes32"
			},
			{
				"name": "_Tag",
				"type": "bytes32"
			}
		],
		"name": "Addnews",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "titlesearch",
				"type": "bytes32"
			},
			{
				"name": "votetype",
				"type": "int256"
			}
		],
		"name": "vote",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	}
]);
    
var block = newscontractContract.at("0xca9c2d6243ad9793168d45418c4502168e400732");

//--------------------------------------------------------------------------------------------------

function addblock(_title, _storedData, _authorName,  _Tag){
	console.log("i am here");
	block.Addnews(web3.fromAscii(_title),web3.fromAscii(_authorName),web3.fromAscii(_storedData),web3.fromAscii(_Tag),{gas: 3000000})
}

function getNews(){
	block.Getnews(function(error,result){
		if(!error){
			$('#news').text("");
			var data = result;
			var i;
			for(i = 0;i<data[0].length;i++ ){
				console.log(web3.toAscii(data[0][i])+" "+web3.toAscii(data[1][i])+" "+web3.toAscii(data[2][i])+" "+web3.toAscii(data[3][i]));
				$('#news').text($('#news').val() + '>>>> News : ' + (i+1));
				$('#news').text($('#news').val() + "\n");
				for (var j = 0; j <4 ; j++) {
					
					$('#news').text($('#news').val() + ("     " + titles[j] + " " + web3.toAscii(data[j][i])));
					$('#news').text($('#news').val() + "\n");
				}

			}
			
		}
		else{
			console.log(error);
		}
	});
}
function getVotess(_title){
	var data = block.getVotes.call(web3.fromAscii(_title));

	console.log("pvote: "+data[0]);
	console.log("nvote: "+data[1]);

	
}

function setVote(_title, value){
	console.log("i am here V");
	block.vote(_title, value);
}

//----------------------------------

$(function() {

	$('#getNews').click(function(){

		$('#GetNewsScreen').show();
		$('#AddNewsScreen').hide();
		$('#VoteScreen').hide();

		$('#b1').show();
		$('#b2').hide();
		$('#b3').hide();
	});

	$('#addNews').click(function(){

		$('#GetNewsScreen').hide();
		$('#AddNewsScreen').show();
		$('#VoteScreen').hide();

		$('#b1').hide();
		$('#b2').show();
		$('#b3').hide();
	});

	$('#voteNews').click(function(){

		$('#GetNewsScreen').hide();
		$('#AddNewsScreen').hide();
		$('#VoteScreen').show();

		$('#b1').hide();
		$('#b2').hide();
		$('#b3').show();
	});

});

var NewsTitle;
var AuthorName;
var NewsDescription;
var NewsTags;

$(function() {


	$('#submitButton').click(function(){

		NewsTitle = $('#newsTitle').val();
		AuthorName = $('#authorName').val();
		NewsDescription =  $('#newsDescription').val();
		NewsTags = $('#newsTags').val();

		addblock(NewsTitle, NewsDescription, AuthorName,  NewsTags);

		console.log(NewsTitle);
		console.log(AuthorName);
		console.log(NewsDescription);
		console.log(NewsTags);

		$('#newsTitle').val("");
		$('#authorName').val("");
		$('#newsDescription').val("");
		$('#newsTags').val("");

		getNews();
	});

});


//-----------------------------------------------------------------------------------------------------

//var newsData = [[1,2,3,4],[1,2,3,4]];
var titles = ["News Title :", "Author Name :", "News Description :", "News Tags :"];

/*$(function() {

	for (var i = 0; i < newsData.length; i++) {
		
		if(i != 0){

			$('#news').text($('#news').val() + "\n\n\n\n");

		}

		$('#news').text($('#news').val() + '>>>> News : ' + (i+1));
		$('#news').text($('#news').val() + "\n\n");

		for (var j = 0; j < 4; j++) {
			
			$('#news').text($('#news').val() + ("     " + titles[j] + " " + newsData[i][j]));
			$('#news').text($('#news').val() + "\n");
		}
	}

});*/


/********************************************************************************************************/

var ArticleName;
var Vote;

 $(function() {

 	$('#voteSubmit').click(function(){
 		console.log("i am here");
 		ArticleName = $('#articleName').val();
 		console.log(ArticleName + ' ' + Vote);
 		setVote(web3.fromAscii(ArticleName), Vote);

 		$('#articleName').val("");
		$('#c1').prop('checked', false);
		$('#c2').prop('checked', false);
 	});

 	$('#c1').change(function(){

 		Vote = 0;

 	});

 	$('#c2').change(function(){

 		Vote = 1;
 	});



 });