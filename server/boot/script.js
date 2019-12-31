module.exports = function (app) {
    
    var ACL = app.models.ACL;
    ACL.create({
        principalType: ACL.USER,
        principalId: 'u001',
        model: 'User',
        property: ACL.ALL,
        accessType: ACL.ALL,
        permission: ACL.ALLOW
    }, function (err, acl) {
        ACL.create({
            principalType: ACL.USER,
            principalId: 'u001',
            model: 'User',
            property: ACL.ALL,
            accessType: ACL.READ,
            permission: ACL.DENY
        }, function (err, acl) {
        }
        );
    }
    );

    var Role = app.models.Role;
    var RoleMapping = app.models.RoleMapping;

    app.models.User.create([
        { username: 'John', email: 'john@doe.com', password: 'opensesame' },
        { username: 'Jane', email: 'jane@doe.com', password: 'opensesame' },
        { username: 'Bob', email: 'bob@projects.com', password: 'opensesame' }
    ], function (err, users) {
        if (err) return console.log(err);

        //create the admin role
        Role.create({
            name: 'admin'
        }, function (err, role) {
            if (err) throw err;

            console.log('Created role:', role);

            //make bob an admin
            role.principals.create({
                principalType: RoleMapping.USER,
                principalId: users[1].id
            }, function (err, principal) {
                if (err) throw err;

                console.log('Created principal:', principal);
            });

            //make bob an admin
            role.principals.create({
                principalType: RoleMapping.USER,
                principalId: users[2].id
            }, function (err, principal) {
                if (err) throw err;

                console.log('Created principal:', principal);
            });
            //make bob an admin
            role.principals.create({
                principalType: RoleMapping.USER,
                principalId: users[0].id
            }, function (err, principal) {
                if (err) throw err;

                console.log('Created principal:', principal);
            });

        });

    });

}
