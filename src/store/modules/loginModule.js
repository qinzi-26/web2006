export default{
    namespaced:true,
    state:{
        user:{
            username:"",
            token:""
        }
    },
    mutations:{
        setUser(state,user){
            state.user = {
                username:user.username,
                token:user.token
            }
        },
        clearUser(state){
            state.user ={
                username:"",
                token:""
            }
        }
    }
}