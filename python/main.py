import binascii

import sha3  # Convert a number to 32 bytes array


def bytes32(i):
    return binascii.unhexlify('%064x' % i)


def keccak256(x):
    return sha3.keccak_256(str(x).encode('utf-8')).hexdigest()

# Console
# from main import keccak256, bytes32
