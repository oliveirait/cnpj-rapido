
interface StringProps {
    value: string
}
export function existStringValue ({value}: StringProps)
{
    return value ? value : 'N/A'
}