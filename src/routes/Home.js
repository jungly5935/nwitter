import React, { useEffect, useState } from "react";
import Nweet from '../components/Nweet';
import { dbService, storageService } from '../fbase';
import NweetFactory from '../components/NweetFactory';

const Home = ({userObj}) => 
{
    const [nweets, setNweets] = useState([]);

    useEffect(() => {
        
        dbService.collection("nweets").onSnapshot(snapshot => {
            
            const nweetArray =  snapshot.docs.map(doc => ({
                id:doc.id,
                ...doc.data(),
            }));
            console.log(nweetArray)
            setNweets(nweetArray)
        }) //getNweets와 달리, re-render하지 않아도 되서 더 빠름. getNweets는 구식 방법
    
    }, [])

 
    return (
        <div className="container">
        <NweetFactory userObj={userObj} />
        <div style={{ marginTop: 30 }}>
            {nweets.map((nweet) => (
                <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid}/>
                ))}
        </div>
    </div>

    )

}
export default Home;