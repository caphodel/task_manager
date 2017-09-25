var projects = global.model['projects'],
    issues = global.model['issues'],
    trackers = global.model['trackers'],
    issue_statuses = global.model['issue_statuses'],
    users = global.model['users'],
    enumerations = global.model['enumerations'],
    issue_categories = global.model['issue_categories'],
    time_entries = global.model['time_entries'],
    member_roles = global.model['member_roles'],
    roles = global.model['roles'],
    members = global.model['members'];

//set association for issues
//issues and project
projects.hasMany(issues)
issues.belongsTo(projects);
//issues and trackers
issues.hasOne(trackers, {
    foreignKey: "id"
})
issues.belongsTo(trackers, {
    foreignKey: "tracker_id"
});
//issues and issue_statuses
issue_statuses.hasOne(issues, {
    foreignKey: "status_id"
});
issues.belongsTo(issue_statuses, {
    as: 'status',
    foreignKey: "status_id"
});
//issues and users as assigned_to
users.hasOne(issues, {
    foreignKey: "assigned_to_id"
});
issues.belongsTo(users, {
    as: 'assigned_to',
    foreignKey: "assigned_to_id"
});
//issues and users as author
users.hasOne(issues, {
    foreignKey: "author_id"
});
issues.belongsTo(users, {
    as: 'author',
    foreignKey: "author_id"
});
//issues and enumerations as priority
enumerations.hasOne(issues, {
    foreignKey: "priority_id"
});
issues.belongsTo(enumerations, {
    as: 'priority',
    foreignKey: "priority_id"
});

//set association projects
projects.hasMany(members, {
    foreignKey: 'project_id'
})
members.belongsTo(projects)
projects.hasMany(time_entries, {
    foreignKey: 'project_id'
})
//set association member
/*members.hasOne(users, {
    foreignKey: 'user_id'
})*/

members.belongsTo(users)

members.hasOne(member_roles, {
    foreignKey: 'member_id'
})

member_roles.hasOne(roles, {
    targetKey: 'role_id',
    foreignKey: 'id'
})

member_roles.belongsTo(roles)
