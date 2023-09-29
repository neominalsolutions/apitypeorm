const express = require('express');
const router = express.Router();
var { expressjwt: jwt } = require("express-jwt");
const Post = require('../entities/post.entity');
const db = require('../database/db');
const PostRepo = db.getRepository(Post);


// HTTP Verbs => HTTPGET / api/blogs/1
// HTTPGET Config amaçlı gönderimlerde /api/blogs HEADER Accept-Language=en
// HTTPPOST /api/user/me {userKey:'asdsad', apiKey:'sadsad'} req.body JSON
// 200 başarı kodları
// 200 OK GET
// 201 Created Result
// 204 Update,Delete No Content

// Serverdan dönen hata kodları (500) sunucuda bir exception var.
// 422 Entity Unprocessable (Validation Error)
// 400 Bad Request
// 401 UnAuthorized (JWT AccessToken yoksa)
// 403 Forbiden (Yetkisi yok.)
// 404 NotFound kaynak bulunamadı hatası 

// VERBS => POST, PUT, PATCH (embeded dokuman modifiye işleminde), DELETE, 

// Sample Endpoints
// api/blogs GET
// api/blogs/id GET
// api/blogs/id PUT {username:'', email:''}
// api/blogs/id DELETE
// api/blogs/id PATCH user:{ profile:{path:'', theme:'black'}}
// api/blogs/id/addComment PATCH (Nested Endpoint) api/comments POST
// api/blogs/id/comments GET

router.get('/', jwt({secret:process.env.JWT_KEY,algorithms:['HS512']}), (req,res) => {



  console.log('get');
  res.status(200).json([]);
})

router.post('/', async (req,res) => {
  console.log('req.body', req.body);

  // post ile birlikte post comment değerleri save edebiliyor muyuz.
  let postDto = {... req.body, comments:[{by:'ali', text:'yorum-1'},{by:'can', text:'yorum-2'}]};
  

  PostRepo.save(postDto).then(response => {
    console.log('response', response);
    res.status(201).json(response); // createdResults
  });
  

})


router.get('/:id',async (req,res) => {
  // parameteres okumak için aşağıdaki gibi tanımlarız.
  // parametre karşılama.
  console.log('id', req.params.id);
  console.log('headers', req.headers['x-client']);
  console.log('queries', req.query['name']);


  if(req.params.id == undefined){
    res.status(404).send();
  } else {

    const id = req.params.id;

    const response2 =  await PostRepo.find({where:{id}, relations:['comments']});
    console.log('response2', response2);

    // const response =  await PostRepo.find({where:{id:req.params.id}, relations:'comments'})

    res.status(200).json(response2);
  }
})


router.put('/:id', (req,res) => {
  const dto = {... req.body};
  const id = req.params.id;
  console.log('id', id);
  console.log('dto', dto);

  res.status(204).send();
})

router.patch('/:id', (req,res) => {
  console.log('id', req.params.id);
  if(req.params.id == undefined){
    res.status(404).send();
  } else {
    res.status(204).send();
  }
})

router.delete('/:id', async (req,res) => {
  console.log('id', req.params.id);
  if(req.params.id == undefined){
    res.status(404).send();
  } else {

    // post silinince cascade olduğundan commentlerde silinecektir.
    const delRes = await PostRepo.delete({id: req.params.id});
    console.log('delRes', delRes);

    res.status(204).send();
  }
})


module.exports = router;