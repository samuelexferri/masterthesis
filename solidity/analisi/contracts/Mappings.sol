// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract Mappings1 {
    mapping(uint256 => uint256) itemsA;
    mapping(uint256 => uint256) itemsB;    
    
    function map1() public {
      itemsA[0xAAAA] = 0xAAAA;
      itemsB[0xBBBB] = 0xBBBB;
    }
}

contract Mappings2 {
    mapping(uint256 => uint256) itemsC;
    
    uint256 i = 0xCCCC;    
    
    function map2() public {
      itemsC[i] = 0x7777;
    }
}

contract MappingStruct {
    mapping(uint256 => Tuple) tuples;    
    
    struct Tuple {
      uint256 a;
      uint256 b;
      uint256 c;
    }  
    
    function mapStruct() public {
      tuples[0x1].a = 0x1A;
      tuples[0x1].b = 0x1B;
      tuples[0x1].c = 0x1C;
    }
}

contract MappingNotPack {
    mapping(uint256 => uint8) items;    
    
    function mapNotPack() public {
      items[0xA] = 0xAA;
      items[0xB] = 0xBB;
    }
}