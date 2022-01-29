import React from 'react';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme'
import Login from '../SignIn'
import Adapter from 'enzyme-adapter-react-16';
import SignUp from '../SignUp'

Enzyme.configure({ adapter: new Adapter() });

// describe('login check', () => {
//     let wrapper;

//     test('username check', () => {
//         wrapper = shallow(<Login />)

//         // wrapper.find('input[name="username"]').simulate('change', {target: {name:'username', value: 'pd664'}})

//         // expect(wrapper.state('username')).toEqual('pd664')
//         expect(wrapper.find('input[name="username"]').prop("value")).toEqual("pd664")
//     })

//     // it('password check', () => {
//     //     wrapper = shallow(<Login />)
//     //     wrapper.find('input[name="password"]').simulate('change', {target: {name: 'password', value: "parteek123"}})

//     //     expect(wrapper.prop('password')).toEqual('parteek123')
//     // })

//     // it('login check with right data',()=>{
//     //     wrapper = shallow(<Login />)
//     //     wrapper.find('input[name="username"]').simulate('change', {target: {name: 'username', value: 'pd664'}});
//     //     wrapper.find('input[name="password"]').simulate('change', {target: {name: 'password', value: 'parteek123'}});
//     //     wrapper.find('input[name="signup"]').simulate('click');
//     //     expect(wrapper.find('isLogined')).toEqual("a");
//     //     })
// })
let wrapper = shallow(<SignUp />)

it("Should save user to database", async done => {
    const res = await request.post("http://localhost:4000/users/signin").send({
      name: "Zell",
      username: "testing",
      password: "testing123"
    });

})