// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract MemoryStorage {
	mapping(uint256 => Account) accounts;

	struct Account {
		uint256 id;
		uint256 balance;
	}

	function addAccount(uint256 id, uint256 balance) public {
		accounts[id] = Account(id, balance);
	}

	function updateBalance(uint256 id, uint256 balance) public {
		Account storage account = accounts[id]; // Accede via reference
		//Account memory account = accounts[id]; // Crea una copia in memoria
		account.balance = balance;
	}

	function getBalance(uint256 id) public view returns (uint256) {
		return accounts[id].balance;
	}
}
