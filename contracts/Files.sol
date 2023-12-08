//SPDX-License-Identifier: UNLICENCED

pragma solidity 0.5.16;

contract Files {

    address owner;
    address recipient;

    struct File {
        uint id;
        string name;
        string contents;
        address tempOwner;
        address trueOwner;
        uint lendKey;
        uint tradeKey;
        uint delKey;
    }

    mapping(uint => File) public files;

    uint lk = 1;
    uint tk = 2;
    uint dk = 3;

    uint public id = 0;

    event Viewed(address viewer);

    modifier onlyTempOwner (uint an_id) {
        require(msg.sender == files[an_id].tempOwner);
        _;
    }

    modifier onlyTrueOwner (uint an_id) {
        require(msg.sender == files[an_id].trueOwner);
        _;
    }

    constructor () public {
        owner = msg.sender;
        id++;
        files[id] = File(id, "Starter File", "Classified information.", owner, owner, lk, tk, dk);
        lk++;
        tk++;
        dk++;

        id++;
        files[id] = File(id, "File 2", "Lorem ipsum.", owner, owner, lk, tk, dk);
        lk++;
        tk++;
        dk++;
    }

    function viewFile (uint an_id) public returns (string memory some_contents) {
        require(msg.sender == files[an_id].tempOwner || msg.sender == files[an_id].trueOwner);
        emit Viewed(msg.sender);
        return files[an_id].contents;
    }

    function addFile (string memory _name, string memory _contents) public {
        id++;
        files[id] = File(id, _name, _contents, msg.sender, msg.sender, lk, tk, dk);
        lk++;
        tk++;
        dk++;
    }

    function borrowFile (uint an_id, uint a_lendKey) public {
        require(a_lendKey == files[an_id].lendKey);
        files[an_id].tempOwner = msg.sender;
    }

    function takeFile (uint an_id, uint a_tradeKey) public {
        require(a_tradeKey == files[an_id].tradeKey);
        files[an_id].tempOwner = msg.sender;
        files[an_id].trueOwner = msg.sender;
    }

    function lendFile (uint an_id, uint a_lendKey, address a_recipient) public onlyTempOwner (an_id) {
        require(a_lendKey == files[an_id].lendKey);
        files[an_id].tempOwner = a_recipient;
    }

    function giveFile (uint an_id, uint a_tradeKey, address a_recipient) public onlyTrueOwner (an_id) {
        require(a_tradeKey == files[an_id].tradeKey);
        files[an_id].tempOwner = a_recipient;
        files[an_id].trueOwner = a_recipient;
    }

    function deleteFile (uint an_id, uint a_delKey) public onlyTrueOwner (an_id) {
        require(a_delKey == files[an_id].delKey);
        delete files[an_id];
    }

}
