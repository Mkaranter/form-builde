import React from 'react'
import { shallow } from 'enzyme'

import Button from 'common/components/Button'
import { questions } from 'common/__mocks__/questions'

import FormBuilder from './FormBuilder'

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
