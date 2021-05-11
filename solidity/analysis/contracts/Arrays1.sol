// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract Arrays1 {
    bytes16[300] b_one;
    
    bytes b_two;
    string s_one;
    
    uint64[5] numbers_one;    
    uint64[4] numbers_two;   
    
    uint64[] numbers_three;    
    
    // Execution cost: 109859 gas
    function fixedByteArray() public returns (uint) {
        b_one[0] = bytes16('0x1111');
        b_one[1] = bytes16('0x1111');
        b_one[2] = bytes16('0x2222');
        b_one[3] = bytes16('0x2222');
        b_one[4] = bytes16('0x3333');
        b_one[200] = bytes16('0x4444');
        
        return b_one.length;
    }
    
    // Execution cost: 31 - 75209 gas / 32 - 96579 gas 
    function dynamicBytesArray() public returns (uint) {
        for (int i = 0; i < 31; i++) { // Cambiare 31/32
            b_two.push('a');
        }

        // b_two = '0xaaaa'; // Alternativa
        return b_two.length;
    }
    
    // Execution cost: 43845 gas
    function dynamicStringArray() public {
        s_one = 'Hello World!'; // UTF-8 Encoding
    
        // s_one.push('Test'); // Non si può usare il .push
        
        // return s_one.length; // Non ha salvato la sua length
    }
     
    // Execution cost: 87683 gas
    function fixedArray() public returns (uint) {
        numbers_one[0] = 0x1111111111111111;
        numbers_one[2] = 0x2222222222222222;
        numbers_one[4] = 0x5555555555555555;
        
        numbers_two[0] = 0x1111111111111111;
        
        return numbers_one.length;
    }
    
    // Execution cost: 90313 gas
    function dynamicArray() public returns (uint) {
        // numbers_three[0] = 0x9999999999999999; // Errore, prima deve esserci un dato a quell'indice
        
        numbers_three.push(0x1111111111111111);
        numbers_three.push(0x2222222222222222);
        numbers_three.push(0x3333333333333333);
        numbers_three.push(0x4444444444444444);
        numbers_three.push(0x5555555555555555);
        
        numbers_three[0] = 0x9999999999999999; // Ora è possibile
        
        // numbers_three.length = 10; // A partire dalla versione 0.6.0 di Solidity, la length è read-only anche per gli arrays dinamici nello storage
        
        return numbers_three.length;
    }
    
    // Execution cost: 21557 gas
    function dynamicMemoryArray() public returns (uint) {
        uint32[] memory a_mem = new uint32[](5); // Operatore new
        
        // a_mem.push(1); // Non è possibile per gli array dinamici in memoria, bisogna usare l'indice
        
        a_mem[0] = 1111;
        a_mem[4] = 5555;
        // a_mem[100] = 1; // Errore "Out of Bound"
        
        return a_mem.length;
    }
}