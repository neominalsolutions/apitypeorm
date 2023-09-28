const { DataSource } = require("typeorm");
const UserEntity = require("../entities/user.entity");
const CommentEntity = require("../entities/comment.entity");
const PostEntity = require("../entities/post.entity");

const db = new DataSource({
  type:'postgres',
  synchronize:true, // model değişiklikleri dbye otomatik olarak eşlenmsin mi
  entities:[UserEntity,CommentEntity,PostEntity],
  port:5432,
  host:'localhost',
  username:'postgres',
  password:'admin',
  database:'TypeOrmDb'
})

db.initialize().then(()=> {
  console.log('postgres bağlantı yapıldı')
}).catch(err => {
  console.log('err', err);
  console.log('postgres bağlantı hata');
})


module.exports = db;