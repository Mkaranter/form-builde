import arrayToTree from 'array-to-tree'

export const getMarginForQuestion = (level?: number) => (level ? `${10 * level}px` : '10px')

export const toNumber = (strNum: string) => Number.parseInt(strNum, 10)

export const listToTree = <T>(array: T[]) =>
    arrayToTree(array, {
        parentProperty: 'parentId',
    })
