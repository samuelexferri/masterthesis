// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0; // A partire dalla versione 0.8.0 di Solidity, ABI Coder v2 è di default e si può omettere
// pragma experimental ABIEncoderV2;

contract Arrays2 {
    uint[][3] fixedMultiArray;
    uint[2][] dynamicMultiArray;
    
    uint[] storageDynamicArray; // Tipo uint[] storage ref (all'interno di una funzione)

    function multidimensional() public {
        uint[4] memory memArray = [uint(6),7,8,9];
        
        fixedMultiArray[0] = memArray;
        fixedMultiArray[1] = new uint[](4);
        fixedMultiArray[2] = [1,2,3,4,5];
        
        //dynamicMultiArray = memArray; // Errore
        dynamicMultiArray = new uint[2][](3); // Istanziare un array dinamico nello storage con new (Memoria allo storage)
        dynamicMultiArray[0] = [1,2];
        dynamicMultiArray[1] = [3,4];
        dynamicMultiArray[2] = [5,6];
        
        // dynamicMultiArray[3] = [7,8]; // Errore, non possibile da estendere
    }
    
    function conv() public {
        uint[3] memory memArray = [uint(6),7,8]; // Tipo uint[] memory 
        uint[] storage localStorageDynamicArray; // Tipo uint[] storage pointer
        
        storageDynamicArray = new uint[](3);
        storageDynamicArray = memArray;

        // localStorageDynamicArray = new uint[](3); // Errore
        // localStorageDynamicArray = memArray; // Errore
        localStorageDynamicArray = storageDynamicArray;
    }
    
    // PARAMS
    function params(uint[] memory paramsArray) public { // Anche con memory/calldata
        storageDynamicArray = paramsArray; // Copia l'intero memory/calldata array nello storage
    }
    
    function mutliParams(uint[2][2] memory paramsArray) public { // Anche con memory/calldata
    }
    
    function mutliParams(uint[][2] memory paramsArray) public { // Anche con memory/calldata (Illegale senza ABICoderV2)
    }
    
    function mutliParams(uint[2][] memory paramsArray) public { // Anche con memory/calldata
    }
    
    function mutliParams(uint[][] memory paramsArray) public { // Anche con memory/calldata (Illegale senza ABICoderV2)
    }
    
    // RETURNS BYTES/STRING ARRAY (Sono bidimensionali)
    function retBytes(bytes[] memory s) public returns (bytes[] memory) {
    }
    
    function retString(string[] memory s) public returns (string[] memory) {
    }
}