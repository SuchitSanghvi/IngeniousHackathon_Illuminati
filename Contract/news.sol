pragma solidity ^0.4.0;

contract mortal
{
    address public owner;
    
    function mortal()
    {
        owner = msg.sender;
    }
    function kill()
    {
        suicide(owner);
    }
}

contract NewsContract is mortal
{
    string public storedData;
    string public authorName;
    string public Tag;
    
    struct Voters
    {
        address voterAddress;
        bool Voted;
    }
    
    mapping(address => Voter) public voters;
    
    
    function NewsContract(string _storedData,string _authorName,string _Tag) public
    {
        storedData = _storedData;
        authorName = _authorName;
        Tag = _Tag;
    }
    
    function returnNews() public view
        returns (string storedData_, string authorName_, string Tag_)
        {
            storedData_ = storedData;
            authorName_ = authorName;
            Tag_ = Tag;
        }
    
    
}



