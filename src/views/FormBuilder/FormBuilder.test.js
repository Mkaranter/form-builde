import React from 'react'
import { shallow } from 'enzyme'
import FormBuilder from './FormBuilder'
import Button from 'common/components/Button'

test('Component should render "Make Form" button', () => {
    const component = shallow(<FormBuilder />)
    expect(component.find(Button).contains('Make a form')).toBe(true)
})

test('Component should render "Add Input" button', () => {
    const component = shallow(<FormBuilder />)
    expect(component.find(Button).contains('Add Input')).toBe(true)
})

test('Component should render 2 styled button', () => {
    const component = shallow(<FormBuilder />)
    const button = component.find(Button)

    expect(button).toHaveLength(2)
})
