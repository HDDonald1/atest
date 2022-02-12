export const postMock = { 
    userId: 0, 
    id: 0, 
    title: 'fakeTitle', 
    body: 'fakeBody' 
}
export const userMock = { 
    id: 0, 
    name: '', 
    username: 'username', 
    email: 'email', 
    address: {
        street: 'street',
        suite: 'suite',
        city: 'city',
        zipcode: 'zipcode',
        geo: {lat: 'lat', lng: 'lng'}
    }, 
    phone: 'phone', 
    website: 'website', 
    company: {
        name: 'name',
        catchPhrase: 'catchPhrase',
        bs: 'bs'
    }
}
export const postDataMock = { 
    user: userMock, 
    post: postMock
}
