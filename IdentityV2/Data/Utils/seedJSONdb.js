{

    Users: [
        '{{repeat(10, 10)}}',
        {
            name: '{{firstName("male")}}',
            surname: '{{surname()}}',
            email: '{{email(true)}}',
            telephoneNumber: '{{phone("+(380)xx-xx-xx-xxx")}}',
            password: "1234abc",
            profileImageUrl: function (tags, index) {
                return 'https://jsonplaceholder.typicode.com/photos/' + (+index + 1);
            }
        }
    ],
    Roles: [
        '{{repeat(4, 4)}}',
        {
            title: function (tags, index) {
                var roleName = ["OrgAdmin", "LocalAdmin", "Teacher", "Pupil"];
                return roleName[index];
            }
        }
    ]
}