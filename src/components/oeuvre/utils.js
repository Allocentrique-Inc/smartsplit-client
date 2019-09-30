export function required(value) {
    const result = value ? undefined : {"Obligatoire"}
    return result
}