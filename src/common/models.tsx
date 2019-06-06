export interface Question {
    text: string
    type: string
    level: number
    conditionValue?: string
    conditionType?: string
    id: number
    children?: Question[]
}
