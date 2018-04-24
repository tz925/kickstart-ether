pragma solidity ^0.4.17;

contract CampaignFactory {
    address[] public deployedCampaigns;

    function createCampaign(uint minimum, string title, string detail) public {
        address newCampaign = new Campaign(minimum, msg.sender, title, detail);
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns (address[]) {
        return deployedCampaigns;
    }

}

contract Campaign {
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvers;
    }

    Request[] public requests;
    address public manager;
    uint public minimumContribution;
    mapping(address => uint) public backers;
    uint public backersCount;
    uint public total;
    string public title;
    string public detail;

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    function Campaign(uint minimum, address creator, string campaignTitle, string campaignDetail) public {
        manager = creator;
        minimumContribution = minimum;
        title = campaignTitle;
        detail = campaignDetail;
    }

    function contribute() public payable {
        require(msg.value >= minimumContribution);
        backers[msg.sender] = msg.value;
        backersCount++;
        total += msg.value;
    }

    function createRequest(string description, uint value, address recipient) public restricted {
        Request memory newRequest = Request({
            description : description,
            value: value,
            recipient: recipient,
            complete: false,
            approvalCount: 0
        });
        requests.push(newRequest);
    }

    function approveRequest(uint index) public {
        Request storage req = requests[index];

        require(backers[msg.sender] > 0);
        require(!req.approvers[msg.sender]);

        req.approvers[msg.sender] = true;
        req.approvalCount += backers[msg.sender];
    }

    function finalizeRequest(uint index) public restricted {
        Request storage req = requests[index];
        require(!req.complete);
        require(req.approvalCount > (total / 2));

        req.recipient.transfer(req.value);
        req.complete = true;
    }

    function getSummary() public view returns (uint, uint, uint, uint, address, string, string) {
        return (
            minimumContribution,
            address(this).balance,
            requests.length,
            backersCount,
            manager,
            title,
            detail
        );
    }

    function getRequestsCount() public view returns (uint) {
        return requests.length;
    }

    function getTitle() public view returns (string) {
        return title;
    }
}
