import React from 'react'

import { questionConditionTypes } from 'utils/helpers'

interface ConditionProps {
    value?: string
    type?: string
    setValue: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
    setType: (event: React.ChangeEvent<HTMLSelectElement>) => void
    parentValueType?: string
}

function Condition({ value, type, setValue, setType, parentValueType }: ConditionProps) {
    return (
        <>
            <label>Condition</label>
            <select onChange={setType} value={type}>
                <option value={questionConditionTypes.equals}>Equals</option>
                {parentValueType === 'number' && (
                    <>
                        <option value={questionConditionTypes.greater}>Greater than</option>
                        <option value={questionConditionTypes.less}>Less than</option>
                    </>
                )}
            </select>
            {parentValueType !== 'boolean' ? (
                <input onChange={setValue} type={parentValueType} value={value} />
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
