import React, { Component } from 'react';
import axios from 'axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {

    state ={
        posts: []
    }
    
    componentDidMount () {
        axios.get('https://jsonplaceholder.typicode.com/posts').then(
            response => {
                const posts = response.data.slice(0,4);
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'KV'
                    }
                });
                this.setState({
                    posts: updatedPosts
                })
            }
        );

    }

    postSelectedHandler = (id) => {

    }

    render () {

        const posts = this.state.posts.map(post => {
            return <Post title={post.title} author={post.author} key={post.id}
            clicked={() = this.postSelectedHandler(post.id)}/>
        });

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost id={this.state.selecedPostId} />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;