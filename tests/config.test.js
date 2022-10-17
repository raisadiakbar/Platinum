const mail = require('../config/mail');
const ejs = require('ejs');

describe('mail.js', () => {
  test('Send valid email', async () => {
    const html = await ejs.renderFile('./templates/test.ejs');

    const info = await mail.sendMail({
      from: process.env.MAIL_EMAIL,
      to: 'ironman@yopmail.com',
      subject: 'Test Send Email CI/CD',
      html: html
    })

    expect(info.messageId).not.toBe(null);
    expect(typeof info.messageId).toBe('string');
  }, 15000)
})