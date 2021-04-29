// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0; // A partire dalla versione 0.8.0 di Solidity, ABI Coder v2 è di default e si può omettere
// pragma experimental ABIEncoderV2;

contract AssemblySlot {
    uint256 uintStorage = 1337;

    function getStorageByPointer() external view returns (uint256) {
        uint256 _foundStorage;

        assembly {
            // Usare '.slot' per accedere a ogni variabile del contratto
            _foundStorage := sload(uintStorage.slot)
        }

        return _foundStorage;
    }
    
    function setStorageByPointer(uint256 _newNumber) external {
        assembly {
            // Usare '.slot' per salvare nello storage nella posizione puntata dal puntatore
            sstore(uintStorage.slot, _newNumber)
            
            // Scrivere in una posizione arbitraria
            sstore(0xc0fefe, 0x42)
        }
    }
}