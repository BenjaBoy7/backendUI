import React from 'react';
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
import { getDroppedOrSelectedFiles } from 'html5-file-selector'
// import './vendor/dropzone/dist/min/dropzonemin.js'
import axios from 'axios';

const FileUploadComponent = () => {

    const fileParams = ({ meta }) => {
        return { url: 'http://localhost:8000/post' }
    }

    const onFileChange = ({ meta, file }, status) => { 
        console.log(status, meta, file) 
        

    }

    const onSubmit = (files, allFiles) => {
        allFiles.forEach(f => f.remove())
    }
    const getFilesFromEvent = e => {
        return new Promise(resolve => {
            getDroppedOrSelectedFiles(e).then(chosenFiles => {
                resolve(chosenFiles.map(f => f.fileObject))
            })
        })
    }
    // const options =e=> {
    //     onUploadProgress(ProgressEvent)= {
    //         const {loaded, total}= ProgressEvent
    //         let percent = Math.floor((loaded*100)/total)

    //         console.log(`${loaded} kb of ${total} kb | {${percent}`);
    //         if(percent < 100){
    //             this.setState()
    //         }
    //     }
    // }
    const selectFileInput = ({ accept, onFiles, files, getFilesFromEvent }) => {
        const textMsg = files.length > 0 ? 'Add more files' : 'Select Files'
        //console.log("allfiles ",files)
  

        return (
            <label className="btn btn-danger mt-4">
                {textMsg}
                <input
                    style={{ display: 'none' }}
                    type="file"
                    accept={accept}
                    multiple
                    onChange={e => {
                        getFilesFromEvent(e).then(chosenFiles => {
                            onFiles(chosenFiles)
                        })
                    }}
                />
            </label>
        )
    }

    return (
        <Dropzone
            // onSubmit={onSubmit}
            onChangeStatus={onFileChange}
            InputComponent={selectFileInput}
            getUploadParams={fileParams}
            getFilesFromEvent={getFilesFromEvent}
            accept="image/*,audio/*,video/*"
            maxFiles={20}
            inputContent="Drop A File"
            styles={{
                // dropzone: { height: 200 },
                dropzoneActive: { borderColor: '#0d6efd' },
            }}            
        />
    );
};

export default FileUploadComponent;