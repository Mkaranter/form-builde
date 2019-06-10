export interface Question {
    [key: string]: string | number | undefined | boolean | Question[]
    text: string
    type: string
    level: number
    conditionValue?: string
    conditionType?: string
    id: number
    children?: Question[]
}
