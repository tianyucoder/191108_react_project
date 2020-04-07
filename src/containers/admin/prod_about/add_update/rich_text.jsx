import React, { Component } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
//import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

class EditorConvertToHTML extends Component {
  state = {
    editorState: EditorState.createEmpty(), //创建一个空的编辑器
	}
	
	getRichText = ()=>{
		const { editorState } = this.state;
		return draftToHtml(convertToRaw(editorState.getCurrentContent()))
	}

	//编辑器改变的回调（输入了字符、点击了工具栏的按钮等等）
  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  render() {
    const { editorState } = this.state;
    return (
      <div>
        <Editor
          editorState={editorState}
          //wrapperClassName="demo-wrapper" 
					//editorClassName="demo-editor"
					editorStyle={{border:'1px solid black',minHeight:'300px',paddingLeft:'20px'}}
          onEditorStateChange={this.onEditorStateChange}
        />
      </div>
    );
  }
}

export default EditorConvertToHTML