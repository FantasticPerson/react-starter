import BaseModal from '../utils/react-overlays/Modal';
import React,{Component} from 'react';

export default class CustomModal extends Component {

  constructor() {
    super();
  }


  renderBg() {
    if (this.props.showBg) {
      const {bgClassName} = this.props;
      return (<div className={bgClassName}/>)
    }
  }

  render() {
    let modal = (
      <div className={this.props.dialogClassName+' custom-modal-dialog'}>
        {this.renderBg()}
        {this.props.children}
      </div>
    )
    return (
      <BaseModal
        className="modal-style" style={this.props.modalStyle}
        transition={this.props.animation ? Fade:null}
        dialogTransitionTimeout={300}
        backdropTransitionTimeout={150}
        {...this.props}
      >
        {modal}
      </BaseModal>
    );
  }
}

CustomModal.propTypes = {
  ...BaseModal.propTypes,
  /**
   * 是否显示此组件
   */
  show: React.PropTypes.bool,
  /**
   * 组件消失后回调
   */
  onHide: React.PropTypes.func,
  /**
   * 自定义弹窗背景样式
   */
  dialogClassName: React.PropTypes.string,
  animation: React.PropTypes.bool,
  showBg: React.PropTypes.bool,
  modalStyle: React.PropTypes.object,
  bgClassName: React.PropTypes.string
};

//styleNames: 'modal-sibling-style',

CustomModal.defaultProps = {
  styleNames: '',
  animation: false,
  showBg: true,
  modalStyle: {},
  bgClassName: 'modal-background'//modal-background-black || modal-background
};
