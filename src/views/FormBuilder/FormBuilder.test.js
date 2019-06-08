import React from 'react'
import { shallow } from 'enzyme'
import FormBuilder from './FormBuilder'
import Button from 'common/components/Button'

test('Form detail should contain styled button', () => {
    const component = shallow(<FormBuilder />)

    expect(component.find(Button).contains('Make a form')).toBe(true)
})

test('Form detail should contain 2 styled button', () => {
    const component = shallow(<FormBuilder />)
    const button = component.find(Button)

    expect(button).toHaveLength(2)
})
