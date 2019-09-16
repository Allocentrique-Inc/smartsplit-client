import React, {Component} from 'react'
import { Translation } from 'react-i18next'
import axios from 'axios'
import dynamo from 'dynamodb'
import Joi from '@hapi/joi'


import { toast } from 'react-toastify'

// dynamo.createTables({
//     'BlogPost': {readCapacity: 5, writeCapacity: 10},
//   }, function(err) {
//     if (err) {
//       console.log('Error creating tables: ', err);
//     } else {
//       console.log('Tables has been created');
//     }
//   });

// let BlogPost = dynamo.define('BlogPost', {
//     hashKey : 'email',
//     rangeKey : 'title',
//     schema : {
//       email   : Joi.string().email(),
//       title   : Joi.string(),
//       content : Joi.binary(),
//       tags   : dynamo.types.stringSet(),
//     }
// });

// BlogPost.create({
//     email: 'werner@example.com', 
//     title: 'Expanding the Cloud', 
//     content: 'Today, we are excited to announce the limited preview...'
//     }, function (err, post) {
//       console.log('created blog post');
//     });

// BlogPost.update({
//     email : 'werner@example.com',
//     title : 'Expanding the Cloud',
//     tags  : {$add : ['cloud', 'dynamodb']}
//   }, function (err, post) {
//     console.log('added tags to blog post', post.get('tags'));
//   });

export default class ListePieces extends Component {

    constructor(props) {
        super(props)
        this.state={medias:[]}
    }

    componentWillMount() {

        // BlogPost
        //     .query('werner@example.com')
        //     .exec();
        // console.log(BlogPost)

        axios.get('http://api.smartsplit.org:8080/v1/proposal')
        .then((res) => {
            console.log("PROPOSAL", res.data)
            const mediaId = res.data[0].mediaId
            console.log(mediaId)



            axios.get('http://api.smartsplit.org:8080/v1/media/')
            // axios.get('http://api.smartsplit.org:8080/v1/media/' + mediaId)
            .then((res)=>{
                console.log("MEDIA", res.data)
                this.setState({medias:res.data})
            })
        })
        .catch((error) => {
            toast.error(error)            
        })

    }

    render() {

        let tableauMedias = []
        if(this.state.medias.length > 0) {
          tableauMedias = this.state.medias.map((elem, _idx)=>{
            return (
                <div key={_idx} style={{marginTop: "20px"}}>
                    <div className="ui three column grid">
                        <div className="ui row">
                            <div className="ui thirteen wide column">
                                <div className="ui three column grid cliquable" onClick={()=>{window.location.href = `/oeuvre/sommaire/${elem.mediaId}`}} >
                                    <div className="ui row">
                                        <div className="ui one wide column">
                                            <i className="file image outline icon big grey"></i>
                                        </div>
                                        <div className="ui fifteen wide column">
                                            <div className="song-name">{`${elem.title}`}</div>
                                            <div className="small-400" style={{display: "inline-block"}}>&nbsp;&nbsp;Par&nbsp;</div><div className="small-500-color" style={{display: "inline-block"}}>{`${elem.artist}`}</div>
                                            <br/>
                                            <div className="small-400-color" style={{display: "inline-block"}}>Modifié il y a 2 jours &bull; Partagée avec</div>
                                        </div>
                                    </div>
                                </div>
                            </div>                            
                        </div>
                    </div>
                </div>
            )
        })}

        return (
            <Translation>
                {
                    t=>
                        <div>
                            <div className="heading2">{t('tableaudebord.navigation.0')}</div>
                            <br/>
                            <div className="medium-500">Mes ajouts</div>
                            <ul>{tableauMedias}</ul>                            
                        </div>
                }
            </Translation>
        )
    }
}