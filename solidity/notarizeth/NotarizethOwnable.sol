// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./Ownable.sol"; // TODO: Owner non unico, gli utenti hanno controlli sui propri certificati

contract NotarizethOwnable is Ownable {
    // Structured data that describes a certified file
    struct Certificate {
        bool exist; // TODO: Compattare nello stesso slot di author (Usare anche un singolo byte)
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

    // Function that allows users to certify a file
    function certifyFile(bytes32 file_hash) public payable { // TODO: Payable richiede un costo?
        Certificate memory new_certificate = Certificate(true, msg.sender, file_hash, block.timestamp);

        require(records[file_hash].exist != true, "Certificate with given hash already exists");

        // TODO: Controlli che non esista già (Collisioni)
        records[file_hash] = new_certificate;

        emit FileCertified(msg.sender, file_hash, block.timestamp);
    }

    // Function that allows users to verify if a file has been certified before
    function verifyFile(bytes32 file_hash)
        public
        view
        returns (
            bool,
            address,
            bytes32,
            uint256
        )
    {
        Certificate memory record = records[file_hash];

        if (record.exist == true) {
            // require(record.expiration_date > block.timestamp, "Expired certificate");
            return (
                true,
                records[file_hash].author, // TODO: Copiarlo in memoria solo una volta e leggerlo da li?
                records[file_hash].file_hash,
                records[file_hash].timestamp
            );
        }

        return (
            false,
            address(0x0), // TODO Return vuoti
            bytes32(0),
            uint256(0)
        );
    }

    // Function that return the contract's authority address
    function owningAuthority() public view returns (address) { // TODO: Simile a owner
        return owner();
    }

    // Function that reset a file certificate from records (Modifier onlyOwner)
    function resetFile(bytes32 file_hash) public onlyOwner {
        // TODO: Anche i proprietari singoli resettano i propri
        // TODO: Copiarlo in memoria solo una volta e leggerlo da li?
        
        delete records[file_hash];
    }

    // Helper function to get a document's sha256
    function calculateHash(string memory document) private pure returns (bytes32) {
        // SHA256 o SHA3 (Farlo offline)
        bytes32 hashvalue = keccak256(abi.encodePacked(document));

        require(hashvalue != keccak256(abi.encodePacked("")));

        return hashvalue;

        // return sha256(document);
    }

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

    // Removes the entire contract from the blockchain and invalidates all signatures
    function removeContract() public onlyOwner {
        selfdestruct(payable(msg.sender)); // TODO: Gestire meglio
    }
}
