import React from 'react'
import { shallow } from 'enzyme'
import FormBuilder from './FormBuilder'
import Button from 'common/components/Button'

const mockedQuestion1 = {
    text: 'Test question',
    type: 'number',
    level: 3,
    id: 1,
}

const mockedQuestion2 = {
    text: 'Another question',
    type: 'text',
    level: 2,
    id: 2,
}

const questions = [mockedQuestion1, mockedQuestion2]

describe('FormBuilder component', () => {
    it('Component should render "Make Form" button', () => {
        const component = shallow(<FormBuilder questions={questions} />)
        expect(component.find(Button).contains('Make a form')).toBe(true)
    })

    it('Component should render "Add Input" button', () => {
        const component = shallow(<FormBuilder questions={questions} />)
        expect(component.find(Button).contains('Add Input')).toBe(true)
    })

    it('Component should render 2 styled button', () => {
        const component = shallow(<FormBuilder questions={questions} />)
        const button = component.find(Button)

        expect(button).toHaveLength(2)
    })
})
