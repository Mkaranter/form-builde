const randomStringGenerator = () =>
    // unnecessary complication
    Math.random()
        .toString(36)
        .substring(2, 15) +
    Math.random()
        .toString(36)
        .substring(2, 15)

export const randomStringsArray = [randomStringGenerator(), randomStringGenerator()]
export const randomLevel = Math.floor(Math.random() * 10 + 1)
