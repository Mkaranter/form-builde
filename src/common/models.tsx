export interface Question {
    [key: string]: string | number | undefined | Question[]
    text: string
    type: string
    level: number
    conditionValue?: string
    conditionType?: string
    id: number
    children?: Question[]
}

export interface FormState {
    questionList: Question[]
    showUserForm: boolean
}

export interface AppState {
    form: FormState
}
