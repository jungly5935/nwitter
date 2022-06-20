import React, { useState } from 'react';
import { dbService, storageService } from '../fbase';
import {v4 as uuidv4} from 'uuid';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const NweetFactory = ({userObj}) => {
    const [attatchment, setAttatchment] = useState("");
    const [nweet, setNweet] = useState("");

    const onSubmit = async (event) => {
        if (nweet === "") {
            return;
          }
        event.preventDefault();
        let attatchmentURL = "";
        if(attatchment !== ""){
            const attatchmentRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
            const response = await attatchmentRef.putString(attatchment, "data_url")
            attatchmentURL = await response.ref.getDownloadURL()
        }

        const nweetObj = {
            text:nweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            attatchmentURL
        }
        
        await dbService.collection("nweets").add(nweetObj)
        setNweet("");
        setAttatchment("");
    }
    const onChange = (event) => {

        const value = event.target.value;
        setNweet(value);

    };

    const onFileChange = (event) => {
        
        const files = event.target.files;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            setAttatchment(finishedEvent.currentTarget.result)
        }
        reader.readAsDataURL(theFile)
    }

    const onClearAttatchment = () => setAttatchment("")

    return(  
    <form onSubmit={onSubmit} className="factoryForm">
      <div className="factoryInput__container">
        <input
          className="factoryInput__input"
          value={nweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="&rarr;" className="factoryInput__arrow" />
      </div>
      <label htmlFor="attach-file" className="factoryInput__label" >
      <span>Add photos</span>
        <FontAwesomeIcon icon={faPlus} />
      </label>
      
      <input
        id="attach-file"
        type="file"
        accept="image/*"
        onChange={onFileChange}
        style={{
          opacity: 0,
        }}
      />
            {attatchment && (
                <div className="factoryForm__attachment">
                <img
                  src={attatchment}
                  style={{
                    backgroundImage: attatchment,
                  }}
                />
                <div className="factoryForm__clear" onClick={onClearAttatchment}>
                  <span>Remove</span>
                  <FontAwesomeIcon icon={faTimes} />
                </div>
              </div>
            )}
        </form>

    )
}
export default NweetFactory