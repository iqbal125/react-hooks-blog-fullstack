import React, { useReducer } from 'react';
import Context from './utils/context';
import * as ACTIONS from './store/actions/actions';

import * as Reducer1 from './store/reducers/plain_reducer';
import * as AuthReducer from './store/reducers/auth_reducer';
import * as FormReducer from './store/reducers/form_reducer';
import * as PostsReducer from './store/reducers/posts_reducer';


import Routes from './routes';

import Auth from './utils/auth';

const auth = new Auth()


const ContextState = (props) => {
    /*
        Plain Reducer
    */
    const [stateReducer1, dispatchReducer1] = useReducer(Reducer1.Reducer1,
                                                         Reducer1.initialState)


    const handleDispatchTrue = () => {
      //    dispatchReducer1(type: "SUCCESS")
      //    dispatchReducer1(ACTIONS.SUCCESS)
      dispatchReducer1(ACTIONS.success())
    }

    const handleDispatchFalse = () => {
      //     dispatchReducer1(type: "FAILURE")
      //    dispatchReducer1(ACTIONS.FAILURE)
      dispatchReducer1(ACTIONS.failure())
     }

    /*
      Auth Reducer
    */
    const [stateAuthReducer, dispatchAuthReducer] = useReducer(AuthReducer.AuthReducer,
                                                               AuthReducer.initialState)


    const handleLogin = () => {
      dispatchAuthReducer(ACTIONS.login_success())
    }

    const handleLogout = () => {
      dispatchAuthReducer(ACTIONS.login_failure())
    }


    const handleDBProfile = (profile) => {
      dispatchAuthReducer(ACTIONS.set_db_profile(profile))
    }

    const handleRemoveDBProfile = () => {
      dispatchAuthReducer(ACTIONS.remove_db_profile())
    }

    const handleAddProfile = (profile) => {
      dispatchAuthReducer(ACTIONS.add_profile(profile))
    }

    const handleRemoveProfile = () => {
      dispatchAuthReducer(ACTIONS.remove_profile())
    }



    /*
      Form Reducer
    */

    const [stateFormReducer, dispatchFormReducer] = useReducer(FormReducer.FormReducer,
                                                               FormReducer.initialState)

    const handleFormChange = (event) => {
      dispatchFormReducer(ACTIONS.user_input_change(event.target.value))
    };

    const handleFormSubmit = (event) => {
      event.preventDefault();
      event.persist();
      dispatchFormReducer(ACTIONS.user_input_submit(event.target.useContext.value))
    };


    /*
      Posts Reducer
    */

    const [statePostsReducer, dispatchPostsReducer] = useReducer(PostsReducer.PostsReducer,
                                                         PostsReducer.initialState)


    const handleSetPosts = (posts) => {
      dispatchPostsReducer(ACTIONS.set_db_posts(posts) )
    }

    const handleRemovePosts = () => {
      dispatchPostsReducer(ACTIONS.remove_db_posts() )
    }


    //Handle authentication from callback
    const handleAuthentication = (props) => {
      if(props.location.hash) {
        auth.handleAuth()
      }
    }


    return(
      <div>
      <Context.Provider
          value={{
            stateProp1: stateReducer1.stateprop1,
            dispatchContextTrue: () => handleDispatchTrue(),
            dispatchContextFalse: () => handleDispatchFalse(),

            //Auth Reducer
            //keep for global state
            authState: stateAuthReducer.is_authenticated,
            dbProfileState: stateAuthReducer.db_profile,
            profileState:  stateAuthReducer.profile,

            handleAddDBProfile: (profile) => handleDBProfile(profile),
            handleRemoveDBProfile: () => handleRemoveDBProfile(),
            handleUserAddProfile: (profile) => handleAddProfile(profile),
            handleUserRemoveProfile: () => handleRemoveProfile(),
            handleUserLogin: () => handleLogin(),
            handleUserLogout: () => handleLogout(),

            //Form Reducer
            useContextChangeState: stateFormReducer.user_textChange,
            useContextSubmitState: stateFormReducer.user_textSubmit,
            useContextSubmit: (event) => handleFormSubmit(event),
            useContextChange: (event) => handleFormChange(event),

            //Posts State
            postsState: statePostsReducer.posts,
            handleAddPosts: (posts) => handleSetPosts(posts),
            handleRemovePosts: () => handleRemovePosts(),

            //Handle auth
            //keep for global state
            handleAuth: (props) => handleAuthentication(props),
            authObj: auth
          }}>
          <Routes />
      </Context.Provider>
      </div>
    )
}


export default ContextState;
