import dayjs from 'dayjs'

export function msgTimeFormat(timestamp) {
    const today = dayjs().format('MM-DD');
    const input = dayjs(timestamp).format('MM-DD');
    return input === today ? dayjs(timestamp).format('HH:mm') : input
}

export function listTimeFormat(timestamp) {
    const today = dayjs().format('MM-DD');
    const input = dayjs(timestamp).format('MM-DD');
    return input === today ? dayjs(timestamp).format('HH:mm') : input
}