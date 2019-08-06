import dayjs from 'dayjs';

export default function (ctx, inject) {
    inject('dayjs', dayjs);
}