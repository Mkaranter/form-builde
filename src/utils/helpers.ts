export const getMarginForQuestion = (level?: number) => {
    if (!level) return '10px'

    return `${10 * level}px`
}
