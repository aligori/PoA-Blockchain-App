// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/* This smart contract manages the proposals and votings of the board members. */
contract ProposalContract {
    enum Status { Pending, NotApproved, Approved }

    enum Vote { None, Yes, No }

    struct Proposal {
        string title;
        string description;
        address author;
        uint256 proposalDate;
        uint256 deadline;
        Status status;
    }

    struct Votes {
        uint256 yesCount;
        uint256 noCount;                 
        mapping(address => Vote) votes; // This mapping keeps track of how each account (voter) has voted on that specific proposal.
    }

    // This mapping associates each proposal ID with its corresponding Votes struct.
    mapping(uint256 => Votes) private votings;

    // Array of proposal structs
    Proposal[] private proposals;
    uint256 private proposalCount;

    event ProposalCreated(uint256 indexed proposalId, string title, address author, uint256 deadline);
    event VoteCast(uint256 indexed proposalId, address voter, Vote vote, uint256 yesCount, uint256 noCount);
    event ProposalFinalized(uint256 indexed proposalId, Status status);

    constructor() {
        /* For testing purposes, the smart contract seeds 3 past proposals into the array of proposals */
        Proposal memory proposal1 = Proposal({
            title: "Seeded Proposal 1",
            description: "This is the first seeded proposal.",
            author: address(0xd37274fefd88E7A3D0637A5cb9C57823f7bB39fb),
            proposalDate: block.timestamp - 7 days,
            deadline: block.timestamp - 1 days,
            status: Status.Pending
        });
        proposals.push(proposal1);
        proposalCount++;

        // Cast some votes for proposal 1
        votings[0].yesCount = 1;
        votings[0].noCount = 1;
        votings[0].votes[0xa3C883ff4b8e98c50794c68facC36184ac45b3cE] = Vote.Yes;
        votings[0].votes[0x6AaFAC352e6dB65FDF0008a4a5423A13B89c3B55] = Vote.No;

        // Create test proposal 2
        Proposal memory proposal2 = Proposal({
            title: "Seeded Proposal 2",
            description: "This is the second seeded proposal.",
            author: address(0xa3C883ff4b8e98c50794c68facC36184ac45b3cE),
            proposalDate: block.timestamp - 7 days,
            deadline: block.timestamp - 1 days,
            status: Status.Pending
        });
        proposals.push(proposal2);
        proposalCount++;

        // Cast some votes for proposal 2
        votings[1].yesCount = 2;
        votings[1].noCount = 0;
        votings[1].votes[address(0xa3C883ff4b8e98c50794c68facC36184ac45b3cE)] = Vote.Yes;
        votings[1].votes[address(0x6AaFAC352e6dB65FDF0008a4a5423A13B89c3B55)] = Vote.Yes;

        // Create test proposal 3
        Proposal memory proposal3 = Proposal({
            title: "Seeded Proposal 3",
            description: "This is the third seeded proposal.",
            author: address(0xa3C883ff4b8e98c50794c68facC36184ac45b3cE),
            proposalDate: block.timestamp - 7 days,
            deadline: block.timestamp - 1 days,
            status: Status.Pending
        });
        proposals.push(proposal3);
        proposalCount++;

        // Cast some votes for proposal 3
        votings[2].yesCount = 0;
        votings[2].noCount = 2;
        votings[2].votes[address(0xa3C883ff4b8e98c50794c68facC36184ac45b3cE)] = Vote.No;
        votings[2].votes[address(0x6AaFAC352e6dB65FDF0008a4a5423A13B89c3B55)] = Vote.No;
    }

    // Function to submit a new proposal
    function submitProposal(
        string memory _title,
        string memory _description,
        uint256 _deadline
    ) public {
        require(_deadline > block.timestamp, "Deadline must be in the future");

        Proposal memory newProposal = Proposal({
            title: _title,
            description: _description,
            author: msg.sender,
            proposalDate: block.timestamp,
            deadline: _deadline,
            status: Status.Pending
        });

        proposals.push(newProposal);
        emit ProposalCreated(proposalCount, _title, msg.sender, _deadline);
        proposalCount++;
    }

    // Function to get a specific proposal
    function getProposal(uint256 _proposalId) public view returns (Proposal memory) {
        // 1. Check if proposal exists
        require(_proposalId < proposalCount, "Proposal does not exist");
        return proposals[_proposalId];
    }

    // Function to get all proposals
    function getAllProposals() public view returns (Proposal[] memory) {
        return proposals;
    }

    // Function to cast a new vote on a proposal
    function vote(uint256 _proposalId, Vote _vote) public {
        // 1. Check if the vote submitted is a valid one.
        require(_vote == Vote.Yes || _vote == Vote.No, "Invalid vote");

        // 2. Getting the specific proposal.
        require(_proposalId < proposalCount, "Proposal does not exist");
        Proposal storage proposal = proposals[_proposalId];

        // 3. Checking if the status is still pending.
        require(proposal.status == Status.Pending, "Proposal is not pending");

        // 4. Checking if the deadline has not passed yet.
        require(block.timestamp <= proposal.deadline, "Deadline has passed. Voting is closed!");

        // 5. Checking if the voter has already voted.
        Votes storage voting = votings[_proposalId];
        require(voting.votes[msg.sender] == Vote.None, "Already voted");

        // 6. Storing the new vote
        voting.votes[msg.sender] = _vote;
        
        if (_vote == Vote.Yes) {
            voting.yesCount++;
        } else {
            voting.noCount++;
        }

        emit VoteCast(_proposalId, msg.sender, _vote, voting.yesCount, voting.noCount);
    }

    // Function to check if the board member has already voted on a specific proposal
    function hasVoted(uint256 _proposalId) public view returns (bool) {
        require(_proposalId < proposalCount, "Proposal does not exist");

        Votes storage voting = votings[_proposalId];
        return voting.votes[msg.sender] != Vote.None;
    }

    // Function to get the vote counts for a specific proposal
    function getProposalVotes(uint256 _proposalId) public view returns (uint256 yesCount, uint256 noCount) {
        require(_proposalId < proposalCount, "Proposal does not exist");

        Votes storage voting = votings[_proposalId];
        return (voting.yesCount, voting.noCount);
    }

    // Function to finalize a proposal
    function finalizeProposal(uint256 _proposalId) public {
        // 1. Checking if proposal exists
        require(_proposalId < proposalCount, "Proposal does not exist");
        Proposal storage proposal = proposals[_proposalId];

        // 2. Allowing only the author of the proposal to finalize it.
        require(proposal.author == msg.sender, "Only the author can finalize the proposal");

        // 3. Cannot finalize if deadline has not passed.
        require(block.timestamp >= proposal.deadline, "Voting period not yet ended");

        // 4. Cannot finalize an already finalized proposal.
        require(proposal.status == Status.Pending, "Proposal already finalized");

        Votes storage voting = votings[_proposalId];

        // 5. Vote tallying
        if (voting.yesCount > voting.noCount) {
            proposal.status = Status.Approved;
        } else {
            proposal.status = Status.NotApproved;
        }

        emit ProposalFinalized(_proposalId, proposal.status);
    }
}