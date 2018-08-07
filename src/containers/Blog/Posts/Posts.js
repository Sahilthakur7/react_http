import React, { Component } from 'react';
import axios from '../../../axios';
import Post from '../../../components/Post/Post';
import './Posts.css';

import {Link} from 'react-router-dom';

class Posts extends Component{

    state ={
        posts: [],

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
        ).catch(error=> {
            // this.setState({error: true})
        });

    }

    postSelectedHandler = (id) => {
        this.setState({
            selectedPostId: id
        });

    }

    render(){
        let posts = <p style={{textAlign: 'center'}}>This is not working!</p>
            if(!this.state.error){
                posts = this.state.posts.map(post => {
                    return <Link to={'/'+ post.id} key={post.id}>
                        <Post 
                            title={post.title} 
                            author={post.author} 
                            clicked={ () => this.postSelectedHandler(post.id)}/>
                    </Link>});
            }


        return(

            <section className="Posts">
                {posts}
            </section>
        )
    }

}

export default Posts;
