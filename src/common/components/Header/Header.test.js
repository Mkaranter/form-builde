import React from 'react'
import { shallow } from 'enzyme'
import Header from './Header'

it('Render header', () => {
    const component = shallow(<Header />)
    const header = <h1>FORM BUILDER APP</h1>
    expect(component.contains(header)).toEqual(true)
})
