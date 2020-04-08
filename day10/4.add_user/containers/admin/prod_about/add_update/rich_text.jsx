import React, { Component } from 'react';
import { EditorState, convertToRaw,ContentState} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

class EditorConvertToHTML extends Component {
  state = {
    editorState: EditorState.createEmpty(), //创建一个空的编辑器
	}
	
	//获取富文本
	getRichText = ()=>{
		const {editorState} = this.state;
		return draftToHtml(convertToRaw(editorState.getCurrentContent()))
	}

	//根据富文本还原出来一个编辑器且编辑器里有内容，且编辑器的按钮跟随内容走
	setRichText = (html)=>{
    const contentBlock = htmlToDraft(html);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      this.setState({editorState})
    }
	}


	//编辑器改变的回调（输入了字符、点击了工具栏的按钮等等）
  onEditorStateChange = (editorState) => {
    this.setState({editorState});
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