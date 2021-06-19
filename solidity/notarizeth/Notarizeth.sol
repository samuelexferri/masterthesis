// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./AccessControl.sol";

contract NotarizETH is AccessControl {
    // Structured data that describes a file certificate
    struct Certificate {
        bool exist; 
        address author;
        uint80 timestamp;
        bytes32 filehash;
    }

    // Event that will be fired when a file is certified
    event FileCertified(address author, uint256 timestamp, bytes32 filehash);

    // Object that will store the file certificates by hash
    mapping(bytes32 => Certificate) records;
    
    // Constructor
    constructor() {
        // Who creates the contract is admin
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    // Function that allows users to verify if a file has been certified before
    function verifyFile(bytes32 filehash) public view returns (bool, address, uint80, bytes32) {
        Certificate memory record = records[filehash];

        if (record.exist == true) {
            return (
                true,
                record.author,
                record.timestamp,
                record.filehash
            );
        } else {
            return (
                false,
                address(0x0),
                uint80(0),
                bytes32(0)
            );
        }
    }

    // Function that allows users to certify a file
    function certifyFile(bytes32 filehash) public {
        // Control that the file hash not exist yet
        require(records[filehash].exist != true, "Certificate with given file hash already exists");

        records[filehash] = Certificate(true, msg.sender, uint80(block.timestamp), filehash);
        
        // Permissions to modify the file data to the actual sender
        grantRoleHash(filehash, msg.sender);

        emit FileCertified(msg.sender, uint80(block.timestamp), filehash);
    }

    // Function that reset a file certificate from records (Modifier onlyRole)
    function resetFile(bytes32 filehash) public onlyRole(filehash) {
        revokeRoleHash(filehash, records[filehash].author);

        delete records[filehash];
    }
    
    // Return true if the account belongs to the admin role
    function isAdmin(address account) public virtual view returns (bool) {
        return hasRole(DEFAULT_ADMIN_ROLE, account);
    }
    
    /*
    // Add an account to the admin role
    function addAdmin(address account) public virtual onlyRole(DEFAULT_ADMIN_ROLE) {
        grantRole(DEFAULT_ADMIN_ROLE, account);
    }

    // Remove oneself from the admin role
    function renounceAdmin() public virtual onlyRole(DEFAULT_ADMIN_ROLE) {
        renounceRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }
    */
    
    // Grant the permissions to modify the file data to the actual sender
    function grantRoleHash(bytes32 role, address account) private {
        require(account == _msgSender(), "AccessControl: can only grant file hash role for self");
        _grantRole(role, account);
    }
    
    // Revoke the permissions to modify the file data to the actual sender
    function revokeRoleHash(bytes32 role, address account) private {
        require(account == _msgSender(), "AccessControl: can only revoke file hash role for self");
         _revokeRole(role, account);
    }
    
    // 'Removes' the contract code from the blockchain and invalidates all signatures 
    function removeContract() public onlyRole(DEFAULT_ADMIN_ROLE) {
        selfdestruct(payable(msg.sender));
    }
}
