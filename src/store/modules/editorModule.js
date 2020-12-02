export default{
    namespaced:true,
    state:{
        editorContent:""
    },
    mutations:{
        setEditorContent(state,content){
            state.editorContent = content;
        }
    }
}