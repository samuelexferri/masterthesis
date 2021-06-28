// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract AssemblyScratchSpace {
	function getStorageValue(uint256 key, uint256 pslot) public returns (uint256 result) {
		assembly {
			// Salvare la key nello scratch space
			mstore(0, key)
			// Salvare il pslot nello scratch space dopo la key
			mstore(32, pslot)
			// Creare l'hash dei due valori precedenti
			let hash := keccak256(0, 64)

			// Salvare un value all'indirzzo hash del mapping
			sstore(hash, 3)
			// Caricare un mapping value usando l'hash calcolato
			result := sload(hash)
		}
	}
}
