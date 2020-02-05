import React from 'react';
import { shallow} from 'enzyme';
import { findByTestAtrr } from './../../../Utils';
import Login from './Login';

//const addUserDetails = () =>{}

describe('Login Component', () => {

    let component;
    
    beforeEach(() => {
    	const addUserDetails = jest.fn();
        component = shallow(<Login addUserDetails={addUserDetails}/>);
    });

    it('Should Render a Login', () => {
            const button = findByTestAtrr(component, 'loginComponent');
            expect(button.length).toBe(1);
        });

     
});


// it('Should emit callback on click event', () => {
//             const button = findByTestAtrr(wrapper, 'buttonComponent');
//             button.simulate('click');
//             const callback = mockFunc.mock.calls.length;
//             expect(callback).toBe(1);
//         });