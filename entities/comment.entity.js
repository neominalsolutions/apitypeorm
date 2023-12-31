const {EntitySchema} = require('typeorm');

const Comment = new EntitySchema({
	name: 'Comment',
	tableName: 'comment',
	columns: {
		id: {primary: true, generated: 'uuid', type: 'uuid'},
		by: {type: 'varchar', length: 20},
		text: {type: 'varchar', length: 200},
	},
	relations: {
		post: { // Relation key
			type: 'many-to-one',
			target: 'Post',
			joinTable: true,
			onDelete: 'CASCADE',
			inverseSide: 'comments', // Diğer tablodaki ilişki alanı
		},
	},
});

module.exports = Comment;

