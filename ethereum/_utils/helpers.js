/*
    This helper script is used to generate the extraData field in genesis.json.
    I stored the validator public addresses manually in the array and then formatted them in the proper string structure.
    I used the logged output of this script in the genesis.json file.

    To run:
        - cd ethereum/_utils
        - node helpers.js
*/

const signers = [
    'd37274fefd88e7a3d0637a5cb9c57823f7bb39fb',
    '6aafac352e6db65fdf0008a4a5423a13b89c3b55',
    'a3C883ff4b8e98c50794c68facC36184ac45b3cE'
];

(function generateExtraDataField() {
    const extraData =
        '0x' + '00'.repeat(32)                  // Vanity
        + signers.join('')                      // Signer addresses
        + '00'.repeat(65);                      // Seal
    console.log(extraData);                     // Used in genesis.json
})()