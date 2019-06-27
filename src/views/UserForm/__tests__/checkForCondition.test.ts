import { QuestionConditionTypes } from 'utils/enums'

import { checkForCondition } from '../checkForCondition'

describe('should check condition', () => {
    it('should return true for level = 0 ', () => {
        const result = checkForCondition('someString', 'anotherString', 0)
        expect(result).toBe(true)
    })
    it('should return true for type equals if values are equal ', () => {
        const result = checkForCondition(
            QuestionConditionTypes.Equals,
            'equalString',
            3,
            'equalString'
        )
        expect(result).toBe(true)
    })
    it('should return true for type less if form input is smaller than condition value', () => {
        const result = checkForCondition(QuestionConditionTypes.Less, '34', 4, '1')
        expect(result).toBe(true)
    })
    it('should return true for type greater if form inpu is greater than condition value', () => {
        const result = checkForCondition(QuestionConditionTypes.Greater, '1', 3, '11')
        expect(result).toBe(true)
    })
})
