import React from 'react'
import { shallow } from 'enzyme'

import Button from 'common/components/Button'
import { questionsMock } from 'common/__mocks__/questionsMock'
import { Dispatch } from 'utils/store'

import FormBuilder from '../FormBuilder'
import { ReturnKeyType } from 'react-native'

describe('FormBuilder component', () => {
    it('Component should render "Make Form" button', () => {
        // const fn = jest.fn() as jest.Mock<ReturnType<Dispatch>>
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
        const component = shallow(<FormBuilder questions={questionsMock} />)
        expect(component.find(Button).contains('Add Input')).toBe(true)
    })

    it('Component should render 2 styled button', () => {
        const component = shallow(<FormBuilder questions={questionsMock} />)
        const button = component.find(Button)

        expect(button).toHaveLength(2)
    })
})
