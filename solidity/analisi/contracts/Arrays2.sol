// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0; // A partire dalla versione 0.8.0 di Solidity, ABI Coder v2 è di default e si può omettere
// pragma experimental ABIEncoderV2;

contract Arrays2 {

    uint[][3] fixedMultiArray;
    uint[2][] dynamicMultiArray;
    
    uint[] storageDynamicArray;

    function multidimensional() public {
        uint[4] memory memArray = [uint(6),7,8,9];
        
        fixedMultiArray[0] = memArray;
        fixedMultiArray[1] = new uint[](4);
        fixedMultiArray[2] = [1,2,3,4,5];
        
        dynamicMultiArray = new uint[2][](3); // Istanziare un array dinamico nello storage con new
        dynamicMultiArray[0] = [1,2];
        dynamicMultiArray[1] = [3,4];
        dynamicMultiArray[2] = [5,6];
        
        // dynamicArray[3] = [7,8]; // Error (How to extend?)
    }
    
    function conv() public {
        uint[3] memory memArray = [uint(6),7,8];
        uint[] storage localStorageDynamicArray;
        
        storageDynamicArray = new uint[](3); // Copia l'intero memory array nello storage
        storageDynamicArray = memArray; // Copia l'intero memory array nello storage

        // localStorageDynamicArray = new uint[](3); // Error: uint256[] memory is not convertibe to expected type uint256 storage pointer
        // localStorageDynamicArray = memArray; // Error: uint256[3] memory is not convertibe to expected type uint256 storage pointer
        localStorageDynamicArray = storageDynamicArray;
    }
    
    // PARAMS
    function params(uint[] memory paramsArray) public { // Anche con memory/calldata
        storageDynamicArray = paramsArray; // Copia l'intero memory/calldata array nello storage
    }
    
    function mutliParams1(uint[2][2] memory paramsArray) public { // Anche con memory/calldata
    }
    
    function mutliParams1(uint[][2] memory paramsArray) public { // Anche con memory/calldata (Illegale senza ABICoderV2)
    }
    
    function mutliParams1(uint[2][] memory paramsArray) public { // Anche con memory/calldata
    }
    
    function mutliParams1(uint[][] memory paramsArray) public { // Anche con memory/calldata (Illegale senza ABICoderV2)
    }
    
    // RETURNS BYTES/STRING ARRAY (Sono bidimensionali)
    function retBytes(bytes[] memory s) public returns (bytes[] memory) {
    }
    
    function retString(string[] memory s) public returns (string[] memory) {
    }
}