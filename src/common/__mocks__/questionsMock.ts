import { Question } from 'common/models'

export const questionsMock: Question[] = [
    {
        text: 'Test question',
        type: 'number',
        level: 3,
        id: 1,
    },
    { text: 'Another question', type: 'text', level: 2, id: 2 },
]

export const updatedQuestion: Question = {
    text: 'Test question changed',
    type: 'boolean',
    level: 3,
    id: 1,
}
