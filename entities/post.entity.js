const {EntitySchema} = require('typeorm');

const Post = new EntitySchema({
	name: 'Post',
	tableName: 'post',
	columns: {
		id: {primary: true, generated: 'uuid', type: 'uuid'},
		title: {type: 'varchar', unique: true, length: 50},
		body: {type: 'varchar', length: 200},
		createdAt: {type: 'timestamp', default: new Date().toISOString()},
	},
	relations: {
		comments: {
			type: 'one-to-many',
			target: 'Comment',
			cascade: true, // Root child ilişkisi varsa alt ilişkilerine insert yapmak için,
			onDelete: 'CASCADE',
			joinTable: true,
			inverseSide: 'post', // Her iki tarafa ilişki alanlarını yazıyoruz
		}},
});

module.exports = Post;
