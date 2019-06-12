import { QuestionConditionTypes } from 'utils/helpers'

export const checkForCondition = (
    conditionType: string,
    conditionValue: string,
    level: number,
    formInputValue?: string
) => {
    if (level === 0) return true
    const equals =
        conditionType === QuestionConditionTypes.Equals && formInputValue == conditionValue
    const less = conditionType === QuestionConditionTypes.Less && formInputValue !== ''
    const greater =
        conditionType === QuestionConditionTypes.Greater &&
        parseInt(formInputValue!) > parseInt(conditionValue, 10)

    return equals || less || greater
}
