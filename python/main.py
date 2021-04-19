import binascii

from _pysha3 import keccak_256


def bytes32(i):
    return binascii.unhexlify('%064x' % i)


def keccak256(x):
    return keccak_256(x).hexdigest()

# Console
# from main import keccak256, bytes32
# keccak256(bytes32(1))
