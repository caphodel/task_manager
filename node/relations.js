var projects = global.model['projects'],
    issues = global.model['issues'],
    trackers = global.model['trackers'],
    issue_statuses = global.model['issue_statuses'],
    users = global.model['users'],
    enumerations = global.model['enumerations'],
    issue_categories = global.model['issue_categories'];

//set association for issues and projects
projects.hasMany(issues)
issues.belongsTo(projects);
//set association for issues and trackers
issues.hasOne(trackers, {
    foreignKey: "id"
})
issues.belongsTo(trackers, {
    foreignKey: "tracker_id"
});
//set association for issues and issue_statuses
issue_statuses.hasOne(issues, {
    foreignKey: "status_id"
});
issues.belongsTo(issue_statuses, {
    as: 'status',
    foreignKey: "status_id"
});
//set association for issues and users as assigned_to
users.hasOne(issues, {
    foreignKey: "assigned_to_id"
});
issues.belongsTo(users, {
    as: 'assigned_to',
    foreignKey: "assigned_to_id"
});
//set association for issues and users as author
users.hasOne(issues, {
    foreignKey: "author_id"
});
issues.belongsTo(users, {
    as: 'author',
    foreignKey: "author_id"
});
//set association for issues and enumerations as priority
enumerations.hasOne(issues, {
    foreignKey: "priority_id"
});
issues.belongsTo(enumerations, {
    as: 'priority',
    foreignKey: "priority_id"
});
