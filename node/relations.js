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
    enabled_modules = global.model['enabled_modules'],
    versions = global.model['versions'],
    news = global.model['news'],
    custom_fields = global.model['custom_fields'],
    custom_fields_projects = global.model['custom_fields_projects'],
    watchers = global.model['watchers'],
    journals = global.model['journals'],
    journal_details = global.model['journal_details'],
    custom_values = global.model['custom_values'],
    members = global.model['members'];

//set association for issues
//issues and project
//issues and trackers
issues.hasOne(trackers, {
    foreignKey: "id"
})
issues.belongsTo(trackers, {
    foreignKey: "tracker_id"
});
issues.hasMany(time_entries, {
    foreignKey: "issue_id"
})
time_entries.belongsTo(time_entries, {
    foreignKey: "issue_id"
});
issues.hasMany(watchers, {
    foreignKey: 'watchable_id'
})
watchers.belongsTo(issues, {
    foreignKey: "watchable_id",
    through: {
        watchable_type: "Issue"
    }
});
watchers.hasOne(users, {
    foreignKey: 'id'
})
watchers.belongsTo(users, {
    foreignKey: "user_id"
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

issues.hasMany(custom_values, {
    foreignKey: 'customized_id'
})
custom_values.belongsTo(issues, {
    foreignKey: "customized_id",
    through: {
        customized_type: "Issue"
    }
});

custom_fields.hasOne(custom_values, {
    foreignKey: "custom_field_id"
})

custom_values.belongsTo(custom_fields, {
    foreignKey: "custom_field_id"
});

/**************** set association projects ****************/
projects.hasMany(members, {
    foreignKey: 'project_id'
})
members.belongsTo(projects)
projects.hasMany(time_entries, {
    foreignKey: 'project_id'
})
projects.hasMany(enabled_modules, {
    foreignKey: 'project_id'
})
projects.hasMany(issues)
issues.belongsTo(projects);
projects.hasMany(versions, {
    foreignKey: 'project_id'
})
projects.hasMany(news, {
    foreignKey: 'project_id'
})
projects.belongsToMany(custom_fields, {
    through: custom_fields_projects
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

/**************** set association journal ****************/
issues.hasMany(journals, {
    foreignKey: 'journalized_id'
})

journals.hasMany(journal_details, {
    foreignKey: 'journal_id'
})

journals.hasOne(users, {
    targetKey: 'user_id',
    foreignKey: "id"
})

journals.belongsTo(users)

custom_fields.hasMany(journal_details, {
    foreignKey: "prop_key"
})

journal_details.belongsTo(custom_fields, {
    foreignKey: "prop_key"
});
