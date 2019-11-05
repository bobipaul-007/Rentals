import React from 'react';
import Enzyme from 'enzyme';
import {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Button from '.././src/Button';

Enzyme.configure({ adapter: new Adapter() });


describe('Button', () => {
    describe('Rendering', () => {
        it('should match to snapshot', () => {
            const component = shallow(<Button label="test label"/>)
            expect(component).toMatchSnapshot()
        });
    });
});