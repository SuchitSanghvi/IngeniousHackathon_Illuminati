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
    
    string private storedData;
    string private authorName;
    string private Tag;
    uint private negativeVote;
    struct Voter
    {
        address voterAddress;
        bool voted;
    }
    
    
    mapping(address => Voter) public voters;
    
    
    function NewsContract(string _storedData,string _authorName,string _Tag) public
    {
        
        storedData = _storedData;
        authorName = _authorName;
        Tag = _Tag;
        negativeVote = 0;
        
    }
    
    function vote() public 
    {
        Voter storage sender = voters[msg.sender];
        require(!sender.voted);
        sender.voted = true;
        negativeVote++;
        if (negativeVote >= 2)
        {
            kill();
        }
    }
    
    function getVote() public view
        returns ( uint negativeVote_)
    {
        negativeVote_ = negativeVote;
    }
    
    function returnNews() public view
        returns (string storedData_, string authorName_, string Tag_)
        {
            storedData_ = storedData;
            authorName_ = authorName;
            Tag_ = Tag;
        }
        
}



