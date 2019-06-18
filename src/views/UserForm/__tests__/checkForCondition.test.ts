import { checkForCondition } from '../checkForCondition'
import { randomStringsArray, randomLevel } from '../__mocks__/mocks'

import { QuestionConditionTypes } from 'utils/enums'

describe('should check condition', () => {
    it('should return true for level = 0 ', () => {
        const result = checkForCondition(randomStringsArray[0], randomStringsArray[1], 0)
        expect(result).toBe(true)
    })
    it('should return true for type equals if values are equal ', () => {
        const result = checkForCondition(
            QuestionConditionTypes.Equals,
            randomStringsArray[0],
            randomLevel,
            randomStringsArray[0]
        )
        expect(result).toBe(true)
    })
    it('should return true for type less if form input is smaller than condition value', () => {
        const result = checkForCondition(QuestionConditionTypes.Less, '34', randomLevel, '1')
        expect(result).toBe(true)
    })
    it('should return true for type greater if form inpu is greater than condition value', () => {
        const result = checkForCondition(QuestionConditionTypes.Greater, '1', randomLevel, '11')
        expect(result).toBe(true)
    })
})
