// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract ArraysDiff {
	uint64[5] staticArr;
	uint64[] dynamicArr;

	// Execution cost elem#1: 43320 gas (Tx base 21000 + Slot di storage 20000)
	// Execution cost elem#2: 43335 gas (Delta: 15)
	// Execution cost elem#3: 43362 gas (Delta: 27)
	// Execution cost elem#4: 43392 gas (Delta: 30)
	// Execution cost elem#5: 65525 gas (Delta: 22133) (New slot)
	function fixedArray() public {
		staticArr[0] = 0x0000000000000000;
		staticArr[4] = 0x4444444444444444; // Non in ordine
		staticArr[1] = 0x1111111111111111;
		staticArr[2] = 0x2222222222222222;
		staticArr[3] = 0x3333333333333333;
	}

	// Execution cost elem#1: 65498 gas (Tx base 21000 + Slot di storage 20000 + Slot aggiuntivo per la length)
	// Execution cost elem#2: 66103 gas (Delta: 605)
	// Execution cost elem#3: 66667 gas (Delta: 564)
	// Execution cost elem#4: 67231 gas (Delta: 564)
	// Execution cost elem#5: 89645 gas (Delta: 22414) (New slot)
	function dynamicArray() public {
		dynamicArr.push(0x0000000000000000);
		dynamicArr.push(0x1111111111111111);
		dynamicArr.push(0x2222222222222222);
		dynamicArr.push(0x3333333333333333);
		dynamicArr.push(0x4444444444444444);
	}
}
