const login = require('/login')

test('bejelentkezés sikeres-e', () => {
    expect(login.add('nev')).toBe(nev);
    expect(login.add('jelszo')).toBe(jelszo);
})