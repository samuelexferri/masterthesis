// Declare the solidity compiler version
pragma solidity ^0.5.12;

// Declare the contract
contract Authenticity {
    // Declare the event that will be fired when a file is certified
    event FileCertified(
        address author,
        string fileHash,
        uint256 timestamp,
        uint256 fileSize,
        string fileExtension
    );

    // Declare a structured data that describes a certified file
    struct FileCertificate {
        address author;
        string fileHash;
        uint256 timestamp;
        uint256 fileSize;
        string fileExtension;
    }

    // Declare an object that will store the file certificates by hash
    mapping(string => FileCertificate) fileCertificatesMap;

    // Function that allows users to certify a file
    function certifyFile(
        uint256 fileSize,
        string memory fileHash,
        string memory fileExtension
    ) public payable {
        FileCertificate memory newFileCertificate =
            FileCertificate(
                msg.sender,
                fileHash,
                block.timestamp,
                fileSize,
                fileExtension
            );
        fileCertificatesMap[fileHash] = newFileCertificate;
        emit FileCertified(
            msg.sender,
            fileHash,
            block.timestamp,
            fileSize,
            fileExtension
        );
    }

    // Function that allows users to verify if a file has been certified before
    function verifyFile(string memory fileHash)
        public
        view
        returns (
            address,
            string memory,
            uint256,
            uint256,
            string memory
        )
    {
        return (
            fileCertificatesMap[fileHash].author,
            fileCertificatesMap[fileHash].fileHash,
            fileCertificatesMap[fileHash].timestamp,
            fileCertificatesMap[fileHash].fileSize,
            fileCertificatesMap[fileHash].fileExtension
        );
    }
}
