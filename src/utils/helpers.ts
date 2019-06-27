export const getMarginForQuestion = (level?: number) => {
    if (!level) {
        return '10px'
    }

    return `${10 * level}px`
}

export const toNumber = (strNum: string) => Number.parseInt(strNum, 10)
