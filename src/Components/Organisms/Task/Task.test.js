import React from 'react';
import { shallow } from 'enzyme';
import { testStore} from './../../../Utils';
import Task from './Task';
import { Provider } from 'react-redux';
import store from '../../store';

const setUp = (initialState={}) => {
    const store = testStore(initialState);
    const wrapper = shallow(<Provider store={store}><Task store={store} /></Provider>).childAt(0).dive();
    return wrapper;
};

describe('Task Component', () => {

	let wrapper;
	beforeEach(() => { wrapper = setUp(); });

	it('Should Render a task', () => {
	 	   	expect(wrapper.find('div.task_container')).to.have.lengthOf(1);
	});
});