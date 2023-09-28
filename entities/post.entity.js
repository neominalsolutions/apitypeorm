const { EntitySchema } = require("typeorm");


const PostEntity = new EntitySchema({
  name:'post',
  tableName:'posts',
  columns:{
    id:{ primary:true, generated:'increment', type:'integer' },
    title:{type:'varchar', length:50},
    body:{type:'varchar', length:200}
  },
  relations: {
    comments: { // realation key
      type:'one-to-many', // one-to-one oner-to-many many-to-one many-to-many bu typeları destekler. 
      // çokaçok ilişkilerde ara tabloyu kendisi generate eder.
      target:'comment', // karşı taraftaki entity name alanı
      joinTable:true,
      cascade:true, // root kayıt silindiğinde alt tablodaki kayıtlarıda müdehale etmek için açtık
      onDelete:'CASCADE',
      inverside:'post' // comments post ile ilişkilidir. commentin post'unu getir.
      // karşı entity deki relation ismi
    }
  }
});

module.exports = PostEntity;