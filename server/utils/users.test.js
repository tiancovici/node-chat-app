const expect = require('expect');
const {Users} = require('./users');


describe('Users', () => {
  let users;
  beforeEach(()=> {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Mike',
      room: 'Node Course'
    },{
      id: '2',
      name: 'Jen',
      room: 'React Course'
    },{
      id: '3',
      name: 'Julie',
      room: 'Node Course'
    }];
  });

  it('Should add new user', ()=> {
    let users = new Users();
    let user = {
      id: '123',
      name: 'Andrew',
      room: 'The office fans'
    };

    let resUser = users.addUser(user.id, user.name, user.room);

    expect(resUser).toMatchObject(user);
  });

  it('Should return names for node course', () => {
    let userList = users.getUserList('Node Course');
    expect(userList).toMatchObject(['Mike', 'Julie']);
  });

  it('Should return names for react course', () => {
    let userList = users.getUserList('React Course');
    expect(userList).toMatchObject(['Jen']);
  });

  it('Should remove user for node course', () => {
    let id = users.users[0].id;
    let user = users.removeUser(id);
    expect(user.id).toBe(id);

    expect(users.users.length).toBe(2);
  });

  it('Should not remove user', () => {
    let id = '99';
    let user = users.removeUser(id);
    expect(user).toBeUndefined();

    expect(users.users.length).toBe(3);

  });

  it('Should find user', () => {
    let user = users.getUser(users.users[0].id);
    expect(user).toMatchObject(users.users[0]);
  });

  it('Should not find user', () => {
    let user = users.getUser('4');
    expect(user).toBeUndefined();
  });

});