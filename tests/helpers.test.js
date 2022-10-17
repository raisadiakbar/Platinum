const fs = require('fs');
const jwt = require('../helpers/jwt');
const bcrypt = require('../helpers/bcrypt');
const cloudinary = require('../helpers/cloudinary');

describe('bcrypt.js', () => {
  test('Bcrypt, invalid password as param. Bcrypt should return false.', () => {
    expect(
      bcrypt.validateText(
        'Invalid-password-for-negative-case',
        '$2a$08$0qbRV4.I0B4FtgPCddWNuuGJOzgrXocwUqhkbfNj2gDF88rhr/Xom'
      )
    ).toBe(false);
  })
  
  test('Bcrypt, valid password as param. Bcrypt should return true.', () => {
    expect(
      bcrypt.validateText(
        'Password',
        '$2a$08$0qbRV4.I0B4FtgPCddWNuuGJOzgrXocwUqhkbfNj2gDF88rhr/Xom'
      )
    ).toBe(true);
  })

  test('Bcrypt should return hashed text', () => {
    const hashedText = bcrypt.hash('Password');

    expect(hashedText).toBeTruthy();
  })
})

describe('jwt.js', () => {
  test('Decode using invalid secret-key. Should throw Error.', () => {
    expect(() => jwt.decode('dsadabwhebfhb')).toThrow();
  })
})

describe('cloudinary.js', () => {
  test("Upload valid file. Shouldn't throw error.", async () => {
    const imagePath = './files/66052592-ff76-4c50-81dc-606fe08c2a3c.png';
    const clonePath = './files/clone.png';

    fs.copyFileSync(imagePath, clonePath);

    const res = await cloudinary.upload(imagePath);

    expect(typeof res.public_id).toBe('string');
    expect(typeof res.url).toBe('string');
    expect(typeof res.secure_url).toBe('string');

    //  file should be deleted (exist === false) after upload success.
    expect(fs.existsSync(imagePath)).toBe(false);

    //  check file in cloudinary
    fs.renameSync(clonePath, imagePath);
  })
})
