import React, { useState } from 'react'

import { Question } from 'common/models'

import FormBlock from './components/UserQuestion'
import { checkForCondition } from './checkForCondition'

interface UserFormProps {
    questions: Question[]
    parentValue?: string
}

const UserForm: React.SFC<UserFormProps> = ({ questions, parentValue }): JSX.Element => {
    const [formInputValue, setFormInputValue] = useState('')

    return (
        <>
            {questions.map(e => (
                <div key={e.id}>
                    {checkForCondition(
                        e.conditionType!,
                        e.conditionValue!,
                        e.level,
                        parentValue
                    ) && (
                        <>
                            <FormBlock
                                data={e}
                                setFormInputValue={({
                                    target,
                                }: React.ChangeEvent<HTMLInputElement>) =>
                                    setFormInputValue(target.value)
                                }
                            />
                            {e.children && (
                                <UserForm questions={e.children} parentValue={formInputValue} />
                            )}
                        </>
                    )}
                </div>
            ))}
        </>
    )
}

export default UserForm
