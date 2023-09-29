const { DataSource } = require("typeorm");
const UserEntity = require("../entities/user.entity");
const CommentEntity = require("../entities/comment.entity");
const PostEntity = require("../entities/post.entity");

const db = new DataSource({
  type:'postgres',
  synchronize:true, // model değişiklikleri dbye otomatik olarak eşlenmsin mi
  entities:[UserEntity,CommentEntity,PostEntity],
  port:5432,
  host:process.env.DB_HOST,
  username:process.env.DB_USERNAME,
  password:process.env.DB_PASSWORD,
  database:process.env.DATABASE
})

db.initialize().then(()=> {
  console.log('postgres bağlantı yapıldı')
}).catch(err => {
  console.log('err', err);
  console.log('postgres bağlantı hata');
})


module.exports = db;