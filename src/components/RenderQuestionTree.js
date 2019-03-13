import React, { useState } from 'react'
import QuestionBlock from './RenderQuestionTree/QuestionBlock'

function RenderQuestionTree(props) {
    const [parentValueType, setParentValueType] = useState('')

    return props.data.map(i => {
        return (
            <div key={i.id}>
                <QuestionBlock
                    questionData={i}
                    setParentValueType={val => setParentValueType(val)}
                    parentValueType={props.parent ? props.parent.type : props.parentValueType}
                />
                {i.children && (
                    <RenderQuestionTree
                        data={i.children}
                        parent={i}
                        parentValueType={parentValueType}
                    />
                )}
            </div>
        )
    })
}

export default RenderQuestionTree
