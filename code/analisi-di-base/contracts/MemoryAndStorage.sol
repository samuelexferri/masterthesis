// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract MemoryAndStorage {
    
    mapping(uint => Account) accounts;
    
    struct Account {
        uint id;
        uint balance;
    }
 
    function addAccount(uint id, uint balance) public {
        accounts[id] = Account(id, balance);   
    }

    function updateBalance(uint id, uint balance) public {
        Account storage account = accounts[id]; // Accede via reference
        //Account memory account = accounts[id]; // Crea una copia in memoria
        account.balance = balance;
    }
 
    function getBalance(uint id) public returns (uint) {
        return accounts[id].balance;
    } 
}
