const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const Blog = require('../models/blog')
const User = require('../models/user')

const helper = require('./test_helper')

const loginAndGetToken = async user => {
  const { body } = await api
    .post('/api/login')
    .send(user)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  return body.token
}

beforeEach(async () => {
  await User.deleteMany({})
  for (let userData of helper.initialUsers) {
    const passwordHash = await bcrypt.hash(userData.password, 10)
    const user = new User({ username: userData.username, passwordHash })
    await user.save()
  }

  const users = await helper.usersInDb()

  await Blog.deleteMany({})
  for (let blog of helper.initialBlogs) {
    blog.user = users[0].id
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

describe('Get blogs', () => {
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
})

describe('create a new blog post', () => {
  test('create a new blog post while logged in', async () => {
    const token = await loginAndGetToken(helper.initialUsers[0])

    const newBlog = {
      title: 'React contexts',
      author: 'Chan',
      url: 'https://reactpatterns.com/',
      likes: 2,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).toContain(newBlog.title)
  })

  test('create a new blog post while not logged in fail', async () => {
    const newBlog = {
      title: 'React contexts',
      author: 'Chan',
      url: 'https://reactpatterns.com/',
      likes: 2,
    }

    const result = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('invalid token')

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).not.toContain(newBlog.title)
  })

  test('new blog post default to 0 likes', async () => {
    const token = await loginAndGetToken(helper.initialUsers[0])

    const newBlog = {
      title: 'React contexts',
      author: 'Chan',
      url: 'https://reactpatterns.com/',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const savedBlog = blogsAtEnd.find(b => b.title === newBlog.title)
    expect(savedBlog.likes).toBe(0)
  })

  test('title and url properties are required', async () => {
    const token = await loginAndGetToken(helper.initialUsers[0])

    const newBlogWithoutTitleAndUrl = {
      likes: 2,
    }

    await api
      .post('/api/blogs')
      .send(newBlogWithoutTitleAndUrl)
      .set('Authorization', `bearer ${token}`)
      .expect(400)
  })
})

describe('delete blog post', () => {
  test('delete a blog post while logged in as the blog\'s user', async () => {
    const token = await loginAndGetToken(helper.initialUsers[0])

    const blogs = await helper.blogsInDb()
    const blogToDelete = blogs[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).not.toContain(blogToDelete.title)
  })

  test('delete a blog post while not logged fail', async () => {
    const blogs = await helper.blogsInDb()
    const blogToDelete = blogs[0]

    const result = await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('invalid token')

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).toContain(blogToDelete.title)
  })

  test('delete a blog post while logged in as other user fail', async () => {
    const token = await loginAndGetToken(helper.initialUsers[1])

    const blogs = await helper.blogsInDb()
    const blogToDelete = blogs[0]

    const result = await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('you are not authorized to delete this blog')

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).toContain(blogToDelete.title)
  })
})

test('update a blog post', async () => {
  const blogs = await helper.blogsInDb()
  const blogToUpdate = blogs[0]

  const updatedFields = {
    title: 'React contexts',
    likes: 2 //we can't update likes
  }

  const response = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedFields)

  const updatedBlog = response.body
  expect(updatedBlog).toEqual({
    title: updatedFields.title,
    url: blogToUpdate.url,
    author: blogToUpdate.author,
    likes: blogToUpdate.likes, // not updated
    id: blogToUpdate.id,
    user: blogToUpdate.user.toString()
  })
})

afterAll(() => {
  mongoose.connection.close()
})
