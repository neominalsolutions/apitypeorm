const { EntitySchema } = require("typeorm");

const CommentEntity = new EntitySchema({
  name:'comment',
  tableName:'comments',
  columns: {
    id:{primary:true, generated:'increment', type:'integer'},
    by:{type:'varchar', length:20},
    text:{type:'varchar', length:200}
  },
  relations:{
    post:{ // relation key
      type:'many-to-one', // bi-directional çift ilişki
      target:'post', // karşı taraftaki entity name alanına denk gelmelidir.
      // joinColumn:{
      //   name:'postId'
      // },
      joinTable:true,
      onDelete:'CASCADE',
      inverside: 'comments' // karşı entitydeki relation ismi
    }
  }
});

module.exports = CommentEntity;

