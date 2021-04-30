// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0; // A partire dalla versione 0.8.0 di Solidity, ABI Coder v2 è di default e si può omettere
// pragma experimental ABIEncoderV2;

library AssemblyVectorSum {
    // Funzione meno efficiente perchè l'ottimizzatore fallisce a rimuovere i bounds checks sull'accesso all'array
    function sumSolidity(uint[] memory _data) public pure returns (uint sum) {
        for (uint i = 0; i < _data.length; ++i)
            sum += _data[i];
    }

    // Si è certi che si rimanga nei bounds dell'array, quindi si possono evitare i check
    // Il valore 0x20 deve essere aggiunto all'array perchè il primo slot contiene la length
    function sumAsm(uint[] memory _data) public pure returns (uint sum) {
        for (uint i = 0; i < _data.length; ++i) {
            assembly {
                sum := add(sum, mload(add(add(_data, 0x20), mul(i, 0x20))))
            }
        }
    }

    // Tutto il codice scrito in Inline Assembly
    function sumPureAsm(uint[] memory _data) public pure returns (uint sum) {
        assembly {
            let len := mload(_data)
            
            let data := add(_data, 0x20)

            // Iterare fino a che non si incontra il bound finale
            for { let end := add(data, mul(len, 0x20)) } lt(data, end) { data := add(data, 0x20) } {
                sum := add(sum, mload(data))
            }
        }
    }
}