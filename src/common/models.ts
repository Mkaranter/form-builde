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

/**
 * DbStore represents a name of the store in the db
 */
export type DbStore = string
