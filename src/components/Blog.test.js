import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
    const blog = {
        title: 'Testing component',
        author: 'Component tester',
        url: 'react-testing.com'
    }

    render(<Blog blog={blog} />)
    const element = screen.getByText('Testing component')
    expect(element).toBeDefined()
})