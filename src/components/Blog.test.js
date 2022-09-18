import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

const user = {
    name: 'Anthony',
    username: 'anthony123'
}

const blog = {
    title: 'Testing component',
    author: 'Component tester',
    url: 'react-testing.com',
    likes: 10,
    user: user
}

describe('testing component render', () => {
    test('renders only title and author by default', () => {
        const rendered = render(<Blog blog={blog} user={user} updateBlog={() => {}} removeBlog={() => {}} />)
        expect(rendered).toBeDefined()

        expect(screen.getByText('Testing component')).toBeDefined()
        // expect(screen.queryByText('react-testing.com')).not.toBeInTheDocument()
        // expect(screen.queryByText('10')).not.toBeInTheDocument()
        expect(screen.queryByText('Anthony')).not.toBeInTheDocument()
    })
})

describe('testing component render with events', () => {
    test('content is shown when the button is clicked', async () => {
        const rendered = render(<Blog blog={blog} user={user} updateBlog={() => {}} removeBlog={() => {}} />)
        const client = userEvent.setup()
        const button = screen.getByText('view')
        await client.click(button)

        expect(screen.getByText('like')).toBeInTheDocument()
        expect(screen.getByText('react-testing.com')).toBeInTheDocument()
    })
})
