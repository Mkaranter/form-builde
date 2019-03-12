import React from 'react'
import QuestionBlock from './RenderQuestionTree/QuestionBlock'

function RenderQuestionTree(props) {
    return props.data.map(i => {
        return (
            <div key={i.id}>
                <QuestionBlock questionId={i.id} parentId={i.parentId} />
                {i.children && <RenderQuestionTree data={i.children} />}
            </div>
        )
    })
}

export default RenderQuestionTree
