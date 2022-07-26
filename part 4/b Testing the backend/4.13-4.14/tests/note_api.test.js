const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('blogs have unique identifier id', async () => {
  const response = await api.get('/api/blogs')

  for (let blog of response.body) {
    expect(blog.id).toBeDefined()
  }
})

test('create a new blog post', async () => {
  const newBlog = {
    title: 'React contexts',
    author: 'Chan',
    url: 'https://reactpatterns.com/',
    likes: 2,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(b => b.title)
  expect(titles).toContain(newBlog.title)
})

test('new blog post default to 0 likes', async () => {
  const newBlog = {
    title: 'React contexts',
    author: 'Chan',
    url: 'https://reactpatterns.com/',
    likes: 0,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  const savedBlog = blogsAtEnd.find(b => b.title === newBlog.title)
  expect(savedBlog.likes).toBe(0)
})

test('title and url properties are required', async () => {
  const newBlogWithoutTitleAndUrl = {
    author: 'Chan',
    likes: 2,
  }

  await api
    .post('/api/blogs')
    .send(newBlogWithoutTitleAndUrl)
    .expect(400)
})

test('delete a blog post', async () => {
  const blogs = await helper.blogsInDb()
  const blogToDelete = blogs[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

  const titles = blogsAtEnd.map(b => b.title)
  expect(titles).not.toContain(blogToDelete.title)
})

test('update a blog post', async () => {
  const blogs = await helper.blogsInDb()
  const blogToUpdate = blogs[0]

  const updatedFields = {
    title: 'React contexts',
    author: 'Chan',
    likes: 2 //we can't update likes
  }

  const response = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedFields)

  const updatedBlog = response.body
  expect(updatedBlog).toEqual({
    title: updatedFields.title,
    author: updatedFields.author,
    url: blogToUpdate.url,
    likes: blogToUpdate.likes,
    id: blogToUpdate.id
  })
})

afterAll(() => {
  mongoose.connection.close()
})
