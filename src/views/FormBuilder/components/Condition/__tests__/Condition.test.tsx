import React from 'react'
import { shallow, mount } from 'enzyme'

import Condition from '../Condition'

describe('Condition component', () => {
    it('Component should render "Condition" label', () => {
        const component = shallow(<Condition setType={jest.fn()} setValue={jest.fn()} />)
        const label = <label>Condition</label>

        expect(component.contains(label)).toBe(true)
    })

    it('Component should render 2 selects for boolean parentValueType prop', () => {
        const component = mount(
            <Condition parentValueType={'boolean'} setType={jest.fn()} setValue={jest.fn()} />
        )

        expect(component.find('select')).toHaveLength(2)
    })

    it('omponent should render select and input for number parentValueType prop', () => {
        const component = mount(
            <Condition parentValueType={'number'} setType={jest.fn()} setValue={jest.fn()} />
        )

        expect(component.find('input')).toHaveLength(1)
        expect(component.find('select')).toHaveLength(1)
    })
})
