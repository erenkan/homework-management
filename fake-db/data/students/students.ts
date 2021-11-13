import mock from '@/fake-db/mock'

const data = {
    users: [
        {
            id: 1,
            fullName: 'Galen Slixby',
            company: 'Yotz PVT LTD',
            role: 'editor',
            username: 'gslixby0',
            country: 'El Salvador',
            contact: '(479) 232-9151',
            email: 'gslixby0@abc.net.au',
            currentPlan: 'enterprise',
            status: 'inactive',
            avatar: '',
        },

    ],
}
mock.onGet("/students").reply(200, {
    users: data.users,
});