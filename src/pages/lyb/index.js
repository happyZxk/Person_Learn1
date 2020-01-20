import 'braft-editor/dist/index.css'
import React from 'react'
import {Button} from 'antd';
import BraftEditor from 'braft-editor'
import axiox from "../../axios"

export default class BasicDemo extends React.Component {

    state = {
        editorState: BraftEditor.createEditorState("null"), // 设置编辑器初始内容
        outputHTML: '<p></p>'
    }

    componentDidMount() {
        this.isLivinig = true
        // 3秒后更改编辑器内容
        setTimeout(this.setEditorContentAsync, 3000)
    }

    componentWillUnmount() {
        this.isLivinig = false
    }

    handleChange = (editorState) => {
        this.setState({
            editorState: editorState,
            outputHTML: editorState.toHTML()
        })
    }
    setEditorContentAsync = () => {
        this.isLivinig && this.setState({
            editorState: BraftEditor.createEditorState('<p>你好，<b>世界!</b><p>')
        })
    }
    preview = () => {

        if (window.previewWindow) {
            window.previewWindow.close()
        }

        window.previewWindow = window.open()
        window.previewWindow.document.write(this.buildPreviewHtml())
        window.previewWindow.document.close()

    }

    buildPreviewHtml = () => {

        return `
      <!Doctype html>
      <html>
        <head>
          <title>Preview Content</title>
          <style>
            html,body{
              height: 100%;
              margin: 0;
              padding: 0;
              overflow: auto;
              background-color: #f1f2f3;
            }
            .container{
              box-sizing: border-box;
              width: 1000px;
              max-width: 100%;
              min-height: 100%;
              margin: 0 auto;
              padding: 30px 20px;
              overflow: hidden;
              background-color: #fff;
              border-right: solid 1px #eee;
              border-left: solid 1px #eee;
            }
            .container img,
            .container audio,
            .container video{
              max-width: 100%;
              height: auto;
            }
            .container p{
              white-space: pre-wrap;
              min-height: 1em;
            }
            .container pre{
              padding: 15px;
              background-color: #f1f1f1;
              border-radius: 5px;
            }
            .container blockquote{
              margin: 0;
              padding: 15px;
              background-color: #f1f1f1;
              border-left: 3px solid #d1d1d1;
            }
          </style>
        </head>
        <body>
          <div class="container">${this.state.editorState.toHTML()}</div>
        </body>
      </html>
    `
    }

    render() {
        const {editorState, outputHTML} = this.state;
        const extendControls = [
            {
                key: 'custom-button',
                type: 'button',
                text: '预览',
                onClick: this.preview
            }
        ]
        const mediaBaseconfig = {
            // 文件限制
            accepts: {
                image: "image/png,image/jpeg,image/gif,image/webp,image/apng,image/svg",
                video: false,
                audio: false
            },
            //   允许插入的外部媒体的类型
            externals: {
                image: false,//是否允许插入外部图片，
                video: false,// 是否允许插入外部视频，
                audio: false,    //    是否允许插入外部视频，
                embed: false,    // 是否允许插入嵌入式媒体，例如embed和iframe标签等，
                allowPasteImage: true, // 是否允许直接粘贴剪贴板图片（例如QQ截图等）到编辑器
            }
        };
        return (
            <div style={{width: "820px", height: "400px", border: "1px solid gray", borderRadius: "5px"}}>
                <div className="editor-wrapper">
                    <BraftEditor

                        value={editorState}
                        onChange={this.handleChange}
                        extendControls={extendControls}
                        media={{
                            uploadFn: this.mediaUpload,
                            ...mediaBaseconfig,
                        }}
                    />
                </div>
                <Button type="primary" onClick={this.pubcontent}>发布</Button>
                <h5>输出内容</h5>
                <div className="output-content">{outputHTML}</div>
            </div>
        )
    }

    //发表提交上传
    pubcontent = () => {
        console.log(this.state.outputHTML)
        axiox.post("upload", {"aaa": "7875"})
            .then(response => {
                console.log(response);
            })
            .catch(err => {
                console.log(err);
            })
    }
    // 媒体上传
    mediaUpload = async ({file, success, error}) => {
        const formData = new FormData();
        console.log(file.webkitRelativePath);
        formData.append('file', file.file);
        console.log("file", file, success, error, formData);
        try {
            const url = axiox.post("upload", formData, {
                'Content-Type': 'multipart/form-data'
            })
            success({url: file.name});
        } catch (err) {
            error(err);
        }
    }
    // 整合需要上传的文件
    myUploadFn = (param, file) => {
        const formData = new FormData();
        formData.append('file', param.file);
        console.log("formData", formData, file);
        // url: JSON.parse(xhr.responseText).data.fileUrl,
        axiox.post("upload", formData, {
            'Content-Type': 'multipart/form-data'
        })
            .then(response => {
                console.log(response);
            })
            .catch(err => {
                console.log(err);
            })
        param.success("param")
        return true;
    }
}
