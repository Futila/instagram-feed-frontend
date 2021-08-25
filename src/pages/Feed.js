import React from 'react';
import api from '../services/api';
import { io } from 'socket.io-client';


import './Feed.css';
import more from '../assets/more.svg';
import like from '../assets/like.svg';
import comment from '../assets/comment.svg';
import send from '../assets/send.svg';

class Feed extends React.Component{
    state = {
        feed: [],
    };

    async componentDidMount(){
        this.registerToSocket ();
        const response = await api.get('posts');
        this.setState({feed: response.data});
    }

    registerToSocket = ()=>{
        const socket = io('https://instagram-feed-backend.herokuapp.com');

        socket.on('post', newPost =>{
            this.setState({feed: [newPost, ...this.state.feed]});
        });

        socket.on('like', likedPost =>{
            this.setState({
                feed: this.state.feed.map(post=>
                    post._id === likedPost._id ? likedPost : post
                )
        });
    });
    }

    handleLike = id => {
        api.post(`posts/${id}/like`);
    }

    render(){
        return(
           <section id="post-list" >
            { this.state.feed.map(post=>(
                <article key={post._id}>
                <header>
                    <div className="user-info">
                         <span>{post.author}</span>
                         <span className="place">{post.place}</span>
                    </div>

                    <img src={more} alt="mais"/>
                </header>

                <img src={`https://github.com/Futila/instagram-feed-backend/tree/master/uploads/resized/programming.jpg`} alt="image" />

                <footer>
                    <div className="actions">
                        <button type="button" onClick={()=> this.handleLike(post._id)}>
                            <img src={like} />
                        </button>
                        
                        <img src={comment} />
                        <img src={send} />
                    </div>
                    <strong>{post.likes} curtidas</strong>

                    <p>
                        {post.description}
                         <span>{post.hashtags}</span>
                    </p>
                </footer>
            </article>
            ))}
           </section>
        );
    }
}

export default  Feed;