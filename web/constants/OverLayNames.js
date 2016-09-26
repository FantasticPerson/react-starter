/**
 * Created by wdd on 2016/9/22.
 */
import UserAddModal from '../containers/userList/components/UserAddOverLay'
import UserModifyModal from '../containers/userList/components/UserModifyOverLay'
import ViewLoading from '../components/LoadingModal'

export const USER_ADD_OVER_LAY = 'user_add_over_lay';
export const USER_MODIFY_OVER_LAY = 'user_modify_over_lay';
export const VIEW_LOADING = 'view_loading';
export const overLayMap = {
    "user_add_over_lay" : UserAddModal,
    "user_modify_over_lay": UserModifyModal,
    "view_loading":ViewLoading
};