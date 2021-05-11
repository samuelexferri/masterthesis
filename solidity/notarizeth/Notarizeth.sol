// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./AccessControl.sol";

contract NotarizETH is AccessControl {
    // Structured data that describes a file certificate
    struct Certificate {
        bool exist; 
        address author;
        bytes32 file_hash;
        uint256 timestamp;
    }

    // Event that will be fired when a file is certified
    event FileCertified(address author, bytes32 file_hash, uint256 timestamp);

    // Object that will store the file certificates by hash
    mapping(bytes32 => Certificate) records;
    
    // Constructor
    constructor () {
        // Who creates the contract is Admin
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    // Function that allows users to verify if a file has been certified before
    function verifyFile(bytes32 file_hash) public view returns (bool, address, bytes32, uint256) {
        Certificate memory record = records[file_hash];

        if (record.exist == true) {
            return (
                true,
                record.author,
                record.file_hash,
                record.timestamp
            );
        } else {
            return (
                false,
                address(0x0),
                bytes32(0),
                uint256(0)
            );
        }
    }

    // Function that allows users to certify a file
    function certifyFile(bytes32 file_hash) public {
        Certificate memory new_certificate = Certificate(true, msg.sender, file_hash, block.timestamp);

        // Control that the file hash not exist yet
        require(records[file_hash].exist != true, "Certificate with given hash already exists");

        records[file_hash] = new_certificate;
        
        // Permissions to modify the file data to the actual sender
        grantRoleHash(file_hash, msg.sender);

        emit FileCertified(msg.sender, file_hash, block.timestamp);
    }

    // Function that reset a file certificate from records (Modifier onlyRole)
    function resetFile(bytes32 file_hash) public onlyRole(file_hash) {
        revokeRoleHash(file_hash, records[file_hash].author);

        delete records[file_hash];
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
        require(account == _msgSender(), "AccessControl: can only grant hash role for self");
        _grantRole(role, account);
    }
    
    // Revoke the permissions to modify the file data to the actual sender
    function revokeRoleHash(bytes32 role, address account) private {
        require(account == _msgSender(), "AccessControl: can only revoke hash role for self");
         _revokeRole(role, account);
    }
    
    // Removes the entire contract from the blockchain and invalidates all signatures 
    function removeContract() public onlyRole(DEFAULT_ADMIN_ROLE) {
        selfdestruct(payable(msg.sender));
    }
}
