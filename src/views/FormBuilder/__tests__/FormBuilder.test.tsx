import React from 'react'
import { shallow } from 'enzyme'
import 'fake-indexeddb/auto'

import Button from 'common/components/Button'
import { questionsMock } from 'common/__mocks__/questionsMock'

import FormBuilder from '../FormBuilder'

describe('FormBuilder component', () => {
    it('Component should render "Make Form" button', () => {
        const component = shallow(
            <FormBuilder
                questions={questionsMock}
                toggleUserForm={jest.fn()}
                addQuestion={jest.fn()}
            />
        )
        expect(component.find(Button).contains('Make a form')).toBe(true)
    })

    it('Component should render "Add Input" button', () => {
        const component = shallow(
            <FormBuilder
                questions={questionsMock}
                toggleUserForm={jest.fn()}
                addQuestion={jest.fn()}
            />
        )
        expect(component.find(Button).contains('Add Input')).toBe(true)
    })

    it('Component should render 2 styled button', () => {
        const component = shallow(
            <FormBuilder
                questions={questionsMock}
                toggleUserForm={jest.fn()}
                addQuestion={jest.fn()}
            />
        )
        const button = component.find(Button)

        expect(button).toHaveLength(2)
    })
})
