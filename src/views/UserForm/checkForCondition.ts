import { QuestionConditionTypes } from 'utils/enums'

export const checkForCondition = (
    conditionType: string,
    conditionValue: string,
    level: number,
    formInputValue?: string
) => {
    if (level === 0) {
        return true
    }

    const equals =
        conditionType === QuestionConditionTypes.Equals && formInputValue == conditionValue

    const less =
        conditionType === QuestionConditionTypes.Less &&
        formInputValue &&
        toNumber(formInputValue) < toNumber(conditionValue)

    const greater =
        conditionType === QuestionConditionTypes.Greater &&
        formInputValue &&
        toNumber(formInputValue) > toNumber(conditionValue)

    return equals || less || greater
}

function toNumber(strNum: string) {
    return Number.parseInt(strNum, 10)
}
