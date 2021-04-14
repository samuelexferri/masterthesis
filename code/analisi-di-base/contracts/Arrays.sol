// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Arrays {
    bytes16[300] b_one;
    bytes b_two;
    string s_one;
    
    uint64[5] numbers_one;    
    uint64[4] numbers_two;   
    
    uint64[] numbers_three;    
    
    // Execution cost: 83552 gas 
    // Compatta due bytes16 in un unico slot
    function fixedByteArray() public returns (uint) {
        b_one[0] = bytes16('0x1111');
        b_one[1] = bytes16('0x1111');
        b_one[2] = bytes16('0x2222');
        b_one[3] = bytes16('0x2222');
        b_one[4] = bytes16('0x3333');
        b_one[200] = bytes16('0x4444');
        
        return b_one.length;
    }
    
    // Execution cost: 31 - 158842 gas / 32 - 183394  gas 
    // Nel caso in cui i bytes siano minori o uguali a 31, la length è salvata nel byte inferiore (Big Endian) e nei restanti i dati
    // Nel caso in cui i bytes siano superiori a 31, il primo slot contiene solo la length
    // https://ropsten.etherscan.io/tx/0x655c9148844ace87c814372484b3141c267a5ebd0d5688dd82722561af50983c#statechange (31 - Unico slot)
    // https://ropsten.etherscan.io/tx/0xd0801c32f52b74185631403c5e6543e3867b70c42745a7d73525737baac57c6e#statechange (32 - Due slot)
    // TODO: Indagare sul costo di SSTORE e SLOAD
    function dynamicBytesArray() public returns (uint) {
        
        for (int i = 0; i < 32; i++) { // Cambiare 31/32
            b_two.push('a');
        }

        return b_two.length;
    }
    
    // Execution cost: 21459 gas
    // UTF-8 Encoding
    function dynamicStringArray() public {
        s_one = 'Hello World!';
    
        // s_one.push('Test'); // Non si può usare il .push
        
        // return s_one.length; // Non ha salvato la sua length
    }
     
    // Execution cost: 62743 gas
    // Non esiste lo slot per la length visto che è a dimensione fissa
    function fixedArray() public returns (uint) {
        numbers_one[0] = 0x1111111111111111;
        numbers_one[2] = 0x2222222222222222;
        numbers_one[4] = 0x5555555555555555;
        
        numbers_two[0] = 0x1111111111111111;
        
        return numbers_one.length;
    }
    
    // Execution cost: 99245 gas
    // Il primo slot contiene solamente la length
    function dynamicArray() public returns (uint) {
        // numbers_three[0] = 0x9999999999999999; // Errore, prima deve esserci un dato a quell'indice
        
        numbers_three.push(0x1111111111111111);
        numbers_three.push(0x2222222222222222);
        numbers_three.push(0x3333333333333333);
        numbers_three.push(0x4444444444444444);
        numbers_three.push(0x5555555555555555);
        
        numbers_three[0] = 0x9999999999999999;
        
        // numbers_three.length = 10; // A partire dalla versione 0.6.0 di Solidity, è read-only anche per gli arrays dinamici nello storage
        
        return numbers_three.length;
    }
    
    function dynamicMemoryArray() public returns (uint) {
        uint64[] memory a_mem = new uint64[](5); // Operatore new
        
        // a_mem.push(1); // Non è possibile per gli array dinamici in memoria, bisogna usare l'indice
        
        a_mem[0] = 1;
        a_mem[4] = 5;
        // a_mem[100] = 1; // Errore, Out of Bound
        
        return a_mem.length;
    }
}