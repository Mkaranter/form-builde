import React from 'react'
import QuestionBlock from './RenderQuestionTree/QuestionBlock'

function RenderQuestionTree(props) {
    return props.data.map(i => {
        return (
            <div key={i.id}>
                <QuestionBlock value={i} getOne={props.getOne} />
                {i.children && <RenderQuestionTree data={i.children} getOne={props.getOne} />}
            </div>
        )
    })
}

export default RenderQuestionTree
