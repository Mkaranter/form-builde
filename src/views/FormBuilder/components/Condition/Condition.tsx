import React from 'react'

import { QuestionConditionTypes, QuestionTypes } from 'utils/helpers'

interface ConditionProps {
    value?: string
    type?: string
    setValue: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
    setType: (event: React.ChangeEvent<HTMLSelectElement>) => void
    parentValueType?: string
}

const Condition: React.SFC<ConditionProps> = ({
    value,
    type,
    setValue,
    setType,
    parentValueType,
}): JSX.Element => {
    return (
        <>
            <label>Condition</label>
            <select onChange={setType} value={type}>
                <option value={QuestionConditionTypes.Equals}>Equals</option>
                {parentValueType === QuestionTypes.Number && (
                    <>
                        <option value={QuestionConditionTypes.Greater}>Greater than</option>
                        <option value={QuestionConditionTypes.Less}>Less than</option>
                    </>
                )}
            </select>
            {parentValueType !== QuestionTypes.Boolean ? (
                <input onChange={setValue} type={parentValueType} value={value} required />
            ) : (
                <select onChange={setValue} value={value}>
                    <option defaultChecked value="" disabled>
                        -- select --
                    </option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>
            )}
        </>
    )
}

export default Condition
