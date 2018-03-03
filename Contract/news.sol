pragma solidity ^0.4.0;

contract mortal
{
    
    address public owner;
    
    function mortal()
    {
        owner = msg.sender;
    }
    
    function kill () internal {
        selfdestruct(owner);
    }
    
}

contract NewsContract is mortal
{
    struct News
    {
        bytes32  title;
        bytes32  storedData;
        bytes32  authorName;
        bytes32  Tag;
        uint  negVote;
        uint posVote;
        bool fakenews;
    }
    
    bytes32 [] byteshashes;
   
    struct Voter
    {
        address voterAddress;
    }
    
    uint8 count;
    
    mapping(address => Voter) public voters;
    mapping(bytes32 => News) public News_array;
    
    function Addnews(bytes32 _title,bytes32 _storedData,bytes32 _authorName,bytes32 _Tag) public
    {
        News memory _news;
        _news.title = _title;
        _news.storedData = _storedData;
        _news.authorName = _authorName;
        _news.Tag =_Tag;
        _news.posVote = 1;
        _news.negVote = 0;
        
        News_array[sha256(_title)]= _news;
        count = count +1;
        
        byteshashes.push(sha256(_title));
    }
    
    function getlength() public constant returns (uint8 temp)
    {
        temp =count;
    }
    
    function Getnews() public constant 
        returns(bytes32 [] _title,bytes32 []  _authorName, bytes32 [] _data,bytes32 [] _tag){
        
        
        bytes32 [] memory atitle = new bytes32[](count);
        bytes32 [] memory aauthorName = new bytes32[](count);
        bytes32 [] memory adata = new bytes32[](count);
        bytes32 [] memory atag = new bytes32[](count);
        
       
        for(uint8 i =0;i<count;i++){
            News memory _news =   News_array[byteshashes[i]];
            atitle[i] = _news.title;
            aauthorName[i] = _news.authorName;
            adata[i] = _news.storedData;
            atag[i] = _news.Tag;
        }
         
        _title = atitle;
        _authorName = aauthorName;
        _data = adata;
        _tag = atag;
        
    }
    
    
    
    function GetOnenews(bytes32 titlesearch) public constant 
        returns(bytes32 _title,bytes32  _authorName, bytes32 _data,bytes32 _tag){
        
        
       
        for(uint8 i =0;i<count;i++){
            News memory _news =   News_array[byteshashes[i]];
            if(_news.title == titlesearch)
            {
                _title = _news.title;
                _tag = _news.Tag;
                _authorName = _news.authorName;
                _data = _news.storedData;
            }
                
        }
    }
    
    function getVotes(bytes32 titlesearch) public view
        returns(uint _posVote,uint _negVote)
    {
        for(uint i =0;i<count;i++)
        {
            News memory _news =   News_array[byteshashes[i]];
            if(_news.title == titlesearch)
            {
                _posVote = _news.posVote;
                _negVote = _news.negVote;
            }
                
        }
    }
    
    function vote(bytes32 titlesearch,int votetype) public 
    {
        Voter storage sender = voters[msg.sender];
        for(uint8 i =0;i<count;i++)
        {
            News memory _news =   News_array[byteshashes[i]];
            if(_news.title == titlesearch)
            {
                if(votetype == 0)
                {
                    _news.posVote = _news.posVote + 1;
                    News_array[byteshashes[i]] = _news;
                }
                else
                {
                    _news.negVote = _news.negVote + 1;
                    News_array[byteshashes[i]] = _news;
                    
                }
                
            }
                
        }
    }
    
    
        
}




