const {EntitySchema} = require('typeorm');

const UserEntity = new EntitySchema({
	name: 'user', // Relation ismi
	tableName: 'user',
	columns: {
		id: {primary: true, generated: 'increment', type: 'integer'},
		username: {type: 'varchar', unique: true, length: 50},
		password: {type: 'varchar', length: 12},
		createdAt: {type: 'timestamp', default: new Date().toISOString()},
	},
});

module.exports = UserEntity;
