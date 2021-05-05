// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./AccessControl.sol";

contract NotarizETH is AccessControl {
    // Structured data that describes a certified file
    struct Certificate {
        // TODO: Altri booleani da compattare (usare anche un solo byte)
        bool exist; 
        address author;
        bytes32 file_hash; // TODO: Occupa 32 byte, meglio tipo uint256/bytes32/string...?
        uint256 timestamp;
        // uint256 expiration_date; // TODO: Scadenza e controlli sulla scadenza da fare guardando il blocco attuale (Oracolo?)
        // address token_tracker; // TODO: Token address tracker (ERC 721)
    }

    // Event that will be fired when a file is certified
    event FileCertified(address author, bytes32 file_hash, uint256 timestamp);

    // Object that will store the file certificates by hash
    mapping(bytes32 => Certificate) records;
    
    // Constructor
    constructor () {
        // Who creates the contract is admin
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    // Function that allows users to certify a file
    function certifyFile(bytes32 file_hash) public { // TODO: Payable richiede una tassa?
        Certificate memory new_certificate = Certificate(true, msg.sender, file_hash, block.timestamp);

        require(records[file_hash].exist != true, "Certificate with given hash already exists"); // TODO: Verificare che effettivamente si esca e non si prosegua

        // TODO: Controlli che non esista già (Collisioni)
        records[file_hash] = new_certificate;
        
        // Permissions to modify the file to the actual sender
        grantRoleHash(file_hash, msg.sender);

        emit FileCertified(msg.sender, file_hash, block.timestamp);
    }

    // Function that allows users to verify if a file has been certified before
    function verifyFile(bytes32 file_hash) public view returns (bool, address, bytes32, uint256) {
        Certificate memory record = records[file_hash]; // TODO: Copiarlo in memoria solo una volta e leggerlo da li?

        if (record.exist == true) {
            // require(record.expiration_date > block.timestamp, "Expired certificate");
            return (
                true,
                record.author,
                record.file_hash,
                record.timestamp
            );
        }

        return (
            false,
            address(0x0), // TODO: Return vuoti
            bytes32(0),
            uint256(0)
        );
    }

    // Function that reset a file certificate from records (Modifier onlyOwner)
    function resetFile(bytes32 file_hash) public onlyRole(file_hash) {
        revokeRoleHash(file_hash, records[file_hash].author);

        delete records[file_hash];
    }
    
    // Return true if the account belongs to the admin role
    function isAdmin(address account) public virtual view returns (bool) {
        return hasRole(DEFAULT_ADMIN_ROLE, account);
    }

    // Add an account to the admin role
    /*
    function addAdmin(address account) public virtual onlyRole(DEFAULT_ADMIN_ROLE) {
        grantRole(DEFAULT_ADMIN_ROLE, account);
    }
    */

    // Remove oneself from the admin role
    /*
    function renounceAdmin() public virtual onlyRole(DEFAULT_ADMIN_ROLE) {
        renounceRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }
    */
    
    // The requirement that the caller must have ``role``'s admin role has been deleted 
    function grantRoleHash(bytes32 role, address account) private {
        require(account == _msgSender(), "AccessControl: can only grant hash role for self");
        _grantRole(role, account);
    }
    
    // The requirement that the caller must have ``role``'s admin role has been deleted 
    function revokeRoleHash(bytes32 role, address account) private {
        require(account == _msgSender(), "AccessControl: can only revoke hash role for self");
         _revokeRole(role, account);
    }
    
    // Removes the entire contract from the blockchain and invalidates all signatures
    function removeContract() public onlyRole(DEFAULT_ADMIN_ROLE) {
        selfdestruct(payable(msg.sender)); // TODO: Gestire meglio
    }
    
    // DELETE
    // Helper function to get a document's sha256
    function calculateHash(string memory document) private pure returns (bytes32) {
        // SHA256 o SHA3 (Farlo offline)
        bytes32 hashvalue = keccak256(abi.encodePacked(document));

        require(hashvalue != keccak256(abi.encodePacked("")));

        return hashvalue;

        // return sha256(document);
    }

    // DELETE
    // Helper function string to bytes32
    function stringToBytes32(string memory source)
        private
        pure
        returns (bytes32 result)
    {
        bytes memory tempEmptyStringTest = bytes(source);
        if (tempEmptyStringTest.length == 0) {
            return 0x0;
        }
        assembly {
            result := mload(add(source, 32))
        }
    }
}
