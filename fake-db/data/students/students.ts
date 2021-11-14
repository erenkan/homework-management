import mock from '@/fake-db/mock'
import { getters } from '~/store'

console.log(getters.students)
const students = getters.student;


// mock.onGet("/students").reply(200, {
//     users: 'selam',
// });