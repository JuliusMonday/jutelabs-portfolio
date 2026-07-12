import crypto from 'crypto';

// Generate a random 64-byte string and convert it to hexadecimal
const secret = crypto.randomBytes(64).toString('hex');

console.log('\n--- Your New JWT Secret ---');
console.log(secret);
console.log('---------------------------\n');
